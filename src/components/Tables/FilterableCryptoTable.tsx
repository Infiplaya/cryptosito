import FilterOptionsBar from "./FilterOptionsBar";
import { CryptoTable } from "./CryptoTable";
import React, { useState } from "react";
import Pagination from "../Pagination";
import { CryptoData } from "../../server/trpc/router/cryptos";

interface Props {
  cryptoData: CryptoData;
}

export default function FilterableCryptoTable({ cryptoData }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage, setCoinsPerPage] = useState(20);

  const handleCoinsPerPageChange = (event: any) => {
    setCoinsPerPage(event.target.value);
  };

  const lastCoinIndex = currentPage * coinsPerPage;
  const firstCoinIndex = lastCoinIndex - coinsPerPage;
  const currentCoins = cryptoData.slice(firstCoinIndex, lastCoinIndex);

  return (
    <div className="w-full items-center overflow-x-auto">
      <FilterOptionsBar />
      <CryptoTable cryptoData={currentCoins} />
      <div className="flex w-full justify-between">
        <Pagination
          totalCoins={cryptoData.length}
          coinsPerPage={coinsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
        <div className="p-2">
          <p>Show rows:</p>
          <select
            onChange={handleCoinsPerPageChange}
            value={coinsPerPage}
            className="w-36 rounded-lg p-2"
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
}
