import Link from "next/link";
import Image from "next/image";

type GetTrendingCoins = {
  symbol: string;
  name: string;
  id: string;
  thumb: string;
}[]

export const TrendingCard:React.FC<{coins: GetTrendingCoins}> = ({ coins }) => {
  return (
    <div className="flex-1 cursor-pointer rounded-lg bg-white shadow-md dark:bg-gray-700 dark:shadow">
      <div className="flex justify-between align-middle">
        <h2 className="text-md ml-5 p-5 font-bold">🔥 Trending</h2>
      </div>
      <ul className="ml-5 flex flex-col gap-3 text-xs font-bold text-gray-800 dark:text-gray-200">
        {coins.slice(0, 3).map((coin) => (
          <Link
            href="/currencies/[id]"
            as={`currencies/${coin.id}`}
            key={coin.id}
          >
            <li>
              <div className="flex items-center gap-2">
                <Image
                  src={coin.thumb}
                  alt={`thumb`}
                  width={20}
                  height={20}
                  className={`dark:invert`}
                ></Image>
                <span>{coin.name}</span>{" "}
                <span className="text-gray-400">
                  {coin.symbol.toUpperCase()}
                </span>{" "}
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
