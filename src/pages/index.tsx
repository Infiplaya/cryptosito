import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import FilterableCryptoTable from "../components/Tables/FilterableCryptoTable";
import TodayCrypto from "../components/Other/TodayCrypto";
import Trending from "../components/Cards/Trending";
import Navbar from "../components/Header/Header";
import { trpc } from "../utils/trpc";
import { GradientBg } from "../components/Other/GradientBg";
import { Highlights } from "../components/Other/Highlights";

const Home: NextPage = () => {
  const [enabled, setEnabled] = useState(true);
  const { data: cryptoData } = trpc.cryptos.getCryptos.useQuery();

  return (
    <>
      <Head>
        <title>Cryptosito</title>
        <meta name="description" content="some coinmarket clone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="mx-auto flex min-h-screen w-screen flex-col items-center justify-center p-4 align-middle lg:container lg:px-16">
        <GradientBg />
        <div className="flex w-full gap-3 align-middle">
          <TodayCrypto />
          <Highlights enabled={enabled} setEnabled={setEnabled} />
        </div>
        {enabled ? <Trending /> : null}
        {cryptoData ? <FilterableCryptoTable cryptoData={cryptoData} /> : null}
      </main>
    </>
  );
};

export default Home;
