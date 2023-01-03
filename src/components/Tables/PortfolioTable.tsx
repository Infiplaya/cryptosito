import { trpc } from "../../utils/trpc";

export const PortfolioTable = () => {
  const { data: boughtCoins, isLoading } = trpc.buyCoin.getAll.useQuery();

  console.log(boughtCoins);

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  return (
    <div className="overflow-x-auto text-gray-800 dark:text-gray-300">
      <table className="table-auto text-sm font-semibold w-full">
        <thead>
          <tr className="text-base">
            <th className="px-6 py-4 text-left font-semibold">Name</th>
            <th className="px-6 py-4 text-left font-semibold">Shares</th>
            <th className="px-6 py-4 text-left font-semibold">Price</th>
            <th className="px-6 py-4 text-left font-semibold">Total cost</th>
          </tr>
        </thead>
        <tbody>
          {boughtCoins?.map((coin) => (
            <>
              <tr className="w-full cursor-pointer border-b border-slate-200 hover:bg-blue-500/10 dark:border-slate-800">
                <td className="px-6 py-4 text-left font-semibold  text-slate-800 dark:text-slate-300">
                  <a
                    href={`/currencies/${coin.name.toLowerCase()}`}
                    key={coin.name}
                  >
                    {coin.name}
                  </a>
                </td>
                <td className="px-6 py-4 text-left font-semibold  text-slate-800 dark:text-slate-300">
                  {coin._sum.shares}
                </td>
                <td className="px-6 py-4 text-left font-semibold  text-slate-800 dark:text-slate-300">
                  ${coin.price}
                </td>
                <td className="px-6 py-4 text-left font-semibold  text-slate-800 dark:text-slate-300">
                  $
                  {coin.price && coin._sum.shares
                    ? coin.price * coin._sum.shares
                    : "Null"}
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};
