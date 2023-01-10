import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { FilterableCryptoTable } from "../modules/homepage/components/FilterableCryptoTable";
import TodayCrypto from "../modules/homepage/components/TodayCrypto";
import Trending from "../modules/homepage/components/Trending";
import { GradientBg } from "../modules/homepage/components/GradientBg";
import { Highlights } from "../modules/homepage/components/Highlights";

const Home: NextPage = () => {
  const [enabled, setEnabled] = useState(true);

  return (
    <>
      <Head>
        <title>Cryptosito</title>
        <meta name="description" content="some coinmarket clone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto flex flex-col items-center justify-center p-4 align-middle lg:container lg:px-16">
        <GradientBg />
        <div className="flex w-full gap-3 align-middle">
          <TodayCrypto />
          <Highlights enabled={enabled} setEnabled={setEnabled} />
        </div>
        {enabled ? <Trending /> : null}
        {<FilterableCryptoTable />}
      </main>
    </>
  );
};

export default Home;
