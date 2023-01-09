import { FilterOptionsBar } from "./FilterOptionsBar";
import { CryptoTable } from "./CryptoTable";
import { useState, useMemo } from "react";
import { Pagination } from "../Pagination";
import { trpc } from "../../utils/trpc";
import { TableSkeleton } from "../LoadingSkeletons/TableSkeleton";

export const FilterableCryptoTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage, setCoinsPerPage] = useState(20);
  const [searchText, setSearchText] = useState("");

  const { data: cryptoData, isLoading } = trpc.cryptos.getCryptos.useQuery();

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * coinsPerPage;
    const lastPageIndex = firstPageIndex + coinsPerPage;
    return cryptoData?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, coinsPerPage, cryptoData]);

  const handleCoinsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCoinsPerPage(parseInt(event.target.value));
  };

  return (
    <div className="w-full items-center overflow-x-auto">
      <FilterOptionsBar
        handleCoinsPerPageChange={handleCoinsPerPageChange}
        coinsPerPage={coinsPerPage}
        setSearchText={setSearchText}
      />
      {currentData ? (
        <CryptoTable cryptoData={currentData} searchText={searchText} />
      ) : (
        <TableSkeleton />
      )}
      <div className="mt-5 flex w-full flex-col p-3 md:flex-row">
        {cryptoData && (
          <Pagination
            currentPage={currentPage}
            totalCount={cryptoData.length}
            pageSize={coinsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
        <div className="mt-5 block gap-3 md:mt-0 md:flex md:items-center md:self-end">
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
};
