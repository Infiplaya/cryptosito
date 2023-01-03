import { useState, useCallback } from "react";
import { CryptoData } from "../../server/trpc/router/cryptos";
import { CoinItem } from "./CoinItem";


type Data = CryptoData;

type SortKeys = keyof Data[0];

type SortOrder = "ascn" | "desc";

function sortData({
  tableData,
  sortKey,
  reverse,
}: {
  tableData: Data;
  sortKey: SortKeys;
  reverse: boolean;
}) {
  if (!sortKey) return tableData;

  const sortedData = tableData.sort((a, b) => {
    return a[sortKey]!  > b[sortKey]! ? 1 : -1;
  });

  if (reverse) {
    return sortedData.reverse();
  }

  return sortedData;
}

function SortButton({
  sortOrder,
  columnKey,
  sortKey,
  onClick,
}: {
  sortOrder: SortOrder;
  columnKey: SortKeys;
  sortKey: SortKeys;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button onClick={onClick}>
      {sortKey === columnKey && sortOrder === "desc" ? "▼" : "▲"}
    </button>
  );
}

export function CryptoTable({
  cryptoData,
}: {
  cryptoData: CryptoData;
}): JSX.Element {
  const [searchText, setSearchText] = useState("");
  const [sortKey, setSortKey] = useState<SortKeys>("market_cap_rank");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");

  function hideRows(key: string) {
    if (key === "total_volume" || key === "market_cap") {
      return "hidden md:table-cell";
    } else {
      return;
    }
  }

  const headers: { key: SortKeys; label: string }[] = [
    { key: "market_cap_rank", label: "#" },
    { key: "name", label: "Coin" },
    { key: "current_price", label: "Price" },
    { key: "price_change_percentage_1h_in_currency", label: "1h %" },
    { key: "price_change_percentage_24h", label: "24h %" },
    { key: "price_change_percentage_7d_in_currency", label: "7d %" },
    { key: "total_volume", label: "Volume 24h" },
    { key: "market_cap", label: "Market Cap" },
  ];

  const sortedCoins = useCallback(
    () =>
      sortData({
        tableData: cryptoData,
        sortKey,
        reverse: sortOrder === "desc",
      }),
    [cryptoData, sortKey, sortOrder]
  );

  function changeSort(key: SortKeys) {
    setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");

    setSortKey(key);
  }

  return (
    <div>
      <div className="mt-5">
        <form className="mt-2">
          <input
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search a coin"
            className="block w-64 rounded-lg border border-gray-300 bg-gray-50 p-3 pl-5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          />
        </form>
      </div>
      <div className="relative mt-5 overflow-x-auto">
        <table className="w-full text-left text-sm font-semibold text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="py-3 px-6"></th>
              {headers.map((row) => {
                return (
                  <td
                    key={row.key}
                    className={`${hideRows(row.key)} py-3 px-6`}
                  >
                    {row.label}{" "}
                    <SortButton
                      columnKey={row.key}
                      onClick={() => changeSort(row.key)}
                      {...{
                        sortOrder,
                        sortKey,
                      }}
                    />
                  </td>
                );
              })}
              <th className="hidden py-3 px-6 md:table-cell">7D</th>
            </tr>
          </thead>
          <tbody>
            {sortedCoins()
              .filter((val) => {
                if (searchText === "") {
                  return val;
                } else if (
                  val.name.toLowerCase().includes(searchText.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((coin) => (
                <CoinItem coin={coin} key={coin.id} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
