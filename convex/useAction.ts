import bcrypt from "bcryptjs";
import { ConvexError, v } from "convex/values";
import { api } from "./_generated/api";
import { action } from "./_generated/server";

export const registerUserAction = action({
  args: {
    fname: v.string(),
    lname: v.string(),
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, { fname, lname, email, password }): Promise<any> => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await ctx.runMutation(api.users.registerUser, {
      fname,
      lname,
      email,
      password: hashedPassword,
    });
  },
});

export const loginUserAction = action({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, { email, password }): Promise<any> => {
    const user = await ctx.runQuery(api.users.getUserByEmail, { email });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ConvexError("Password is incorrect");
    }

    const { password: _, ...safeUser } = user;
    return safeUser;
  },
});

export const chnagePasswordAction = action({
  args: {
    email: v.string(),
    oldPassword: v.string(),
    newPassword: v.string(),
  },
  handler: async (ctx, { email, oldPassword, newPassword }): Promise<any> => {
    const user = await ctx.runQuery(api.users.getUserByEmail, { email });

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      throw new ConvexError("Old password is incorrect");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await ctx.runMutation(api.users.updateUserPassword, {
      userId: user._id,
      newPassword: hashedPassword,
    });

    return "Password changed successfully";
  },
});

export const resetPasswordAction = action({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, { email, password }): Promise<any> => {
    const user = await ctx.runQuery(api.users.getUserByEmail, { email });

    const hashedPassword = await bcrypt.hash(password, 10);

    await ctx.runMutation(api.users.updateUserPassword, {
      userId: user._id,
      newPassword: hashedPassword,
    });

    return "Password changed successfully";
  },
});
