import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { trpc } from "../utils/trpc";

const TodayCrypto = () => {
  const { data: globalInfo } = trpc.globalInfo.getGlobal.useQuery();
  const market_cap = globalInfo?.data?.total_market_cap.usd;
  const change_percentage =
    globalInfo?.data?.market_cap_change_percentage_24h_usd;

  function MoneyFormat(labelValue: number | bigint | undefined) {
    return Math.abs(Number(labelValue)) / 1.0e9;
  }

  const formatted = MoneyFormat(market_cap ? market_cap : undefined);

  if (change_percentage)
    return (
      <div className="mt-5 w-full">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-50">
            Today&apos;s Cryptocurrency Prices by Market Cap
          </h1>
        </div>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          The global crypto market cap is{" "}
          <span className="font-bold">
            {"$" + Math.round((formatted * 100) / 100) + "B"}
          </span>
          , a{" "}
          <span
            className={
              change_percentage < 0
                ? `font-bold text-red-500`
                : `font-bold text-green-500`
            }
          >
            {change_percentage < 0 ? (
              <FontAwesomeIcon icon={faCaretDown} className={`mr-1 ml-1`} />
            ) : (
              <FontAwesomeIcon icon={faCaretUp} className={`mr-1`} />
            )}
            {Math.abs(Math.round(change_percentage * 100) / 100)}%
          </span>{" "}
          {change_percentage > 0 ? "increase" : "decrease"} over the last day.
        </p>
      </div>
    );
  return <></>;
};

export default TodayCrypto;
