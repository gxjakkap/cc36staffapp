"use client";

import { useCallback, useMemo, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  TableState,
  Updater,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  Parser,
  useQueryState,
  UseQueryStateOptions,
  useQueryStates,
} from "nuqs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDebouncedCallback } from "@/hook/use-debounced-callback";
import { DataTableFilterField, ExtendedSortingState } from "@/types";

import { DataTableViewOptions } from "./column-toggle";
import { DataTablePagination } from "./pagination";
import { DataTableSkeleton } from "./skeleton";
import { DataTableToolbar } from "./toolbar";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterFields?: DataTableFilterField<TData>[];
  initialState?: Omit<Partial<TableState>, "sorting"> & {
    sorting?: ExtendedSortingState<TData>;
  };
  isLoading?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterFields,
  initialState,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const queryStateOptions = useMemo<
    Omit<UseQueryStateOptions<string>, "parse">
  >(() => {
    return {
      history: "push",
      scroll: false,
      shallow: true,
      throttleMs: 50,
      debounceMs: 300,
      clearOnDefault: false,
    };
  }, []);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    initialState?.columnVisibility ?? {},
  );

  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withOptions(queryStateOptions).withDefault(1),
  );

  const [perPage, setPerPage] = useQueryState(
    "perPage",
    parseAsInteger
      .withOptions(queryStateOptions)
      .withDefault(initialState?.pagination?.pageSize ?? 10),
  );

  const filterParsers = useMemo(() => {
    return (filterFields ?? []).reduce<
      Record<string, Parser<string> | Parser<string[]>>
    >((acc, field) => {
      if (field.options) {
        acc[field.id] = parseAsArrayOf(parseAsString, ",").withOptions(
          queryStateOptions,
        );
      } else {
        acc[field.id] = parseAsString.withOptions(queryStateOptions);
      }
      return acc;
    }, {});
  }, [filterFields, queryStateOptions]);

  const [filterValues, setFilterValues] = useQueryStates(filterParsers);

  const debouncedSetFilterValues = useDebouncedCallback(
    (values: typeof filterValues) => {
      void setFilterValues(values);
    },
    300,
  );

  const initialColumnFilters: ColumnFiltersState = useMemo(() => {
    return Object.entries(filterValues).reduce<ColumnFiltersState>(
      (filters, [key, value]) => {
        if (value !== null) {
          filters.push({
            id: key,
            value: Array.isArray(value) ? value : [value],
          });
        }
        return filters;
      },
      [],
    );
  }, [filterValues]);

  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>(initialColumnFilters);

  // Memoize computation of searchableColumns and filterableColumns
  const { searchableColumns, filterableColumns } = useMemo(() => {
    const fields = filterFields ?? [];
    return {
      searchableColumns: fields.filter((field) => !field.options),
      filterableColumns: fields.filter((field) => field.options),
    };
  }, [filterFields]);

  const onColumnFiltersChange = useCallback(
    (updaterOrValue: Updater<ColumnFiltersState>) => {
      setColumnFilters((prev) => {
        const next =
          typeof updaterOrValue === "function"
            ? updaterOrValue(prev)
            : updaterOrValue;

        const filterUpdates = next.reduce<
          Record<string, string | string[] | null>
        >((acc, filter) => {
          if (searchableColumns.find((col) => col.id === filter.id)) {
            // For search filters, use the value directly
            acc[filter.id] = filter.value as string;
          } else if (filterableColumns.find((col) => col.id === filter.id)) {
            // For faceted filters, use the array of values
            acc[filter.id] = filter.value as string[];
          }
          return acc;
        }, {});

        for (const prevFilter of prev) {
          if (!next.some((filter) => filter.id === prevFilter.id)) {
            filterUpdates[prevFilter.id] = null;
          }
        }

        debouncedSetFilterValues(filterUpdates);
        return next;
      });
    },
    [debouncedSetFilterValues, filterableColumns, searchableColumns],
  );

  // Paginate
  const pagination: PaginationState = {
    pageIndex: page - 1, // zero-based index -> one-based index
    pageSize: perPage,
  };

  function onPaginationChange(updaterOrValue: Updater<PaginationState>) {
    if (typeof updaterOrValue === "function") {
      const newPagination = updaterOrValue(pagination);
      void setPage(newPagination.pageIndex + 1);
      void setPerPage(newPagination.pageSize);
    } else {
      void setPage(updaterOrValue.pageIndex + 1);
      void setPerPage(updaterOrValue.pageSize);
    }
  }

  const table = useReactTable({
    data,
    columns,
    initialState,
    state: {
      columnVisibility,
      columnFilters,
      pagination,
    },
    onColumnFiltersChange,
    onPaginationChange,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    autoResetPageIndex: false,
  });

  if (isLoading) {
    return <DataTableSkeleton />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex">
        {filterFields ? (
          <DataTableToolbar table={table} filterFields={filterFields} />
        ) : (
          <DataTableViewOptions table={table} />
        )}
      </div>
      <div className="w-full rounded-sm border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="first:pl-4 last:pr-4"
                      style={{ width: `${header.getSize()}px` }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="first:pl-4 last:pr-4">
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
                  className="h-24 text-center font-bold"
                >
                  ไม่มีผลลัพธ์
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
