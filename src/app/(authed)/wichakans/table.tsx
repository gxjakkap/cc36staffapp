"use client";

import { useMemo } from "react";
import { LockIcon, LockOpenIcon, XCircleIcon } from "lucide-react";

import { DataTable } from "@/components/data-table";
import { InspectStatusKeys } from "@/components/data-table/status-badge";
import { useServerActionQuery } from "@/hook/server-action-hooks";
import { DataTableFilterField, TableProps } from "@/types";

import { getAllWichakansTable } from "./action";
import { createColumns, Wichkans } from "./column";

export default function WichakanPage(props: TableProps) {
  const { data, isLoading } = useServerActionQuery(getAllWichakansTable, {
    queryKey: ["wichakans"],
    input: undefined,
  });

  const columns = useMemo(() => createColumns(), []);

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
    <DataTable
      columns={columns}
      data={
        data
          ? data.map((item) => ({
              id: item.id,
              score_academic: item.score_academic
                ? parseFloat(item.score_academic)
                : null,
              score_chess: item.score_chess,
              status: item.status as InspectStatusKeys,
              timestamp: item.timestamp,
              score_chess_normalize: item.score_chess_normalize,
              score: item.score,
              staffUsername: item.staffUsername,
            }))
          : []
      }
      filterFields={filterFields}
      initialState={props.initialState}
      isLoading={isLoading}
    />
  );
}
