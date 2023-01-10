import Loader from "../../modules/common/components/Loader";
import { ExchangesTable } from "../../modules/exchanges/components/ExchangesTable";
import { trpc } from "../../utils/trpc";

const index = () => {
  const { data: exchangesData } = trpc.exchanges.getExchanges.useQuery();
  return (
    <main className="mx-auto p-4 align-middle lg:container lg:px-16">
      <>
        <h1 className="text-3xl font-bold">Top cryptocurrency exchanges</h1>
        {exchangesData ? (
          <ExchangesTable exchangesData={exchangesData} />
        ) : (
          <Loader />
        )}
      </>
    </main>
  );
};

export default index;
