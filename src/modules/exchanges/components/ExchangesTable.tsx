import { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { ExchangesData } from "../../../server/trpc/router/exchanges";
import { ExchangeItem } from "./ExchangeItem";

type Data = ExchangesData;

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

export const ExchangesTable: React.FC<{ exchangesData: ExchangesData }> = ({
  exchangesData,
}) => {
  const [sortKey, setSortKey] = useState<SortKeys>("rank");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");

  const headers: { key: SortKeys; label: string }[] = [
    { key: "rank", label: "#" },
    { key: "name", label: "Exchange" },
    { key: "percentTotalVolume", label: "Volume %" },
    { key: "volumeUsd", label: "Volume" },
  ];

  const sortedExchanges = useCallback(
    () =>
      sortData({
        tableData: exchangesData,
        sortKey,
        reverse: sortOrder === "desc",
      }),
    [exchangesData, sortKey, sortOrder]
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
              {headers.map((row) => {
                return (
                  <th key={row.key} className="py-3 px-6">
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
            </tr>
          </thead>
          <tbody>
            {sortedExchanges().map((exchange) => (
              <ExchangeItem exchange={exchange} key={exchange.exchangeId} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
