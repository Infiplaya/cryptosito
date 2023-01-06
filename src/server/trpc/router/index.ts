// src/server/trpc/router/index.ts
import { router } from "../trpc";
import { buyRouter, chartRouter, watchlistRouter } from "./cryptos";
import { authRouter } from "./auth";
import { inferRouterOutputs } from "@trpc/server";
import { tweetRouter } from "./tweet";

export const appRouter = router({
  auth: authRouter,
  watchlist: watchlistRouter,
  marketChart: chartRouter,
  buyCoin: buyRouter,
  tweet: tweetRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export type RouterOutput = inferRouterOutputs<AppRouter>;
