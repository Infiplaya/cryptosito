import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { FilterableCryptoTable } from "../components/Tables/FilterableCryptoTable";
import TodayCrypto from "../components/TodayCrypto";
import Trending from "../components/Cards/Trending";
import { GradientBg } from "../components/GradientBg";
import { Highlights } from "../components/Highlights";
import superjson from "superjson";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { cryptosRouter } from "../server/trpc/router/cryptos";
import { trpc } from "../utils/trpc";

export async function getStaticProps() {
  const ssg = await createProxySSGHelpers({
    router: cryptosRouter,
    ctx: {} as any,
    transformer: superjson, // optional - adds superjson serialization
  });

  await ssg.getCryptos.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 30,
  };
}

const Home: NextPage<typeof getStaticProps> = (props) => {
  const [enabled, setEnabled] = useState(true);
  const cryptoQuery = trpc.cryptos.getCryptos.useQuery();

  if (cryptoQuery.status !== "success") {
    return <>Loading...</>;
  }

  const { data: cryptoData } = cryptoQuery;

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
        <FilterableCryptoTable cryptoData={cryptoData} />
      </main>
    </>
  );
};

export default Home;
