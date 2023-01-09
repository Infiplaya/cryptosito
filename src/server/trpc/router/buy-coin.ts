import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const buyRouter = router({
    buyACoin: protectedProcedure
      .input(
        z.object({
          name: z.string(),
          userId: z.string().optional(),
          price: z.number().optional(),
          shares: z.number(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        try {
          await ctx.prisma.buyCoin.create({
            data: {
              name: input.name,
              userId: input.userId,
              price: input.price,
              shares: input.shares,
            },
          });
        } catch (error) {
          console.log(error);
        }
      }),
      getAll: publicProcedure.query(async ({ ctx }) => {
        try {
          return await ctx.prisma.buyCoin.groupBy({
            by: ["name"],
            where: {
              userId: ctx.session?.user?.id
            },
            _sum: {
              shares: true,
            },
          });
        } catch (error) {
          console.log("error", error);
        } }),
  });
  