import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../../../utils/trpc";
import { useRouter } from "next/router";
import Loader from "../../../components/Loader";
import { CoinDescription } from "../../../components/CoinDescription";
import { CoinInfo } from "../../../components/CoinInfo";
import { Sparklines, SparklinesLine } from "react-sparklines";

const Coin: NextPage = () => {
  const router = useRouter();
  const id = router.query["id"];
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
            <div className="mt-20 md:w-1/2">
              <h3 className="mb-10 text-2xl font-bold">
                {getCoin.name} to USD chart
              </h3>
              <Sparklines data={getCoin.market_data.sparkline_7d.price}>
                <SparklinesLine
                  color={
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
};

export default Coin;
