import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PortfolioTable } from "../components/Tables/PortfolioTable";

const Portfolio = () => {
  const router = useRouter();

  const { status } = useSession({
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
        <h1 className="border-gray-200 p-5 text-2xl font-bold dark:border-gray-800">
          Portfolio
        </h1>
        <h2 className="mt-10 mb-5 text-xl font-semibold">Your bought coins</h2>
        <PortfolioTable />
      </main>
    </>
  );
};

export default Portfolio;
