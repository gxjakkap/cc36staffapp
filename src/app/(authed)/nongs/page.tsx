"use client";

import { DataTable } from "@/components/data-table";
import { useServerActionQuery } from "@/hook/server-action-hooks";

import getAllUserTable from "./action";
import { columns } from "./column";

export default function Home() {
  const { data, isLoading } = useServerActionQuery(getAllUserTable, {
    queryKey: ["nongs"],
    input: undefined,
  });

  if (isLoading) {
    return;
  }

  return (
    <div className="flex w-full items-center justify-center pt-10">
      <div className="w-full max-w-[90vw]">
        <DataTable columns={columns} data={data ?? []} />
      </div>
    </div>
  );
}
