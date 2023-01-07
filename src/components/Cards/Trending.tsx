import Link from "next/link";
import Image from "next/image";
import { TrendingCard } from "./TrendingCard";
import { RecentCard } from "./RecentCard";
import { CommunityPostCard } from "./CommunityPostCard";
import { trpc } from "../../utils/trpc";

const Trending = () => {
  const { data: recentData } = trpc.recent.getRecent.useQuery();
  const { data: trendingData } = trpc.trending.getTrending.useQuery();
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
      {coins && recentCoins && (
        <>
          <TrendingCard coins={coins} />
          <RecentCard recentCoins={recentCoins} />
          <CommunityPostCard />
        </>
      )}
    </div>
  );
};

export default Trending;
