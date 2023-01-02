import { useSession} from "next-auth/react";
import { useRouter } from "next/navigation";
import { WatchList } from "../components/Tables/WatchlistTable";

const Watchlist = () => {
  const router = useRouter();

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/api/auth/signin");
    },
  });

  if (status === "loading") {
    return <>Loading or not authenticated...</>;
  }

  return (
    <>
      <main className="mx-auto flex min-h-screen w-screen flex-col p-4 align-middle lg:container lg:px-16">
        <div>
          <h1 className="border-b border-gray-200 p-5 text-4xl font-bold dark:border-gray-800">
            Watchlist
          </h1>
          <p className="mb-10 text-2xl font-bold mt-5">List of your coins</p>
          <WatchList />
        </div>
      </main>
    </>
  );
};

export default Watchlist;
