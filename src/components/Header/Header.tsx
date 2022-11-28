import { TopNav } from "./TopNav";
import { Navbar } from "./Navbar";

const Header = () => {
  return (
    <>
      <header className="hidden min-w-full justify-center border-b border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900  lg:flex">
        <TopNav />
      </header>
      <header className="w-full border-b border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900">
        <Navbar />
      </header>
    </>
  );
};

export default Header;
