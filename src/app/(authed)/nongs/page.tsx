"use client";

import { ListFilterIcon } from "lucide-react";

import { DataTable } from "@/components/data-table";
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
      label: "Title",
      placeholder: "ค้นหาด้วยชื่อ",
    },
    {
      id: "gender",
      label: "Gender",
      options: [
        {
          label: "ชาย",
          value: "man",
          icon: ListFilterIcon,
        },
        {
          label: "หญิง",
          value: "woman",
          icon: ListFilterIcon,
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
                  status: item.status as "lock" | "unlock" | "done",
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
