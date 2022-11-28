import Link from "next/link";
import { GrayButton } from "../Buttons/GrayButton";

export default function FilterOptionsBar() {
  return (
    <div className="mt-5 flex min-w-full gap-5 py-3 align-middle text-xs font-bold text-gray-800 dark:text-gray-200">
      <GrayButton>
        <Link href={`/watchlist`}>Watchlist</Link>
      </GrayButton>
      <GrayButton>
        <Link href={`/portfolio`}>Portfolio</Link>
      </GrayButton>
    </div>
  );
}
