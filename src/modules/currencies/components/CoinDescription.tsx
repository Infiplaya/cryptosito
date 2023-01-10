import { useState } from "react";

export const CoinDescription: React.FC<{
  name: string;
  description: { en: string };
}> = ({ name, description }) => {
  const [showMore, setShowMore] = useState(false);

  function truncateString(str: string, num: number) {
    if (str.length <= num) {
      return str;
    }
    // Return str truncated with '...' concatenated to the end of str.
    return str.slice(0, num) + "...";
  }

  return (
    <section className="mt-5 w-full md:w-1/2">
      {description.en.length > 0 && (
        <p className="text-2xl font-bold">About {name}</p>
      )}
      {showMore ? (
        <p
          dangerouslySetInnerHTML={{
            __html: description.en,
          }}
          className="mt-5"
        ></p>
      ) : (
        <p
          dangerouslySetInnerHTML={{
            __html: truncateString(description.en, 290),
          }}
          className="mt-5"
        ></p>
      )}
      {description.en.length > 290 && (
        <button
          className="mt-5 w-full rounded-lg bg-gray-500/20 py-3 font-bold text-gray-200"
          onClick={() => setShowMore((prev) => !prev)}
        >
          <p className="text-gray-600 dark:text-gray-200">
            {showMore ? "Show less" : "Show more"}
          </p>
        </button>
      )}
    </section>
  );
};
