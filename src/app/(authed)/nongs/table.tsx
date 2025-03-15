"use client";

import { useMemo } from "react";
import { ListFilterIcon } from "lucide-react";

import { DataTable } from "@/components/data-table";
import { InspectStatusKeys } from "@/components/data-table/status-badge";
import { useServerActionQuery } from "@/hook/server-action-hooks";
import { InspectStatusE } from "@/lib/inspect-status";
import { DataTableFilterField, TableProps } from "@/types";

import { getAllTabiansInfoTable } from "./action";
import { createColumns, Nongs } from "./column";

export default function NongsTable(props: TableProps) {
  const { data: tabiansInfoData, isLoading: tabiansInfoLoading } =
    useServerActionQuery(getAllTabiansInfoTable, {
      queryKey: ["nongs"],
      input: undefined,
    });

  const filterFields: DataTableFilterField<Nongs>[] = useMemo(
    () => [
      {
        id: "fullname",
        label: "",
        placeholder: "ค้นหาด้วยชื่อ",
      },
      {
        id: "email",
        label: "",
        placeholder: "ค้นหาด้วย Email",
      },
      {
        id: "gender",
        label: "เพศ",
        options: [
          {
            label: "ชาย",
            value: "man",
            icon: ListFilterIcon,
            count:
              tabiansInfoData?.filter((item) => item.gender === "man").length ||
              0,
          },
          {
            label: "หญิง",
            value: "woman",
            icon: ListFilterIcon,
            count:
              tabiansInfoData?.filter((item) => item.gender === "woman")
                .length || 0,
          },
        ],
      },
      {
        id: "status",
        label: "สถานะการตรวจ",
        options: [
          {
            label: "ยังไม่ได้ตรวจ",
            value: InspectStatusE.UNLOCK,
            count:
              tabiansInfoData?.filter(
                (item) => item.status === InspectStatusE.UNLOCK,
              ).length || 0,
          },
          {
            label: "ตรวจแล้ว",
            value: InspectStatusE.DONE,
            count:
              tabiansInfoData?.filter(
                (item) => item.status === InspectStatusE.DONE,
              ).length || 0,
          },
          {
            label: "รอการส่งเอกสารเพิ่มเติม",
            value: InspectStatusE.WAITING,
            count:
              tabiansInfoData?.filter(
                (item) => item.status === InspectStatusE.WAITING,
              ).length || 0,
          },
        ],
      },
      {
        id: "info_correct",
        label: "ความถูกต้องของเอกสาร",
        options: [
          {
            label: "รอการตรวจ/เอกสารใหม่",
            value: "null",
            count:
              tabiansInfoData?.filter((item) => item.info === null).length || 0,
          },
          {
            label: "ข้อมูลถูกต้อง",
            value: "correct",
            count:
              tabiansInfoData?.filter((item) => item.info === true).length || 0,
          },
          {
            label: "ข้อมูลไม่ถูกต้อง",
            value: "incorrect",
            count:
              tabiansInfoData?.filter((item) => item.info === false).length ||
              0,
          },
        ],
        only_one: true,
      },
    ],
    [tabiansInfoData],
  );

  const columns = useMemo(() => createColumns(), []);

  return (
    <DataTable
      columns={columns}
      data={
        tabiansInfoData
          ? tabiansInfoData.map((item) => ({
              id: item.id,
              fullname: item.fullname,
              gender: item.gender,
              phone: item.phone,
              email: item.email,
              has_submit: item.has_submit,
              status:
                item.status === InspectStatusE.DONE
                  ? InspectStatusE.DONE
                  : item.status === InspectStatusE.WAITING
                    ? InspectStatusE.WAITING
                    : ("unlock" as InspectStatusKeys),
              timestamp: item.timestamp,
              staffUsername: item.staffUsername,
              info_correct: item.info,
            }))
          : []
      }
      filterFields={filterFields}
      initialState={props.initialState}
      isLoading={tabiansInfoLoading}
    />
  );
}
