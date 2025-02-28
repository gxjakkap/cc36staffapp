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
    <div className="pt-10 w-full flex justify-center items-center">
      <div className="w-full max-w-[90vw]">
        <DataTable columns={columns} data={data ?? []} />
      </div>
    </div>
  );
}
