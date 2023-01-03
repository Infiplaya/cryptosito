import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as outlineStar } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import { z } from "zod";
import Link from "next/link";
import { useState } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";

const coinSchema = z.object({
  market_cap_rank: z.number(),
  name: z.string(),
  symbol: z.string(),
  image: z.string(),
  id: z.string(),
  current_price: z.number(),
  price_change_percentage_1h_in_currency: z.number().nullable(),
  price_change_percentage_24h: z.number().nullable(),
  price_change_percentage_7d_in_currency: z.number().nullable(),
  market_cap: z.number(),
  total_volume: z.number(),
  circulating_supply: z.number(),
  sparkline_in_7d: z.object({
    price: z.array(z.number()),
  }),
});

type Coin = z.infer<typeof coinSchema>;

export const CoinItem = ({ coin }: { coin: Coin }) => {
  const [savedCoin, setSavedCoin] = useState(false);

  const utils = trpc.useContext();
  const { data: session } = useSession();

  const addCoin = trpc.watchlist.addToWatchlist.useMutation({
    onMutate: () => {
      utils.watchlist.getAll.cancel();
      const optimisticUpdate = utils.watchlist.getAll.getData();

      if (optimisticUpdate) {
        utils.watchlist.getAll.setData(undefined, optimisticUpdate);
      }
    },
    onSettled: () => {
      utils.watchlist.getAll.invalidate();
    },
    onSuccess: () => {
      setSavedCoin(true);
    },
  });

  const handleAddCoin = async () => {
    session &&
      addCoin.mutate({
        name: coin.name,
        rank: coin.market_cap_rank as number,
        userId: session.user?.id,
        price: coin.current_price,
        price_change_percentage_24h: coin.price_change_percentage_24h as number,
        total_volume: coin.total_volume,
      });
  };

  const handleAlert = () => {
    alert("Must be signed in to add to watchlist");
  };

  return (
    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
      <td className="py-4 px-6" onClick={session ? handleAddCoin : handleAlert}>
        <FontAwesomeIcon
          icon={savedCoin ? faStar : outlineStar}
          className={savedCoin ? "text-yellow-500" : "text-gray-500"}
          cursor={`pointer`}
        />
      </td>
      <td className="py-4 px-6">{coin.market_cap_rank}</td>
      <td className="py-4 px-6">
        <Link href={`/currencies/${coin.id}`}>
          <div className="flex items-center gap-1">
            <Image
              className="mr-2 w-6 rounded-full"
              alt="coin-image"
              src={coin.image}
              width={20}
              height={20}
            />
            <p className="hidden text-gray-800 dark:text-gray-100 sm:table-cell">
              {coin.name}
            </p>
            <p>{coin.symbol?.toUpperCase()}</p>
          </div>
        </Link>
      </td>
      <td className="py-4 px-6">${coin.current_price.toLocaleString()}</td>
      <td
        className={`${
          coin.price_change_percentage_1h_in_currency &&
          coin.price_change_percentage_1h_in_currency > 0
            ? "text-green-500"
            : "text-red-500"
        } py-4 px-6`}
      >
        {coin.price_change_percentage_1h_in_currency
          ? coin.price_change_percentage_1h_in_currency.toFixed(2)
          : "Null"}
        %
      </td>
      <td
        className={`${
          coin.price_change_percentage_24h &&
          coin.price_change_percentage_24h > 0
            ? "text-green-500"
            : "text-red-500"
        } py-4 px-6`}
      >
        {coin.price_change_percentage_24h
          ? coin.price_change_percentage_24h.toFixed(2)
          : "Null"}
        %
      </td>
      <td
        className={`${
          coin.price_change_percentage_7d_in_currency &&
          coin.price_change_percentage_7d_in_currency > 0
            ? "text-green-500"
            : "text-red-500"
        } py-4 px-6`}
      >
        {coin.price_change_percentage_7d_in_currency
          ? coin.price_change_percentage_7d_in_currency.toFixed(2)
          : "Null"}
        %
      </td>
      <td className="hidden py-4 px-6 md:table-cell">
        ${coin.total_volume.toLocaleString()}
      </td>
      <td className="hidden py-4 px-6 md:table-cell">
        ${coin.market_cap.toLocaleString()}
      </td>
      <td className="hidden w-52 py-4 px-6 md:table-cell">
        <Sparklines data={coin.sparkline_in_7d.price}>
          <SparklinesLine
            color={coin.price_change_percentage_24h && coin.price_change_percentage_24h> 0 ? "teal" : "red"}
          />
        </Sparklines>
      </td>
    </tr>
  );
};
