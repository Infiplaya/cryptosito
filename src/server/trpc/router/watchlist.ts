import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const watchlistRouter = router({
    addToWatchlist: protectedProcedure
      .input(
        z.object({
          name: z.string(),
          rank: z.number(),
          userId: z.string().optional(),
          price: z.number().optional(),
          price_change_percentage_24h: z.number().optional(),
          price_change_percentage_7d: z.number().optional(),
          price_change_percentage_14d: z.number().optional(),
          total_volume: z.number().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        try {
          await ctx.prisma.coin.create({
            data: {
              name: input.name,
              rank: input.rank,
              userId: input.userId,
              price: input.price,
              price_change_percentage_24h: input.price_change_percentage_24h,
              price_change_percentage_7d: input.price_change_percentage_7d,
              price_change_percentage_14d: input.price_change_percentage_14d,
              total_volume: input.total_volume,
            },
          });
        } catch (error) {
          console.log(error);
        }
      }),
      getAll: publicProcedure.query(async ({ ctx }) => {
        try {
          return await ctx.prisma.coin.findMany({
            where: {userId: ctx.session?.user?.id},
            select: {
              id: true,
              name: true,
              rank: true,
              price: true,
              userId: true,
              price_change_percentage_24h: true,
              price_change_percentage_7d: true,
              price_change_percentage_14d: true,
              total_volume: true,
            },
            orderBy: {
              rank: "asc",
            },
          });
        } catch (error) {
          console.log("error", error);
        } }),
        deleteFromWatchlist: protectedProcedure
        .input(z.object({
          id: z.string(),
        })).mutation(async ({ctx, input}) => {
          await ctx.prisma.coin.delete({
            where: {
              id: input.id
            }
          })
        }),
        deleteFromTable: protectedProcedure
        .input(z.object({
          name: z.string(),
        })).mutation(async ({ctx, input}) => {
          await ctx.prisma.coin.delete({
            where: {
              userId_name: {
                userId: ctx.session.user.id,
                name: input.name
              }
            }
          })
        }),
  });