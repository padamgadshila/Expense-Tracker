import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    fname: v.string(),
    lname: v.string(),
    email: v.string(),
    password: v.string(),
    createdAt: v.string(),
  }).index("email", ["email"]),

  transactions: defineTable({
    userId: v.string(),
    amount: v.number(),
    type: v.string(),
    category: v.string(),
    date: v.string(),
  }).index("userId", ["userId"]),
});
