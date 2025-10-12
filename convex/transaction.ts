import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

export const addTransaction = mutation({
  args: {
    userId: v.string(),
    amount: v.number(),
    desc: v.string(),
    type: v.string(),
    category: v.string(),
  },
  handler: async (ctx, { userId, amount, desc, type, category }) => {
    const transaction = await ctx.db.insert("transactions", {
      userId,
      amount,
      desc,
      type,
      category,
      date: new Date().toISOString(),
    });

    if (!transaction) {
      throw new ConvexError("Failed to add");
    }
    return transaction;
  },
});
