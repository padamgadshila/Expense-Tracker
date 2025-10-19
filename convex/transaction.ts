import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addTransaction = mutation({
  args: {
    userId: v.id("users"),
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

export const getTransaction = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("transactions")
      .withIndex("userId", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const deleteTransaction = mutation({
  args: {
    userId: v.string(),
    tid: v.id("transactions"),
  },
  handler: async (ctx, { userId, tid }) => {
    const transaction = await ctx.db.get(tid);
    if (!transaction || transaction.userId !== userId) {
      throw new Error("Transaction not found or not authorized");
    }
    await ctx.db.delete(tid);
    return { success: true, message: "Transaction deleted successfully" };
  },
});

export const getTransactionById = query({
  args: { id: v.id("transactions") },
  handler: async (ctx, { id }) => {
    const transaction = await ctx.db.get(id);

    if (!transaction) throw new Error("Transaction not found");
    return transaction;
  },
});
