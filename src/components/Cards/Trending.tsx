import Link from "next/link";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";
import { TrendingCard } from "./TrendingCard";
import { RecentCard } from "./RecentCard";
import { SlidingCards } from "./SlidingCards";
import { trpc } from "../../utils/trpc";
import Loader from "../Loader";

const Trending = ({}) => {
  const { data: recentData } = trpc.recent.getRecent.useQuery();
  const { data: trendingData } = trpc.trending.getTrending.useQuery();
  const coins = trendingData?.coins.map((coin) => coin.item);

  const recentCoins = recentData?.map((coin) => (
    <Link href="/currencies/[id]" as={`currencies/${coin.id}`} key={coin.id}>
      <li>
        <div className="flex items-center gap-2">
          <Image src={coin.image} alt={`thumb`} width={20} height={20} className="rounded-full"></Image>
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
      <SlidingCards />
    </div>
  );
};

export default Trending;
