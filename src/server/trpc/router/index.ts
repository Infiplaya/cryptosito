// src/server/trpc/router/index.ts
import { router } from "../trpc";
import { buyRouter, chartRouter, coinRouter, cryptosRouter, recentRouter, trendingRouter, watchlistRouter } from "./cryptos";
import { authRouter } from "./auth";
import { globalRouter } from "./cryptos";
import { inferRouterOutputs } from "@trpc/server";

export const appRouter = router({
  auth: authRouter,
  cryptos: cryptosRouter,
  coin: coinRouter,
  globalInfo: globalRouter,
  trending: trendingRouter,
  recent: recentRouter,
  watchlist: watchlistRouter,
  marketChart: chartRouter,
  buyCoin: buyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export type RouterOutput = inferRouterOutputs<AppRouter>;
