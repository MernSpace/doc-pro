// convex/documents.ts
import { query } from "./_generated/server";

export const getAllDocuments = query({
    handler: async (ctx) => {
        return await ctx.db.query("newDocuments").collect();
    },
});
