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
    ],
    [tabiansInfoData],
  );

  const columns = useMemo(() => createColumns(), []);

  return (
    <div className="flex w-full items-center justify-center pt-10">
      <div className="w-full max-w-[90vw]">
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
                }))
              : []
          }
          filterFields={filterFields}
          initialState={props.initialState}
          isLoading={tabiansInfoLoading}
        />
      </div>
    </div>
  );
}
