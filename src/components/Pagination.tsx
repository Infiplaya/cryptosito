const Pagination = ({
  totalCoins,
  coinsPerPage,
  setCurrentPage,
  currentPage,
}: {
  totalCoins: number;
  coinsPerPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}) => {
  const totalPages = Math.ceil(totalCoins / coinsPerPage);

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFirstClick = () => {
    setCurrentPage(1);
  };

  const handleLastClick = () => {
    setCurrentPage(totalPages);
  };

  return (
    <nav className="flex w-full">
      <ul className="mt-5 flex w-full justify-start md:justify-center px-5 gap-5">
        <li className="hidden rounded-lg p-2 md:list-item md:mr-auto">
          Page {currentPage} of {totalPages}
        </li>
        <li className="mt-3 text-sm md:hidden">
          {currentPage} / {totalPages}
        </li>
        <li className="flex gap-3 mb-3">
          <button
            onClick={handleFirstClick}
            className="rounded-lg px-3 py-2 shadow dark:bg-gray-700 border-gray-300 border"
            disabled={currentPage === 1}
          >
            {"<<<"}
          </button>
          <button
            onClick={handlePrevClick}
            className="rounded-lg px-3 py-2 shadow dark:bg-gray-700 border-gray-300 border"
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          <button
            onClick={handleNextClick}
            className="rounded-lg px-3 py-2 shadow dark:bg-gray-700 border-gray-300 border"
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
          <button
            onClick={handleLastClick}
            className="rounded-lg px-3 py-2 shadow dark:bg-gray-700 border-gray-300 border"
            disabled={currentPage === totalPages}
          >
            {">>>"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
