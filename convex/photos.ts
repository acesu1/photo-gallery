import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const uploadPhoto = mutation({
  args: {
    name: v.string(),
    album: v.string(),
    data: v.string(),
    favorite: v.boolean(),
    uploadedAt: v.number(),
  },

  async handler(ctx, args) {
    const uid = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!uid) {
      throw new ConvexError("Not authenticated");
    }

    await ctx.db.insert("photos", {
      name: args.name,
      album: args.album,
      data: args.data,
      favorite: args.favorite,
      uploadedAt: args.uploadedAt,
      tokenIdentifier: uid,
    });
  },
});

export const listPhotos = query({
  async handler(ctx) {
    const uid = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!uid) {
      return [];
    }

    return await ctx.db
      .query("photos")
      .withIndex("by_token_identifier", (q) => q.eq("tokenIdentifier", uid))
      .collect();
  },
});
