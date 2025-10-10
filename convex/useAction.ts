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
    const user = await ctx.runMutation(api.users.getUserByEmail, { email });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ConvexError("Password is incorrect");
    }

    const { password: _, ...safeUser } = user;
    return safeUser;
  },
});
