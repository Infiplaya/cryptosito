import FilterOptionsBar from "./FilterOptionsBar";
import { CryptoData, CryptoTable } from "./CryptoTable";
import React from "react";

interface Props {
  cryptoData: CryptoData[];
}

export default function FilterableCryptoTable({ cryptoData }: Props) {
  return (
    <div className="w-full items-center overflow-x-auto">
      <FilterOptionsBar />
      <CryptoTable cryptoData={cryptoData} />
    </div>
  );
}
