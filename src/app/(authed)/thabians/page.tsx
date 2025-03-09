"use client";

import { useMemo } from "react";

import { DataTable } from "@/components/data-table";
import { useServerActionQuery } from "@/hook/server-action-hooks";

import getAllTabiansTable from "./action";
import { createColumns } from "./column";

export default function ThabiansPage() {
  const { data, isLoading } = useServerActionQuery(getAllTabiansTable, {
    queryKey: ["tabians"],
    input: undefined,
  });

  const placeholderData = useMemo(() => {
    if (!isLoading) return [];
    return Array(10).fill({
      id: "",
    });
  }, [isLoading]);

  const columns = useMemo(() => createColumns(isLoading), [isLoading]);

  return (
    <div className="flex w-full items-center justify-center pt-10">
      <div className="w-full max-w-[90vw]">
        <DataTable
          columns={columns}
          data={
            isLoading ? placeholderData : data && data.length > 0 ? data : []
          }
        />
      </div>
    </div>
  );
}
