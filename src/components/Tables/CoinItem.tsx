import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as outlineStar } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import { z } from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
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

export const CoinItem = ({
  coin,
  isSaved,
}: {
  coin: Coin;
  isSaved: boolean | undefined;
}) => {
  const [savedCoin, setSavedCoin] = useState(false);
  const [isShowing, setIsShowing] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    if (isSaved && session) {
      setSavedCoin(true);
    }
  }, [isSaved, session]);

  const utils = trpc.useContext();

  const handleAlert = () => {
    alert("Must be signed in to add to watchlist");
  };

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
    session
      ? addCoin.mutate({
          name: coin.name,
          rank: coin.market_cap_rank as number,
          userId: session.user?.id,
          price: coin.current_price,
          price_change_percentage_24h:
            coin.price_change_percentage_24h as number,
          total_volume: coin.total_volume,
        })
      : handleAlert();
  };

  // Delete Coin from watchlist

  const deleteCoin = trpc.watchlist.deleteFromTable.useMutation({
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
      setSavedCoin(false);
    },
  });

  const handleDeleteCoin = async () => {
    session &&
      deleteCoin.mutate({
        name: coin.name,
      });
  };

  return (
    <tr className="border-b bg-white hover:bg-blue-100/5 dark:border-gray-700 dark:bg-gray-800 hover:dark:bg-blue-100/5">
      <td
        className="py-4 px-6"
        onClick={savedCoin ? handleDeleteCoin : handleAddCoin}
      >
        <FontAwesomeIcon
          icon={savedCoin ? faStar : outlineStar}
          className={savedCoin ? "text-yellow-500" : "text-gray-500"}
          cursor={`pointer`}
          onMouseEnter={() => setIsShowing(true)}
          onMouseLeave={() => setIsShowing(false)}
        />
        {isShowing ? (
          <p className="absolute rounded-lg bg-gray-800 p-2 text-xs dark:text-gray-50 font-semibold mt-5 shadow-sm dark:shadow-white/50">
            {savedCoin
              ? "Remove coin from the watchlist"
              : "Save coin to the watchlist"}
          </p>
        ) : null}
      </td>
      <td className="py-4 px-6">{coin.market_cap_rank}</td>
      <td className="py-4 px-6">
        <a href={`/currencies/${coin.id}`}>
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
        </a>
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
            color={
              coin.price_change_percentage_24h &&
              coin.price_change_percentage_24h > 0
                ? "teal"
                : "red"
            }
          />
        </Sparklines>
      </td>
    </tr>
  );
};
