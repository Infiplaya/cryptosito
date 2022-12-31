import type { Table } from "@tanstack/react-table";
import type { CryptoData } from "../Tables/CryptoTable";

export const Pagination: React.FC<{ table: Table<CryptoData> }> = ({
  table,
}) => {
  return (
    <>
      <div className="flex flex-col items-center justify-end gap-2 md:flex-row">
        <div className="flex gap-2">
          <button
            className="rounded-lg bg-gray-200 px-3 py-2 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="rounded-lg bg-gray-200 px-3 py-2 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="rounded-lg bg-gray-200 px-3 py-2 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="rounded-lg bg-gray-200 px-3 py-2 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
        </div>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <select
          className="ml-3 rounded-lg bg-gray-200 px-3 py-2 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 25, 50, 75, 100].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
