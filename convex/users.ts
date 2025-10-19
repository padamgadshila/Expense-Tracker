import { ConvexError, v } from "convex/values";

import { mutation, query } from "./_generated/server";
export const registerUser = mutation({
  args: {
    fname: v.string(),
    lname: v.string(),
    email: v.string(),
    password: v.string(),
  },

  handler: async (ctx, { fname, lname, email, password }) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", email))
      .first();

    if (existingUser) {
      throw new ConvexError("User with this email already exists");
    }

    const userId = await ctx.db.insert("users", {
      fname,
      lname,
      email,
      password,
      createdAt: new Date().toISOString(),
    });

    const newUser = await ctx.db.get(userId);

    if (!newUser) {
      throw new ConvexError("User creation failed");
    }
    const { password: _, ...safeUser } = newUser;
    return safeUser;
  },
});

export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", email))
      .first();

    if (!user) throw new ConvexError("User not found");
    return user;
  },
});

export const updateUserPassword = mutation({
  args: { userId: v.id("users"), newPassword: v.string() },
  handler: async (ctx, { userId, newPassword }) => {
    await ctx.db.patch(userId, { password: newPassword });
  },
});

export const deleteAll = mutation({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", email))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const userId = user._id;

    const userTransactions = await ctx.db
      .query("transactions")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();

    for (const tx of userTransactions) {
      await ctx.db.delete(tx._id);
    }

    await ctx.db.delete(userId);

    return { success: true, message: "All user data deleted" };
  },
});

export const sendRecoveryOtp = mutation({
  args: { email: v.string() },

  handler: async (ctx, { email }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", email))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    const existingVerification = await ctx.db
      .query("verification")
      .withIndex("userId", (q) => q.eq("userId", user._id))
      .unique();

    const now = new Date().toISOString();

    if (existingVerification) {
      await ctx.db.patch(existingVerification._id, {
        otp,
        createdAt: now,
      });
    } else {
      await ctx.db.insert("verification", {
        userId: user._id,
        otp,
        createdAt: now,
      });
    }
    return { success: true, message: otp };
  },
});

export const verifyOtp = mutation({
  args: { email: v.string(), otp: v.number() },
  handler: async (ctx, { email, otp }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", email))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }
    const otpData = await ctx.db
      .query("verification")
      .withIndex("userId", (q) => q.eq("userId", user._id))
      .first();

    if (otpData?.otp !== otp) {
      throw new ConvexError("Invalid otp");
    }
  },
});
