import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from 'zod';



const charResult = z.object({
  prices: z.array(z.array(z.number())),
  market_caps: z.array(z.array(z.number())),
  total_volumes: z.array(z.array(z.number())),
}).optional()

export const chartRouter = router({
  getChart: publicProcedure
  .input(z.object({ name: z.any()}))
    .query(async ({ input }) => {
      const chart = await fetch(`https://api.coingecko.com/api/v3/coins/${input.name}/market_chart?vs_currency=usd&days=30`).then(res =>
      res.json());
      
      const parsedData = charResult.parse(chart)
      return parsedData
    }),
})


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
            id: input.id,
          }
        })
      }),
});

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
          by: ["name", "price"],
          _sum: {
            shares: true,
          }
        });
      } catch (error) {
        console.log("error", error);
      } }),
});
