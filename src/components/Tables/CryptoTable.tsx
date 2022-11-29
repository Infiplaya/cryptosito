import { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
} from "@tanstack/react-table";

import Link from "next/link";
import { Pagination } from "../Other/Pagination";

import { Sparklines, SparklinesLine } from "react-sparklines";

interface Props {
  cryptoData: CryptoData[];
  coin: any;
}

export type CryptoData = {
  id: string;
  market_cap_rank: number;
  name: string;
  current_price: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  sparkline_in_7d: Sparkline;
};

type Sparkline = {
  price: Array<number>;
};

const dollar = new Intl.NumberFormat("eng-EN", {
  style: "currency",
  currency: "USD",
});

const normal = new Intl.NumberFormat("eng-EN", {});

const columnHelper = createColumnHelper<CryptoData>();

const columns = [
  columnHelper.accessor("market_cap_rank", {
    cell: (info) => info.getValue(),
    header: () => <span>#</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.id, {
    id: "name",
    cell: (info) => (
      <Link href={`/currencies/${info.getValue().toLowerCase()}`}>
        {info.getValue().toUpperCase()}
      </Link>
    ),
    header: () => <span>Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("current_price", {
    header: () => "Price",
    cell: (info) => <span>{dollar.format(info.getValue())}</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("price_change_percentage_1h_in_currency", {
    header: () => <span>1h%</span>,
    cell: (info) => (
      <span
        className={
          info.getValue() > 0
            ? `text-green-600 dark:text-green-500`
            : `text-red-600 dark:text-red-500`
        }
      >
        {Math.round(info.getValue() * 100) / 100}%
      </span>
    ),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("price_change_percentage_24h", {
    header: "24h%",
    cell: (info) => (
      <span
        className={
          info.getValue() > 0
            ? `text-green-600 dark:text-green-500`
            : `text-red-600 dark:text-red-500`
        }
      >
        {Math.round(info.getValue() * 100) / 100}%
      </span>
    ),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("price_change_percentage_7d_in_currency", {
    header: "7d%",
    cell: (info) => (
      <span
        className={
          info.getValue() > 0
            ? `text-green-600 dark:text-green-500`
            : `text-red-600 dark:text-red-500`
        }
      >
        {Math.round(info.getValue() * 100) / 100}%
      </span>
    ),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("market_cap", {
    header: "Market Cap",
    cell: (info) => <span>{dollar.format(info.getValue())}</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("total_volume", {
    header: "Volume",
    cell: (info) => <span>{dollar.format(info.getValue())}</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("circulating_supply", {
    header: "Circulating Supply",
    cell: (info) => <span>{normal.format(Math.round(info.getValue()))}</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("sparkline_in_7d.price", {
    header: "Last 7 Days",
    cell: (info) => (
      <Sparklines data={info.getValue()}>
        <SparklinesLine color="teal"></SparklinesLine>
      </Sparklines>
    ),
  }),
];

export function CryptoTable({ cryptoData }: Props): JSX.Element {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data, setData] = useState(() => [...cryptoData]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 25,
      },
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });
  return (
    <div className="text-gray-800 dark:text-gray-300">
      <table className="min-w-full table-auto text-sm font-semibold md:table-fixed">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-6 py-4 text-left font-semibold"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " ▲",
                          desc: " ▼",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={`border-b border-gray-200 dark:border-gray-800 dark:hover:bg-blue-900/10`}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="whitespace-nowrap px-6 py-4"
                  title="Click on the coin name to go to it's detail page"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-5 h-2" />
      <Pagination table={table} />
    </div>
  );
}
