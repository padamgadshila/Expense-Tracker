import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    fname: v.string(),
    lname: v.string(),
    email: v.string(),
    password: v.string(),
    otp: v.optional(v.number()),
    createdAt: v.string(),
  }).index("email", ["email"]),

  transactions: defineTable({
    userId: v.id("users"),
    amount: v.number(),
    desc: v.string(),
    type: v.string(),
    category: v.string(),
    date: v.string(),
  }).index("userId", ["userId"]),

  verification: defineTable({
    userId: v.id("users"),
    otp: v.optional(v.number()),
    createdAt: v.string(),
  }).index("userId", ["userId"]),
});
