import { useSession, signIn, signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";


export const TopNav = () => {
  const [data, setData] = useState<any>();
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const data = await (
        await fetch(
          "https://api.coingecko.com/api/v3/global"
        )
      ).json();

      // set state when the data received
      setData(data);
    };

    dataFetch();
  }, []);

  return (
    <ul className="container flex h-12 gap-5 px-16 text-xs font-semibold text-gray-600 dark:text-gray-400 md:items-center">
      <li>
        Cryptos:{" "}
        <span className={`text-blue-700 dark:text-blue-500`}>
          {data?.active_cryptocurrencies}
        </span>
      </li>
      <li>
        Exchanges:{" "}
        <span className={`text-blue-700 dark:text-blue-500`}>
          {data?.markets}
        </span>
      </li>
      <li>
        Market Cap:{" "}
        <span className={`text-blue-700 dark:text-blue-500`}>
          {data?.total_market_cap.usd &&
            Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(data.total_market_cap.usd)}
        </span>
      </li>
      <li>
        Total Volume:{" "}
        <span className={`text-blue-700 dark:text-blue-500`}>
          {data?.total_volume.usd &&
            Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(data.total_volume.usd)}
        </span>
      </li>
      <li className="flex gap-1">
        Dominance:{" "}
        <span className={`text-blue-700 dark:text-blue-500`}>
          BTC:{" "}
          {data?.market_cap_percentage.btc &&
            Math.round(data.market_cap_percentage.btc * 100) / 100}
          %, ETH:{" "}
          {data?.market_cap_percentage.eth &&
            Math.round(data.market_cap_percentage.eth * 100) / 100}
          %
        </span>
      </li>
      <FontAwesomeIcon
        icon={theme === "dark" ? faSun : faMoon}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={`ml-auto border-r border-gray-300 px-3 text-xl text-black dark:border-gray-700 dark:text-gray-50`}
        role={`button`}
      />

      {session ? (
        <div className="flex items-center gap-2 align-middle">
          <li>
            <button
              className="rounded-lg bg-blue-600 px-4 py-2 text-gray-50"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </li>
        </div>
      ) : (
        <div>
          <li>
            <button
              className="rounded-lg bg-blue-600 px-4 py-2 text-gray-50"
              onClick={() => signIn()}
            >
              Sign in
            </button>
          </li>{" "}
        </div>
      )}
    </ul>
  );
};
