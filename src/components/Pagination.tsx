const Pagination = ({
  totalCoins,
  coinsPerPage,
  setCurrentPage,
  currentPage,
}: {
  totalCoins: number;
  coinsPerPage: number;
  setCurrentPage: any;
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
    <nav>
      <ul className="mt-5 flex gap-2">
        <li>
          <button
            onClick={handleFirstClick}
            className="rounded-lg p-2 shadow dark:bg-gray-700"
            disabled={currentPage === 1}
          >
            {"<<<"}
          </button>
        </li>
        <li>
          <button
            onClick={handlePrevClick}
            className="rounded-lg p-2 shadow dark:bg-gray-700"
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
        </li>
        <li className="rounded-lg p-2">
          Page {currentPage} of {totalPages}
        </li>
        <li>
          <button
            onClick={handleNextClick}
            className="rounded-lg p-2 shadow dark:bg-gray-700"
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
        </li>
        <li>
          <button
            onClick={handleLastClick}
            className="rounded-lg p-2 shadow dark:bg-gray-700"
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
