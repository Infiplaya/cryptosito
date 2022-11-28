export const RecentCard: React.FC<{ recentCoins: JSX.Element[] }> = ({
  recentCoins,
}) => {
  return (
    <div className="flex-1 cursor-pointer rounded-lg bg-white shadow-md dark:bg-gray-700 dark:shadow sm:h-56 lg:h-auto">
      <div className="flex justify-between align-middle">
        <h2 className="text-md ml-5 p-5 font-bold">🕑 Recently Added</h2>
      </div>
      <ul className="ml-5 space-y-4 text-xs font-bold text-gray-800 dark:text-gray-200">
        {recentCoins}
      </ul>
    </div>
  );
};
