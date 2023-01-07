import { FilterOptionsBar } from "./FilterOptionsBar";
import { CryptoTable } from "./CryptoTable";
import React, { useEffect, useState } from "react";
import Pagination from "../Pagination";
import { memo } from "react";
import { trpc } from "../../utils/trpc";
import Loader from "../Loader";

export const FilterableCryptoTable = memo(function FilterableCryptoTable({}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage, setCoinsPerPage] = useState(50);
  const [searchText, setSearchText] = useState("");
  const [cryptoData, setCryptoData] = useState<any>();

  const cryptos = trpc.cryptos.getCryptos.useQuery(undefined, {
    enabled: false,
  });

  useEffect(() => {
    cryptos.refetch();
    setCryptoData(cryptos.data);
  }, [cryptos]);
  if (!cryptoData) {
    return <Loader />;
  }

  const handleCoinsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCoinsPerPage(parseInt(event.target.value));
  };

  const lastCoinIndex = currentPage * coinsPerPage;
  const firstCoinIndex = lastCoinIndex - coinsPerPage;
  const currentCoins = cryptoData.slice(firstCoinIndex, lastCoinIndex);

  return (
    <div className="w-full items-center overflow-x-auto">
      <FilterOptionsBar
        handleCoinsPerPageChange={handleCoinsPerPageChange}
        coinsPerPage={coinsPerPage}
        setSearchText={setSearchText}
      />
      <CryptoTable cryptoData={currentCoins} searchText={searchText} />
      <div className="mt-5 flex w-full flex-col md:flex-row">
        <Pagination
          totalCoins={cryptoData.length}
          coinsPerPage={coinsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
        <div className="mt-5 ml-5 block gap-3 align-middle md:ml-10 md:flex">
          <label
            htmlFor="rows"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            Show rows
          </label>
          <select
            id="rows"
            onChange={handleCoinsPerPageChange}
            value={coinsPerPage}
            className="block rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
    </div>
  );
});
