import { useCallback, useEffect } from "react";
import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { usePaginationSearchParams } from "@/components/data-table/search-params.pagination";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const [{ pageIndex, pageSize }, setPaginationParams] =
    usePaginationSearchParams();

  useEffect(() => {
    table.setPageSize(pageSize);
    table.setPageIndex(pageIndex);
  }, [pageIndex, pageSize, table]);

  const handlePageSizeChange = useCallback(
    (value: string) => {
      setPaginationParams({ pageSize: parseInt(value) });
    },
    [setPaginationParams],
  );

  const goToFirstPage = useCallback(() => {
    setPaginationParams({ pageIndex: 0 });
  }, [setPaginationParams]);

  const goToPreviousPage = useCallback(() => {
    setPaginationParams({ pageIndex: pageIndex - 1 });
  }, [setPaginationParams, pageIndex]);

  const goToNextPage = useCallback(() => {
    setPaginationParams({ pageIndex: pageIndex + 1 });
  }, [setPaginationParams, pageIndex]);

  const goToLastPage = useCallback(() => {
    setPaginationParams({ pageIndex: table.getPageCount() - 1 });
  }, [setPaginationParams, table]);

  return (
    <div className="flex items-center justify-end px-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">แถวต่อหน้า</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={handlePageSizeChange}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center text-sm font-medium">
          หน้า {table.getState().pagination.pageIndex + 1} จาก{" "}
          {table.getPageCount()} หน้า
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={goToFirstPage}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={goToPreviousPage}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={goToNextPage}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={goToLastPage}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
