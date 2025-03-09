"use client";

import { useMemo } from "react";
import { LockIcon, LockOpenIcon, XCircleIcon } from "lucide-react";

import { DataTable } from "@/components/data-table";
import { InspectStatusKeys } from "@/components/data-table/status-badge";
import { useServerActionQuery } from "@/hook/server-action-hooks";
import { DataTableFilterField } from "@/types";

import getAllWichakansTable from "./action";
import { createColumns, Wichkans } from "./column";

export default function WichakanPage() {
  const { data, isLoading } = useServerActionQuery(getAllWichakansTable, {
    queryKey: ["wichakans"],
    input: undefined,
  });

  const placeholderData = useMemo(() => {
    if (!isLoading) return [];
    return Array(10).fill({
      id: "",
      status: "unlock",
      score_academic: null,
      score_chess: null,
      timestamp: null,
    });
  }, [isLoading]);

  const columns = useMemo(() => createColumns(isLoading), [isLoading]);

  const filterFields: DataTableFilterField<Wichkans>[] = useMemo(
    () => [
      {
        id: "status",
        label: "สถานะการตรวจข้อมูล",
        options: [
          {
            label: "ยังไม่ได้ตรวจ",
            value: "unlock",
            icon: LockOpenIcon,
            count: data?.filter((item) => item.status == "unlock").length || 0,
          },
          {
            label: "ตรวจแล้ว",
            value: "done",
            icon: XCircleIcon,
            count: data?.filter((item) => item.status == "done").length || 0,
          },
          {
            label: "มีคนตรวจอยู่",
            value: "lock",
            icon: LockIcon,
            count: data?.filter((item) => item.status == "lock").length || 0,
          },
        ],
      },
    ],
    [data],
  );

  return (
    <div className="flex w-full items-center justify-center pt-10">
      <div className="w-full max-w-[90vw]">
        <DataTable
          columns={columns}
          data={
            isLoading
              ? placeholderData
              : data && data.length > 0
                ? data.map((item) => ({
                    id: item.id,
                    score_academic: item.score_academic,
                    score_chess: item.score_chess,
                    status: item.status as InspectStatusKeys,
                    timestamp: item.timestamp,
                  }))
                : []
          }
          filterFields={filterFields}
        />
      </div>
    </div>
  );
}
