"use client";

import { CheckCircle2Icon, ListFilterIcon, XCircleIcon } from "lucide-react";

import { DataTable } from "@/components/data-table";
import { InspectStatusKeys } from "@/components/data-table/status-badge";
import { useServerActionQuery } from "@/hook/server-action-hooks";
import { DataTableFilterField } from "@/types";

import { getAllTabiansInfoTable } from "./action";
import { columns, Nongs } from "./column";

export default function NongsPage() {
  const { data: tabiansInfoData, isLoading: tabiansInfoLoading } =
    useServerActionQuery(getAllTabiansInfoTable, {
      queryKey: ["nongs"],
      input: undefined,
    });

  if (tabiansInfoLoading) {
    return;
  }

  const filterFields: DataTableFilterField<Nongs>[] = [
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
            tabiansInfoData?.filter((item) => item.gender === "woman").length ||
            0,
        },
      ],
    },
    {
      id: "status",
      label: "สถานะการตรวจ",
      options: [
        {
          label: "มีคนตรวจอยู่",
          value: "lock",
          count:
            tabiansInfoData?.filter((item) => item.status === "lock").length ||
            0,
        },
        {
          label: "ไม่มีคนตรวจ",
          value: "unlock",
          count:
            tabiansInfoData?.filter((item) => item.status === "unlock")
              .length || 0,
        },
        {
          label: "ตรวจแล้ว",
          value: "done",
          count:
            tabiansInfoData?.filter((item) => item.status === "done").length ||
            0,
        },
      ],
    },
    {
      id: "has_submit",
      label: "สถานะใบสมัคร",
      options: [
        {
          label: "ส่งแล้ว",
          value: "submitted",
          icon: CheckCircle2Icon,
          count:
            tabiansInfoData?.filter((item) => item.has_submit == true).length ||
            0,
        },
        {
          label: "ยังไม่ส่ง",
          value: "not_submitted",
          icon: XCircleIcon,
          count:
            tabiansInfoData?.filter((item) => item.has_submit === false)
              .length || 0,
        },
      ],
    },
  ];

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
                    item.status == "done"
                      ? "done"
                      : ("unlock" as InspectStatusKeys),
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
