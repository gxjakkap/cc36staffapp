"use client";

import { useMemo } from "react";

import { DataTable } from "@/components/data-table";
import { DataTableFilterField, TableProps } from "@/types";

import { Confirm, createColumns } from "./column";

export default function ConfirmTable(props: TableProps) {
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
        id: "index",
        label: "ลำดับ",
        placeholder: "ค้นหาด้วยลำดับ",
      },
    ],
    [],
  );

  const columns = useMemo(() => createColumns(), []);

  return (
    <DataTable
      columns={columns}
      data={[
        {
          email: "supawitmarayat@gmail.com",
          fullname: "test",
          id: "test",
          index: "1",
          nickname: "beam",
        },
      ]}
      filterFields={filterFields}
      initialState={props.initialState}
    />
  );
}
