import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import Head from "next/head";
import Loader from "../../../components/Loader";
import { CoinDescription } from "../../../components/CoinDescription";
import { CoinInfo } from "../../../components/CoinInfo";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { CoinData } from "../../../types/coin";

interface Props {
  getCoin: CoinData;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context: GetServerSidePropsContext
) => {
  // Fetch data about coin
  const res1 = await fetch(
    `https://api.coingecko.com/api/v3/coins/${context.params?.query}?sparkline=true`
  );
  const getCoin = await res1.json();

  // Return the data as props
  return {
    props: {
      getCoin,
    },
  };
};

const Coin: NextPage<Props> = ({ getCoin }) => {
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
};

export default Coin;
