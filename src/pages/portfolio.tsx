import { useSession, signIn } from "next-auth/react";
import Navbar from "../components/Header/Header";
import { PortfolioTable } from "../components/Tables/PortfolioTable";

const Portfolio = () => {
  const { data: session } = useSession();
  return (
    <>
      <Navbar />
      <main className="mx-auto flex min-h-screen w-screen flex-col p-4 align-middle lg:container lg:px-16">
        {session ? (
          <>
            {" "}
            <h1 className="border-gray-200 p-5 text-2xl font-bold dark:border-gray-800">
              Portfolio
            </h1>
            <h2 className="mt-10 mb-5 text-xl font-semibold">
              Your bought coins
            </h2>
            <PortfolioTable />
          </>
        ) : (
          <button
            onClick={() => signIn()}
            className="w-32 self-center rounded-lg bg-blue-500 p-2 font-medium"
          >
            Sign In
          </button>
        )}
      </main>
    </>
  );
};

export default Portfolio;
