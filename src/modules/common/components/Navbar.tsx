import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/logo.png";
import { useSession, signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "next-themes";
import PopoverComponent from "./Popover";

export const Navbar = () => {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  return (
    <ul className="container mx-auto flex h-20 items-center gap-5 px-10 align-middle text-sm font-bold">
      <li>
        <Link href={`/`}>
          <Image
            src={logo}
            alt={`logo`}
            className={`h-auto w-52 dark:invert`}
            role={`button`}
          ></Image>
        </Link>
      </li>
      <li className="hidden md:block">
        <Link href="/">
          <button className="rounded-lg px-3 py-2 text-sm font-normal text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
            Cryptocurrencies
          </button>
        </Link>
      </li>
      <li className="hidden md:block">
        <Link href="/exchanges">
          <button className="rounded-lg px-3 py-2 text-sm font-normal text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
            Exchanges
          </button>
        </Link>
      </li>
      <li className="ml-auto hidden md:block">
        <Link href="/watchlist">
          <button className="rounded-lg px-3 py-2 text-sm font-normal text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
            Watchlist
          </button>
        </Link>
      </li>
      <li className="mr-5 hidden md:block">
        <Link href="/portfolio">
          <button className="rounded-lg px-3 py-2 text-sm font-normal text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
            Portfolio
          </button>
        </Link>
      </li>
      <li className="mr-5 hidden md:block">
        <Link href="/community">
          <button className="rounded-lg px-3 py-2 text-sm font-normal text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
            Community
          </button>
        </Link>
      </li>
      <li className="mr-5 hidden md:block">
        <Link href="/profile">
          <button className="rounded-lg px-3 py-2 text-sm font-normal text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
            Profile
          </button>
        </Link>
      </li>
      <li className="ml-auto md:hidden">
        {session ? (
          <PopoverComponent />
        ) : (
          <button onClick={() => signIn()}>Sign In</button>
        )}
      </li>
      <li className="md:hidden">
        <FontAwesomeIcon
          icon={theme === "dark" ? faSun : faMoon}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className={`ml-auto text-xl text-black dark:border-gray-700 dark:text-gray-50`}
          role={`button`}
        />
      </li>
    </ul>
  );
};
