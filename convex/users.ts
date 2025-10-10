import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

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

export const getUserByEmail = mutation({
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
