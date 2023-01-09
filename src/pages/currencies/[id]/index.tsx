import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../../../utils/trpc";
import { useRouter } from "next/router";
import Loader from "../../../components/Loader";
import { CoinDescription } from "../../../components/CoinDescription";
import { CoinInfo } from "../../../components/CoinInfo";
import { Sparklines, SparklinesLine } from "react-sparklines";

import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import superjson from "superjson";
import { coinRouter } from "../../../server/trpc/router/cryptos";

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
) {
  const ssg = await createProxySSGHelpers({
    router: coinRouter,
    ctx: {} as any,
    transformer: superjson, // optional - adds superjson serialization
  });
  const id = context.params?.id as string;

  await ssg.getCoin.prefetch({ name: id });
  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 3600,
  };
}
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://api.coincap.io/v2/assets?limit=250");
  const { data: cryptos } = await res.json();

  return {
    paths: cryptos.map((crypto: any) => ({
      params: {
        id: crypto.id,
      },
    })),
    // https://nextjs.org/docs/basic-features/data-fetching#fallback-blocking
    fallback: "blocking",
  };
};

export default function CoinPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { id } = props;
  const { data: getCoin } = trpc.coin.getCoin.useQuery({ name: id });

  if (!getCoin)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <>
      <Head>
        <title>{getCoin.name}</title>
        <meta name="description" content="some coinmarket clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="dark:bg container mx-auto p-10 lg:px-16">
        <div>
          <CoinInfo getCoin={getCoin} />
          {getCoin.market_data?.sparkline_7d ? (
            <div className="mt-10 md:mt-0 md:w-1/2">
              <h3 className="mb-10 text-2xl font-bold">
                {getCoin.name} to USD chart
              </h3>
              <Sparklines data={getCoin.market_data.sparkline_7d.price}>
                <SparklinesLine
                  color={
                    getCoin.market_data.price_change_percentage_24h &&
                    getCoin.market_data.price_change_percentage_24h > 0
                      ? "teal"
                      : "red"
                  }
                ></SparklinesLine>
              </Sparklines>
            </div>
          ) : null}
          <CoinDescription
            name={getCoin.name}
            description={getCoin.description}
          />
        </div>
      </main>
    </>
  );
}
