export const CoinDescription: React.FC<{
  name: string;
  description: { en: string };
}> = ({ name, description }) => {
  return (
    <article className="mt-10 md:w-1/2">
      <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
        What is {name}?
      </h3>
      <p
        className="mt-3 w-full dark:text-gray-300"
        dangerouslySetInnerHTML={{ __html: description.en }}
      ></p>
    </article>
  );
};
