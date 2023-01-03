import Link from "next/link";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";
import { TrendingCard } from "./TrendingCard";
import { RecentCard } from "./RecentCard";
import { CommunityPostCard } from "./CommunityPostCard";
import Loader from "../Loader";
import { RecentData, TrendingData } from "../../server/trpc/router/cryptos";

const Trending = ({
  trendingData,
  recentData,
}: {
  trendingData: TrendingData;
  recentData: RecentData;
}) => {
  const coins = trendingData?.coins.map((coin) => coin.item);

  const recentCoins = recentData?.map((coin) => (
    <Link href="/currencies/[id]" as={`currencies/${coin.id}`} key={coin.id}>
      <li>
        <div className="flex items-center gap-2">
          <Image
            src={coin.image}
            alt={`thumb`}
            width={20}
            height={20}
            className="rounded-full"
          ></Image>
          <span>{coin.name}</span>{" "}
          <span className="text-gray-400">{coin.symbol.toUpperCase()}</span>{" "}
        </div>
      </li>
    </Link>
  ));

  return (
    <div className="container mx-auto mt-10 hidden gap-5 md:flex lg:h-48">
      {coins ? <TrendingCard coins={coins} /> : <div>Loading...</div>}
      {recentCoins ? <RecentCard recentCoins={recentCoins} /> : <Loader />}
      <CommunityPostCard />
    </div>
  );
};

export default Trending;
