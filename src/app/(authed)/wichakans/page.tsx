"use client";

import { DataTable } from "@/components/data-table";
import { InspectStatusKeys } from "@/components/data-table/status-badge";
import { useServerActionQuery } from "@/hook/server-action-hooks";

import getAllWichakansTable from "./action";
import { columns } from "./column";

export default function WichakanPage() {
  const { data } = useServerActionQuery(getAllWichakansTable, {
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
                  score_academic: item.score_academic,
                  score_chess: item.score_chess,
                  status: item.status as InspectStatusKeys,
                  timestamp: item.timestamp,
                }))
              : []
          }
        />
      </div>
    </div>
  );
}
