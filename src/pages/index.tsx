import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import FilterableCryptoTable from "../components/Tables/FilterableCryptoTable";
import TodayCrypto from "../components/TodayCrypto";
import Trending from "../components/Cards/Trending";
import Navbar from "../components/Header/Header";
import { trpc } from "../utils/trpc";
import { GradientBg } from "../components/GradientBg";
import { Highlights } from "../components/Highlights";
import Loader from "../components/Loader";

const Home: NextPage = () => {
  const [enabled, setEnabled] = useState(true);
  const { data: cryptoData } = trpc.cryptos.getCryptos.useQuery();
  const { data: globalInfo } = trpc.globalInfo.getGlobal.useQuery();

  if (!globalInfo || !cryptoData) {
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
      <Navbar />
      <main className="mx-auto flex min-h-screen w-screen flex-col items-center justify-center p-4 align-middle lg:container lg:px-16">
        <GradientBg />
        <div className="flex w-full gap-3 align-middle">
          <TodayCrypto globalInfo={globalInfo} />
          <Highlights enabled={enabled} setEnabled={setEnabled} />
        </div>
        {enabled ? <Trending /> : null}
        {cryptoData ? (
          <FilterableCryptoTable cryptoData={cryptoData} />
        ) : (
          <Loader />
        )}
      </main>
    </>
  );
};

export default Home;
