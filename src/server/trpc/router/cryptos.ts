import { router, publicProcedure } from "../trpc";
import { z } from 'zod';


const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d";

const cryptosResult = z.array(z.object({
  market_cap_rank: z.number(),
  name: z.string(),
  symbol: z.string(),
  image: z.string(),
  id: z.string(),
  current_price: z.number(),
  price_change_percentage_1h_in_currency: z.number().nullable(),
  price_change_percentage_24h: z.number().nullable(),
  price_change_percentage_7d_in_currency: z.number().nullable(),
  market_cap: z.number(),
  total_volume: z.number(),
  circulating_supply: z.number(),
  sparkline_in_7d: z.object({
    price: z.array(z.number()),
  })
}))

export type CryptoData = z.infer<typeof cryptosResult>

export const cryptosRouter = router({
  getCryptos: publicProcedure
    .query(async () => {
      const cryptos = await fetch(url).then(res =>
      res.json());
      const parsedData = cryptosResult.parse(cryptos);
      return parsedData
    }),
});


const coinResult = z.object({
  id: z.string(),
  name: z.string(),
  image: z.object({
    large: z.string(),
  }),
  symbol: z.string(),
  market_cap_rank: z.number().nullable(),
  links: z.object({
    homepage: z.array(z.string()),
  }),
  market_data: z.object({
    current_price: z.object({
      usd: z.number(),
    }),
    price_change_percentage_24h: z.number().nullable(),
    price_change_percentage_7d: z.number().nullable(),
    price_change_percentage_14d: z.number().nullable(),
    market_cap: z.object({
      usd: z.number(),
    }),
    high_24h: z.object({
      usd: z.number().optional(),
    }),
    fully_diluted_valuation: z.object({
      usd: z.number().optional(),
    }),
    total_volume: z.object({
      usd: z.number().optional(),
    }),
    sparkline_7d: z.object({
      price: z.array(z.number()),
    }),
    circulating_supply: z.number(),
  }).optional().nullable(),
  description: z.object({
    en: z.string(),
  }),
})

export const coinRouter = router({
  getCoin: publicProcedure
  .input(z.object({ name: z.any()}))
    .query(async ({ input }) => {
      const coin = await fetch(`https://api.coingecko.com/api/v3/coins/${input.name}?sparkline=true`).then(res =>
      res.json());
      const parsedData = coinResult.parse(coin)
      return parsedData   
    })
})

const globalResult = z.object({
  data: z.object({
    total_market_cap: z.object({
      usd: z.number(),
    }),
    market_cap_change_percentage_24h_usd: z.number(),
    total_volume: z.object({
      usd: z.number(),
    }),
    market_cap_percentage: z.object({
      btc: z.number(),
      eth: z.number(),
    }),
    active_cryptocurrencies: z.number(),
    markets: z.number(),

  })
})

export type GlobalData = z.infer<typeof globalResult>

export const globalRouter = router({
  getGlobal: publicProcedure
    .query(async () => {
      const globalInfo = await fetch(`https://api.coingecko.com/api/v3/global`).then(res =>
      res.json());
      const parsedData = globalResult.parse(globalInfo);
      
      return parsedData
    }),
});

const trendingResult = z.object({
  coins: z.array(z.object({
    item: z.object({
      id: z.string(),
      thumb: z.string(),
      name: z.string(),
      symbol: z.string(),
    })
  }))
})

export type TrendingData = z.infer<typeof trendingResult>

export const trendingRouter = router({
  getTrending: publicProcedure
    .query(async () => {
      const trending = await fetch(`https://api.coingecko.com/api/v3/search/trending`).then(res =>
      res.json());
      
      const parsedData = trendingResult.parse(trending);
      return parsedData
    }),
});

const recentResult = z.array(z.object({  
  id: z.string(),
  image: z.string(),
  symbol: z.string(),
  name: z.string()
},
))

export type RecentData = z.infer<typeof recentResult>

export const recentRouter = router({
  getRecent: publicProcedure
    .query(async () => {
      const recent = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_asc&per_page=3&page=1&sparkline=false`).then(res =>
      res.json());
      const parsedData = recentResult.parse(recent);
      return parsedData;     
    }),
});

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




