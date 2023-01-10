import { useState, useCallback } from "react";
import { CryptoData } from "../../../server/trpc/router/cryptos";
import { trpc } from "../../../utils/trpc";
import { CoinItem } from "./CoinItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

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
    return a[sortKey]! > b[sortKey]! ? 1 : -1;
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
    <button onClick={onClick} className="ml-3 hidden md:table-cell">
      {sortKey === columnKey && sortOrder === "desc" ? (
        <FontAwesomeIcon icon={faSortDown} size="lg" />
      ) : (
        <FontAwesomeIcon icon={faSortUp} size="lg" />
      )}
    </button>
  );
}

export function CryptoTable({
  cryptoData,
  searchText,
}: {
  cryptoData: CryptoData;
  searchText: string;
}): JSX.Element {
  const [sortKey, setSortKey] = useState<SortKeys>("market_cap_rank");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");

  const { data: watchlistData } = trpc.watchlist.getAll.useQuery();

  const coinsNames = watchlistData?.map((coin: any) => coin.name);


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
      <div className="relative mt-2 overflow-x-auto">
        <table className="w-full text-left text-sm font-semibold text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="py-3 px-6"></th>
              {headers.map((row) => {
                return (
                  <th
                    key={row.key}
                    className="py-3 px-6"
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
                  </th>
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
                <CoinItem
                  coin={coin}
                  key={coin.id}
                  isSaved={coinsNames?.includes(coin.name)}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
