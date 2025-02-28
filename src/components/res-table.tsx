"use client";

import * as React from "react";
import { redirect, RedirectType } from "next/navigation";
import {
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortDirection,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  ChevronUp,
} from "lucide-react";
import {
  createParser,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "nuqs";

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

interface SortableHeaderProps {
  children: React.ReactNode;
  isSorted: false | SortDirection;
  onSort: () => void;
}

const SortableHeader = ({
  children,
  isSorted,
  onSort,
}: SortableHeaderProps) => {
  return (
    <Button variant="ghost" size="sm" onClick={onSort}>
      {children}
      {isSorted === "asc" && <ChevronUp />}
      {isSorted === "desc" && <ChevronDown />}
      {isSorted === false && <ChevronsUpDown />}
    </Button>
  );
};

const genderVal = (val: string) => {
  return val === "man" ? "ชาย" : "หญิง";
};

const parseAsSorting = createParser({
  parse: (value: string | null) => {
    if (!value) return [];
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? (parsed as SortingState) : [];
    } catch (e) {
      console.error(e);
      return [];
    }
  },
  serialize: (value: SortingState) => {
    if (!value || !Array.isArray(value) || value.length === 0) {
      return null as unknown as string;
    }
    return JSON.stringify(value);
  },
}).withDefault([]);

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
  const [sorting, setSorting] = useQueryState("sort", parseAsSorting);

  const effectiveSorting = React.useMemo<SortingState>(
    () => (Array.isArray(sorting) ? sorting : []),
    [sorting],
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({ id: false });

  const memoizedFilteredData = React.useMemo(() => {
    let filteredData = data;

    if (onlySubmitted) {
      filteredData = filteredData.filter((row) => row.hasSubmit);
    }

    return filteredData;
  }, [data, onlySubmitted]);

  const cycleSorting = (column: Column<ResColumn, unknown>) => {
    const currentSortDirection = column.getIsSorted();
    if (currentSortDirection === false) {
      column.toggleSorting(false);
    } else if (currentSortDirection === "asc") {
      column.toggleSorting(true);
    } else {
      column.clearSorting();
    }
  };

  const columns = React.useMemo<ColumnDef<ResColumn>[]>(
    () => [
      {
        accessorKey: "fullname",
        header: ({ column }) => (
          <SortableHeader
            isSorted={column.getIsSorted()}
            onSort={() => cycleSorting(column)}
          >
            Name
          </SortableHeader>
        ),
        cell: ({ row }) => <div>{row.getValue("fullname")}</div>,
      },
      {
        accessorKey: "gender",
        header: ({ column }) => (
          <SortableHeader
            isSorted={column.getIsSorted()}
            onSort={() => cycleSorting(column)}
          >
            Gender
          </SortableHeader>
        ),
        cell: ({ row }) => <div>{genderVal(row.getValue("gender"))}</div>,
      },
      {
        accessorKey: "phone",
        header: ({ column }) => (
          <SortableHeader
            isSorted={column.getIsSorted()}
            onSort={() => cycleSorting(column)}
          >
            Phone
          </SortableHeader>
        ),
        cell: ({ row }) => <div>{row.getValue("phone")}</div>,
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <SortableHeader
            isSorted={column.getIsSorted()}
            onSort={() => cycleSorting(column)}
          >
            Email
          </SortableHeader>
        ),
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue("email")}</div>
        ),
      },
      {
        accessorKey: "hasSubmit",
        header: ({ column }) => (
          <SortableHeader
            isSorted={column.getIsSorted()}
            onSort={() => cycleSorting(column)}
          >
            Submit
          </SortableHeader>
        ),
        cell: ({ row }) => <div>{row.getValue("hasSubmit") ? "✅" : "❌"}</div>,
      },
    ],
    [],
  );

  const table = useReactTable({
    data: memoizedFilteredData,
    columns,
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === "function" ? updater(effectiveSorting) : updater;
      setSorting(newSorting);
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting: effectiveSorting,
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
                      className="px-5"
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
