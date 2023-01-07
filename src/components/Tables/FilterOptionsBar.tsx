import Link from "next/link";
import { GrayButton } from "../Buttons/GrayButton";

interface Props {
  handleCoinsPerPageChange: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  coinsPerPage: number;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

export const FilterOptionsBar: React.FC<Props> = ({
  handleCoinsPerPageChange,
  coinsPerPage,
  setSearchText,
}) => {
  return (
    <div className="mt-10 flex gap-3 p-3 text-xs font-semibold text-gray-800 dark:text-gray-200">
      <div className="mr-5 hidden md:block">
        <form>
          <input
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search a coin"
            className="block w-64 rounded-lg border border-gray-300 bg-gray-50 p-2 pl-5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          />
        </form>
      </div>
      <GrayButton>
        <Link href={`/watchlist`}>Watchlist</Link>
      </GrayButton>
      <GrayButton>
        <Link href={`/portfolio`}>Portfolio</Link>
      </GrayButton>
      <div className="mr-5 flex ml-auto items-center align-baseline">
        <label
          htmlFor="countries"
          className="block text-sm font-medium text-gray-900 dark:text-white"
        >
          Show rows
        </label>
        <select
          id="rows"
          onChange={handleCoinsPerPageChange}
          value={coinsPerPage}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
    </div>
  );
};
