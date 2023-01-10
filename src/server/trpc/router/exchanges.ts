import { z } from "zod";
import { publicProcedure, router } from "../trpc";

const exchangesResult = z.array(z.object({
    exchangeId: z.string(),
    name: z.string(),
    rank: z.number(),
    percentTotalVolume: z.number().nullable(),
    volumeUsd: z.number().nullish(),
    tradingPairs: z.string(),
    socket: z.boolean().nullable(),
    exchangeUrl: z.string(),
    updated: z.number(),
  }))

  export type ExchangesData = z.infer<typeof exchangesResult>

export const exchangesRouter = router({
    getExchanges: publicProcedure
      .query(async () => {
        const {data: exchanges} = await fetch("https://api.coincap.io/v2/exchanges")
        .then(res => res.json());

        const fixedData = exchanges.map((exchange:any) => exchange = {
            ...exchange,
            rank: parseInt(exchange.rank),
            volumeUsd: exchange.volumeUsd === null ? null : parseFloat(exchange.volumeUsd),
            percentTotalVolume: exchange.percentTotalVolume === null ? null : parseFloat(exchange.percentTotalVolume)
        })

        console.log(fixedData)

        return exchangesResult.parse(fixedData)
      }),
  });