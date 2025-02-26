"use client";

import * as React from "react";
import { redirect, RedirectType } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "nuqs";

export interface ResColumn {
  id: string;
  fullname: string | null;
  gender: string | null;
  phone: string | null;
  email: string;
  hasSubmit: boolean;
}

interface ResTableProps {
  data: ResColumn[];
}

const genderVal = (val: string) => {
  return val === "man" ? "ชาย" : "หญิง";
};

export function ResTable({ data }: ResTableProps) {
  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));
  const [onlySubmitted, setOnlySubmitted] = useQueryState(
    "submitted",
    parseAsBoolean.withDefault(true),
  );
  const [pageIndex, setPageIndex] = useQueryState(
    "page",
    parseAsInteger.withDefault(0),
  );
  const [pageSize, setPageSize] = useQueryState(
    "size",
    parseAsInteger.withDefault(15),
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({ id: false });

  const memoizedFilteredData = React.useMemo(() => {
    let filteredData = data;

    if (onlySubmitted) {
      filteredData = filteredData.filter((row) => row.hasSubmit);
    }

    return filteredData;
  }, [data, onlySubmitted]);

  const columns = React.useMemo<ColumnDef<ResColumn>[]>(
    () => [
      {
        accessorKey: "fullname",
        header: "Name",
        cell: ({ row }) => <div>{row.getValue("fullname")}</div>,
      },
      {
        accessorKey: "gender",
        header: "Gender",
        cell: ({ row }) => <div>{genderVal(row.getValue("gender"))}</div>,
      },
      {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => <div>{row.getValue("phone")}</div>,
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue("email")}</div>
        ),
      },
      {
        accessorKey: "hasSubmit",
        header: "Submit",
        cell: ({ row }) => <div>{row.getValue("hasSubmit") ? "✅" : "❌"}</div>,
      },
    ],
    [],
  );

  const table = useReactTable({
    data: memoizedFilteredData,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
      globalFilter: search,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onGlobalFilterChange: setSearch,
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;

      setPageIndex(newPagination.pageIndex);
      setPageSize(newPagination.pageSize);
    },
  });

  return (
    <div className="container mx-auto">
      <div className="flex items-center py-4 flex-wrap gap-2">
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-[10rem] lg:max-w-sm"
        />
        <Button
          variant="outline"
          onClick={() => setOnlySubmitted(!onlySubmitted)}
          className={onlySubmitted ? "bg-accent" : ""}
        >
          {onlySubmitted ? "Show All" : "Filter Submitted"}
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="cursor-pointer">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      onClick={() => {
                        if (cell.column.id !== "action") {
                          redirect(
                            `/nong/${row.original.id}`,
                            RedirectType.push,
                          );
                        }
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4 flex-wrap gap-2">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <div className="text-sm px-2">
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
