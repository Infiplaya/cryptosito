import Link from "next/link";
import { trpc } from "../../utils/trpc";

export const PortfolioTable = () => {
  const { data: boughtCoins, isLoading } = trpc.buyCoin.getAll.useQuery();

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  return (
    <table className="min-w-full table-auto text-sm font-semibold md:table-fixed">
      <thead>
        <tr className="text-base">
          <th className="px-6 py-4 text-left font-semibold">Name</th>
          <th className="px-6 py-4 text-left font-semibold">Price</th>
          <th className="px-6 py-4 text-left font-semibold">Shares</th>
        </tr>
      </thead>
      <tbody>
        {boughtCoins?.map((coin) => (
          <Link href={`/currencies/${coin.name.toLowerCase()}`} key={coin.id}>
            <tr className="cursor-pointer border-b border-slate-200 hover:bg-blue-500/10 dark:border-slate-800">
              <td className="px-6 py-4 text-left font-semibold  text-slate-800 dark:text-slate-300">
                {coin.name}
              </td>
              <td className="px-6 py-4 text-left font-semibold  text-slate-800 dark:text-slate-300">
                {coin.price}
              </td>
              <td className="px-6 py-4 text-left font-semibold  text-slate-800 dark:text-slate-300">
                {coin.shares}
              </td>
            </tr>
          </Link>
        ))}
      </tbody>
    </table>
  );
};
