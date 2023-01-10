interface Exchange {
  exchangeId: string;
  name: string;
  rank: number;
  percentTotalVolume: string | null;
  volumeUsd: string | null;
  tradingPairs: string;
  socket: boolean | null;
  exchangeUrl: string;
  updated: number;
}

export const ExchangeItem = ({ exchange }: { exchange: Exchange }) => {
  return (
    <tr className="border-b bg-white hover:bg-blue-100/5 dark:border-gray-700 dark:bg-gray-800 hover:dark:bg-blue-100/5">
      <td className="py-4 px-6">{exchange.rank}</td>
      <td className="py-4 px-6">{exchange.name}</td>
      <td className="py-4 px-6">
        {typeof exchange.percentTotalVolume === "string"
          ? `${parseFloat(exchange.percentTotalVolume).toFixed(2)}%`
          : "null"}
      </td>
      <td className="py-4 px-6">
        {typeof exchange.volumeUsd === "string"
          ? `${parseFloat(exchange.volumeUsd).toFixed(2)} $`
          : "null"}
      </td>
    </tr>
  );
};
