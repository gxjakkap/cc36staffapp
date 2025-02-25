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
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState<string>("");
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({ id: false });
  const [filterSubmitted, setFilterSubmitted] = React.useState<boolean>(true);

  const memoizedFilteredData = React.useMemo(() => {
    return filterSubmitted ? data.filter((row) => row.hasSubmit) : data;
  }, [data, filterSubmitted]);

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
    state: { sorting, columnVisibility, globalFilter },
    // Optionally, you can set an initial pagination state here:
    initialState: { pagination: { pageIndex: 0, pageSize: 15 } },
  });

  return (
    <div className="min-h-screen mx-10">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-[10rem] lg:max-w-sm"
        />
        <Button
          variant="outline"
          className="ml-2"
          onClick={() => setFilterSubmitted((prev) => !prev)}
        >
          {filterSubmitted ? "Show All" : "Filter Submitted"}
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-neutral-100">
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
      <div className="flex items-center justify-between space-x-2 py-4">
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
