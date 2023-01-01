import { trpc } from "../../utils/trpc";

export const WatchList: React.FC = () => {
  const { data: coins, isLoading } = trpc.watchlist.getAll.useQuery();
  const utils = trpc.useContext();
  const deleteCoin = trpc.watchlist.deleteFromWatchlist.useMutation({
    onMutate: () => {
      utils.watchlist.getAll.cancel();
      const optimisticUpdate = utils.watchlist.getAll.getData();

      if (optimisticUpdate) {
        utils.watchlist.getAll.setData(undefined, optimisticUpdate);
      }
    },
    onSettled: () => {
      utils.watchlist.getAll.invalidate();
    },
  });
  if (isLoading)
    return <div className="mt-10 text-xl font-semibold">Fetching coins...</div>;

  return (
    <div className="overflow-x-auto text-gray-800 dark:text-gray-300">
      <table className="min-w-full table-auto text-sm font-semibold md:table-fixed">
        <thead>
          <tr>
            <th className="px-6 py-4 text-left font-semibold">#</th>
            <th className="px-6 py-4 text-left font-semibold">Name</th>
            <th className="px-6 py-4 text-left font-semibold">Price</th>
            <th className="px-6 py-4 text-left font-semibold">24h%</th>
            <th className="px-6 py-4 text-left font-semibold">Volume</th>
          </tr>
        </thead>
        <tbody>
          {coins?.map((coin) => {
            return (
              <tr
                key={coin.userId}
                className={`border-b border-gray-200 dark:border-gray-800 dark:hover:bg-blue-900/10`}
              >
                <td className="px-6 py-4 text-left font-semibold">
                  {coin.rank}
                </td>
                <td className="px-6 py-4 text-left font-semibold">
                  {coin.name}
                </td>
                <td className="px-6 py-4 text-left font-semibold">
                  {coin.price}
                </td>
                <td className="px-6 py-4 text-left font-semibold">
                  {coin.price_change_percentage_24h}
                </td>
                <td className="px-6 py-4 text-left font-semibold">
                  {coin.total_volume}
                </td>
                <td className="px-6 py-4 text-left font-semibold">
                  <button
                    className="rounded-lg bg-red-500 px-2 py-1 font-medium text-neutral-50"
                    onClick={async () => {
                      deleteCoin.mutate({
                        id: coin.id,
                      });
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
