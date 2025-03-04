"use client";

import { DataTable } from "@/components/data-table";
import { useServerActionQuery } from "@/hook/server-action-hooks";

import getAllTabiansTable from "./action";
import { columns } from "./column";

export default function ThabiansPage() {
  const { data } = useServerActionQuery(getAllTabiansTable, {
    queryKey: ["wichakans"],
    input: undefined,
  });

  return (
    <div className="flex w-full items-center justify-center pt-10">
      <div className="w-full max-w-[90vw]">
        <DataTable
          columns={columns}
          data={
            data && data.length > 0
              ? data.map((item) => ({
                  id: item.id,
                  score: item.scoreRegis,
                  timestamp: item.timestamp,
                  status: item.status as "lock" | "unlock" | "done",
                }))
              : []
          }
        />
      </div>
    </div>
  );
}
