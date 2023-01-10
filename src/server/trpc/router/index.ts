// src/server/trpc/router/index.ts
import { router } from "../trpc";
import { chartRouter, coinRouter, cryptosRouter, recentRouter, trendingRouter,   } from "./cryptos";
import { buyRouter } from "./buy-coin";
import { authRouter } from "./auth";
import { globalRouter } from "./cryptos";
import { inferRouterOutputs } from "@trpc/server";
import { tweetRouter } from "./tweet";
import { watchlistRouter } from "./watchlist";
import { exchangesRouter } from "./exchanges";

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
  tweet: tweetRouter,
  exchanges: exchangesRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

export type RouterOutput = inferRouterOutputs<AppRouter>;
