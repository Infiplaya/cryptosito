import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import FilterableCryptoTable from "../components/Tables/FilterableCryptoTable";
import TodayCrypto from "../components/TodayCrypto";
import Trending from "../components/Cards/Trending";
import { GradientBg } from "../components/GradientBg";
import { Highlights } from "../components/Highlights";
import Loader from "../components/Loader";
import { Crypto } from "../types/crypto";
import { GlobalInfo } from "../types/global-info";
import { RecentData } from "../types/recent-data";
import { TrendingData } from "../types/trending";

interface Props {
  cryptoData: Crypto[]
  globalInfo: GlobalInfo,
  recentData: RecentData[],
  trendingData: TrendingData
}

export const getServerSideProps:GetServerSideProps<Props> = async () =>  {
  // Fetch data about cryptos
  const res1 = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d"
  );
  const cryptoData = await res1.json();

  // Fetch data about globalInfo
  const res2 = await fetch("https://api.coingecko.com/api/v3/global");
  const globalInfo = await res2.json();

  // Fetch data about recent coins
  const res3 = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_asc&per_page=3&page=1&sparkline=false")
  const recentData = await res3.json();

  // Fetch data about trending coins
  const res4 = await fetch("https://api.coingecko.com/api/v3/search/trending");
  const trendingData = await res4.json();

  // Return the data as props
  return {
    props: {
      cryptoData,
      globalInfo,
      recentData,
      trendingData
    },
  };
}

const Home: NextPage<Props> = ({ cryptoData, globalInfo, recentData, trendingData }) => {
  const [enabled, setEnabled] = useState(true);

  if (!globalInfo || !cryptoData || !recentData || !trendingData) {
    return (
      <main className="mx-auto flex min-h-screen w-screen flex-col items-center justify-center p-4 align-middle lg:container lg:px-16">
        <Loader />
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>Cryptosito</title>
        <meta name="description" content="some coinmarket clone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto flex min-h-screen w-screen flex-col items-center justify-center p-4 align-middle lg:container lg:px-16">
        <GradientBg />
        <div className="flex w-full gap-3 align-middle">
          <TodayCrypto globalInfo={globalInfo} />
          <Highlights enabled={enabled} setEnabled={setEnabled} />
        </div>
        {enabled ? (
          <Trending recentData={recentData} trendingData={trendingData} />
        ) : null}
        {<FilterableCryptoTable cryptoData={cryptoData} />}
      </main>
    </>
  );
};

export default Home;
