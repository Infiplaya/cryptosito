import { useSession, signIn } from "next-auth/react";
import Navbar from "../components/Header/Header";
import { WatchList } from "../components/Tables/WatchlistTable";

const Watchlist = () => {
  const { data: session } = useSession();

  if (session)
    return (
      <>
        <Navbar />
        <main className="mx-auto flex min-h-screen w-screen flex-col p-4 align-middle lg:container lg:px-16">
          <div>
            <h1 className="border-b border-gray-200 p-5 text-2xl font-bold dark:border-gray-800">
              Watchlist
            </h1>
            <p className="mb-10">
              Note: testing TRPC backend, it may not yet work
            </p>
            <WatchList />
          </div>
        </main>
      </>
    );

  return (
    <>
      <Navbar />
      <main className="flex h-96 items-center justify-center">
        <button
          onClick={() => signIn()}
          className="w-32 self-center rounded-lg bg-blue-500 p-2 font-medium"
        >
          Sign In
        </button>
      </main>
    </>
  );
};

export default Watchlist;
