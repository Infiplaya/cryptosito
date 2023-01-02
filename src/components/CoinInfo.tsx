import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RouterOutput } from "../server/trpc/router";
import { trpc } from "../utils/trpc";
import Loader from "./Loader";
type GetCoinOutput = RouterOutput["coin"]["getCoin"];
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type FormValues = {
  quantity: number;
};

export const CoinInfo: React.FC<{ getCoin: GetCoinOutput }> = ({ getCoin }) => {
  const [value, setValue] = useState<string>("");
  const [success, setSuccess] = useState("");

  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required("Please provide quantity")
      .positive("Quantity must be positive"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const dollar = new Intl.NumberFormat("eng-EN", {
    style: "currency",
    currency: "USD",
  });
  const { data: session } = useSession();

  const utils = trpc.useContext();
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
  });

  const buyCoin = trpc.buyCoin.buyACoin.useMutation({
    onMutate: () => {
      utils.buyCoin.getAll.cancel();
      const optimisticUpdate = utils.buyCoin.getAll.getData();

      if (optimisticUpdate) {
        utils.buyCoin.getAll.setData(undefined, optimisticUpdate);
      }
    },
    onSettled: () => {
      utils.buyCoin.getAll.invalidate();
    },

    onSuccess: () => {
      setSuccess("You bought a coin!");
    },
  });

  async function onSubmit(data: any) {
    buyCoin.mutate({
      name: getCoin.name,
      userId: session?.user?.id,
      price: getCoin.market_data?.current_price.usd,
      shares: parseFloat(value),
    });
  }

  if (!getCoin)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-col gap-5 md:grid md:grid-cols-3">
      <div>
        <div className="flex gap-3">
          <Image
            src={getCoin.image.large}
            width={40}
            height={40}
            alt="coin"
            quality={100}
          ></Image>
          <h3 className="text-3xl font-bold">{getCoin.name}</h3>
          <button
            disabled
            className="w-16 rounded bg-gray-200 px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700"
          >
            {getCoin.symbol.toUpperCase()}
          </button>
        </div>
        <div className="mt-5 flex gap-3">
          <button
            disabled
            className="rounded bg-gray-400 px-3 py-1 text-xs font-semibold text-gray-50 dark:bg-gray-600"
          >
            {getCoin.market_cap_rank
              ? `Rank #${getCoin.market_cap_rank}`
              : "Unranked"}
          </button>
          <button className="rounded bg-gray-200 px-3 py-1 text-xs font-semibold hover:bg-gray-400 dark:bg-gray-800 dark:hover:bg-gray-600">
            <a href={getCoin.links.homepage[0]} target={`_blank`}>
              {getCoin.links.homepage[0]}
            </a>
          </button>
        </div>
        {session ? (
          <Link href="/watchlist">
            <button
              className="mt-3 rounded-lg bg-blue-600 px-3 py-2  text-slate-50"
              onClick={async () => {
                addCoin.mutate({
                  name: getCoin.name,
                  rank: getCoin.market_cap_rank as number,
                  userId: session.user?.id,
                  price: getCoin.market_data?.current_price.usd,
                  price_change_percentage_24h:
                    getCoin.market_data?.price_change_percentage_24h,
                  price_change_percentage_7d:
                    getCoin.market_data?.price_change_percentage_7d,
                  price_change_percentage_14d:
                    getCoin.market_data?.price_change_percentage_14d,
                  total_volume: getCoin.market_data?.total_volume.usd,
                });
              }}
            >
              Add to watchlist
            </button>
          </Link>
        ) : (
          <div>
            <button
              className="mt-3 rounded-lg bg-blue-600 px-3 py-2 text-slate-50"
              onClick={() => signIn()}
            >
              Add to watchlist
            </button>
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {getCoin.name} Price ({getCoin.symbol.toUpperCase()})
        </p>
        <div className="flex items-center gap-3 align-middle">
          <p className="text-3xl font-bold antialiased">
            {getCoin.market_data?.current_price.usd &&
              dollar.format(getCoin.market_data.current_price.usd)}
          </p>
          <button
            disabled
            className={
              getCoin.market_data &&
              getCoin.market_data.price_change_percentage_24h > 0
                ? `rounded bg-green-500  px-2 py-1 text-gray-50`
                : `rounded bg-red-500 px-2 py-1 text-gray-50`
            }
          >
            {getCoin.market_data?.price_change_percentage_24h &&
              Math.round(
                getCoin.market_data.price_change_percentage_24h * 100
              ) / 100}
            %
          </button>
        </div>
        <p className="mt-5">
          Market Cap:{" "}
          <span>
            {getCoin.market_data?.market_cap.usd
              ? dollar.format(getCoin.market_data.market_cap.usd)
              : "No data"}
          </span>
        </p>
        <p>
          Fully Diluted Market Cap:{" "}
          <span>
            {getCoin.market_data?.fully_diluted_valuation.usd
              ? dollar.format(getCoin.market_data.fully_diluted_valuation.usd)
              : "No data"}
          </span>
        </p>
        <p>
          Volume 24h:{" "}
          <span>
            {getCoin.market_data?.high_24h.usd
              ? dollar.format(getCoin.market_data.high_24h.usd)
              : "No data"}
          </span>
        </p>
        Circulating supply:{" "}
        <span>
          {getCoin.market_data?.circulating_supply
            ? dollar.format(getCoin.market_data.circulating_supply)
            : "No data"}
        </span>
      </div>
      <div>
        {session ? (
          <>
            <h1 className="text-3xl font-bold">Buy a coin</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
              <input
                className="mt-1 rounded-lg p-3"
                value={value}
                {...register("quantity")}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                placeholder="Provide quantity (number)"
              />
              {errors?.quantity && (
                <p className="mt-2 font-medium text-red-500 drop-shadow transition ease-in dark:drop-shadow-none">
                  {errors.quantity.message}
                </p>
              )}
              <p className="mt-3">
                Estimated Cost:{" "}
                {value != ""
                  ? getCoin.market_data?.current_price &&
                    parseFloat(value) * getCoin.market_data?.current_price.usd
                  : ""}
                $
              </p>
              <button className="mt-3 rounded-lg bg-blue-600 px-3 py-2 text-slate-50">
                Submit
              </button>
            </form>
            {success && <p className="mt-3 text-green-500">{success}</p>}
          </>
        ) : (
          <h1 className="mt-10 text-3xl font-bold">
            Want to buy some? Sign in!
          </h1>
        )}
      </div>
    </div>
  );
};
