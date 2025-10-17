import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  findMany: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(),
        keywords: z.string().nullish(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const limit = input.limit ?? 50;
      const { cursor, keywords } = input;

      const items = await ctx.db.image.findMany({
        take: limit + 1, // Take one extra to determine if there's a next page
        cursor: cursor ? { id: cursor } : undefined,
        skip: cursor ? 1 : 0, // Skip the cursor item when paginating
        where: {
          name: {
            contains: keywords ?? undefined,
            mode: "insensitive",
          },
        },
        orderBy: {
          id: "asc", // Consistent ordering for cursor pagination
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop(); // Remove the extra item
        nextCursor = nextItem!.id;
      }

      return {
        items,
        nextCursor,
      };
    }),

  category: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db.category.findMany();
    return categories;
  }),
});
