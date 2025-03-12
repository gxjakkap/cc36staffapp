"use client";

import { useMemo } from "react";
import { ListFilterIcon } from "lucide-react";

import { DataTable } from "@/components/data-table";
import { InspectStatusKeys } from "@/components/data-table/status-badge";
import { useServerActionQuery } from "@/hook/server-action-hooks";
import { DataTableFilterField, InitialStateTablePage } from "@/types";

import { getAllTabiansInfoTable } from "./action";
import { createColumns, Nongs } from "./column";

interface NongsTableProps {
  initialState?: InitialStateTablePage;
}

export default function NongsTable(props: NongsTableProps) {
  const { data: tabiansInfoData, isLoading: tabiansInfoLoading } =
    useServerActionQuery(getAllTabiansInfoTable, {
      queryKey: ["nongs"],
      input: undefined,
    });

  const placeholderData = useMemo(() => {
    if (!tabiansInfoLoading) return [];
    return Array(10).fill({
      id: "",
      fullname: "",
      gender: "",
      phone: "",
      email: "",
      has_submit: false,
      status: "unlock",
      timestamp: null,
    });
  }, [tabiansInfoLoading]);

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
            value: "unlock",
            count:
              tabiansInfoData?.filter((item) => item.status === "unlock")
                .length || 0,
          },
          {
            label: "ตรวจแล้ว",
            value: "done",
            count:
              tabiansInfoData?.filter((item) => item.status === "done")
                .length || 0,
          },
        ],
      },
    ],
    [tabiansInfoData],
  );

  const columns = useMemo(
    () => createColumns(tabiansInfoLoading),
    [tabiansInfoLoading],
  );

  return (
    <div className="flex w-full items-center justify-center pt-10">
      <div className="w-full max-w-[90vw]">
        <DataTable
          columns={columns}
          data={
            tabiansInfoLoading
              ? placeholderData
              : tabiansInfoData
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
          initialState={props.initialState}
        />
      </div>
    </div>
  );
}
