"use client";

import { useMemo } from "react";
import { ListFilterIcon } from "lucide-react";

import { getAllPassedPerson } from "@/app/(authed)/confirm/actions";
import { DataTable } from "@/components/data-table";
import { useServerActionQuery } from "@/hook/server-action-hooks";
import { DataTableFilterField, TableProps } from "@/types";

import { Confirm, createColumns } from "./column";

export default function ConfirmTable(props: TableProps) {
  const { data } = useServerActionQuery(getAllPassedPerson, {
    input: undefined,
    queryKey: [],
  });

  const filterFields: DataTableFilterField<Confirm>[] = useMemo(
    () => [
      {
        id: "email",
        label: "",
        placeholder: "ค้นหาด้วย อีเมล",
      },
      {
        id: "fullname",
        label: "",
        placeholder: "ค้นหาด้วยชื่อเต็ม",
      },
      {
        id: "nickname",
        label: "",
        placeholder: "ค้นหาด้วยชื่อเล่น",
      },
      {
        id: "gender",
        label: "เพศ",
        options: [
          {
            label: "ชาย",
            value: "man",
            icon: ListFilterIcon,
            count: data?.filter((item) => item.gender === "man").length || 0,
          },
          {
            label: "หญิง",
            value: "woman",
            icon: ListFilterIcon,
            count: data?.filter((item) => item.gender === "woman").length || 0,
          },
        ],
      },
      {
        id: "status",
        label: "สถานะ",
        options: [
          {
            label: "ยืนยัน",
            value: "yes",
            icon: ListFilterIcon,
            count: data?.filter((item) => item.status === "yes").length || 0,
          },
          {
            label: "สละสิทธิ์",
            value: "no",
            icon: ListFilterIcon,
            count: data?.filter((item) => item.status === "no").length || 0,
          },
          {
            label: "ตัวจริง",
            value: "candidate",
            icon: ListFilterIcon,
            count:
              data?.filter((item) => item.status === "candidate").length || 0,
          },
          {
            label: "สำรอง",
            value: "reserved",
            icon: ListFilterIcon,
            count:
              data?.filter((item) => item.status === "reserved").length || 0,
          },
        ],
      },
    ],
    [data],
  );

  const columns = useMemo(() => createColumns(), []);

  return (
    <DataTable
      columns={columns}
      data={(data ?? []).map((item) => ({
        id: item.id ?? "",
        fullname: item.fullname,
        email: item.email ?? "",
        nickname: item.nickname ?? "",
        index: item.index,
        gender: item.gender ?? "",
        status: item.status,
        tel: item.tel ?? "",
      }))}
      filterFields={filterFields}
      initialState={props.initialState}
    />
  );
}
