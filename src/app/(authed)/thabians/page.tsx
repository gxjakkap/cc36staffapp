"use client";

import { useCallback, useMemo } from "react";
import {
  CheckCircle2Icon,
  User2Icon,
  UserIcon,
  XCircleIcon,
} from "lucide-react";

import { DataTable } from "@/components/data-table";
import { useServerActionQuery } from "@/hook/server-action-hooks";
import { DataTableFilterField } from "@/types";

import getAllTabiansTable from "./action";
import { createColumns, Thabians } from "./column";

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

  const mapScores = useCallback(
    (scoreNumber: string) => [
      {
        id: `score${scoreNumber}` as keyof Thabians["score1_user1"],
        label: `ข้อที่ ${scoreNumber.replace("_", ".")}`,
        options: [
          {
            label: "ยังไม่มีใครตรวจ",
            value: "no_one",
            icon: CheckCircle2Icon,
            count:
              data?.filter(
                (item) =>
                  item[
                    `score${scoreNumber}_user1` as keyof Thabians["score1_user1"]
                  ] == null &&
                  item[
                    `score${scoreNumber}_user2` as keyof Thabians["score1_user1"]
                  ] == null,
              ).length || 0,
          },
          {
            label: "คนที่ 1 ตรวจแล้ว",
            value: "done1",
            icon: UserIcon,
            count:
              data?.filter(
                (item) =>
                  item[
                    `score${scoreNumber}_user1` as keyof Thabians["score1_user1"]
                  ] !== null,
              ).length || 0,
          },
          {
            label: "คนที่ 2 ตรวจแล้ว",
            value: "done2",
            icon: User2Icon,
            count:
              data?.filter(
                (item) =>
                  item[
                    `score${scoreNumber}_user2` as keyof Thabians["score1_user1"]
                  ] !== null,
              ).length || 0,
          },
        ],
      },
    ],
    [data],
  );

  const filterFields: DataTableFilterField<Thabians>[] = useMemo(
    () => [
      {
        id: "info_status",
        label: "สถานะข้อมูลส่วนตัว",
        options: [
          {
            label: "ยังไม่ได้ตรวจ",
            value: "unlock",
            icon: CheckCircle2Icon,
            count:
              data?.filter((item) => item.info_status === "unlock").length || 0,
          },
          {
            label: "ตรวจแล้ว",
            value: "done",
            icon: XCircleIcon,
            count:
              data?.filter((item) => item.info_status === "done").length || 0,
          },
        ],
      },
      {
        id: "overall_score",
        label: "สถานะการตรวจข้อมูล",
        options: [
          {
            label: "ยังไม่ได้ตรวจ",
            value: "unlock",
            icon: CheckCircle2Icon,
            count:
              data?.filter((item) => item.overall_score == null).length || 0,
          },
          {
            label: "ตรวจแล้ว",
            value: "done",
            icon: XCircleIcon,
            count:
              data?.filter((item) => item.overall_score !== null).length || 0,
          },
        ],
      },
      ...["1", "2", "3", "4", "5", "6_1", "6_2"].flatMap(mapScores),
    ],
    [data, mapScores],
  );

  return (
    <div className="flex w-full items-center justify-center pt-10">
      <div className="w-full max-w-[90vw]">
        <DataTable
          columns={columns}
          data={
            isLoading ? placeholderData : data && data.length > 0 ? data : []
          }
          filterFields={filterFields}
        />
      </div>
    </div>
  );
}
