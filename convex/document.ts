// convex/documents.ts
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from 'convex/server'

export const create = mutation({
    args: { title: v.optional(v.string()), initialContent: v.optional(v.string()) },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity()

        if (!user) {
            throw new ConvexError("Unathorized!")
        }

        return await ctx.db.insert("Documents", {
            title: args.title ?? "Untitled coumen",
            ownerId: user.subject,
            initialContent: args.initialContent
        })

    }
})




export const getAllDocuments = query({
    args: { paginationOpts: paginationOptsValidator },
    handler: async (ctx, args) => {
        return await ctx.db.query("Documents").paginate(args.paginationOpts);
    },
});
