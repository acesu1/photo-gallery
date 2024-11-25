import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  photos: defineTable({
    name: v.string(),
    album: v.string(),
    data: v.string(),
    favorite: v.boolean(),
    uploadedAt: v.number(),
    tokenIdentifier: v.string(),
  }).index("by_token_identifier", ["tokenIdentifier"]),
});
