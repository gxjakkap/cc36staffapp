"use client";

import { DataTable } from "@/components/data-table";
import { useServerActionQuery } from "@/hook/server-action-hooks";

import getAllUserTable from "./action";
import { columns } from "./column";

export default function NongsPage() {
  const { data, isLoading } = useServerActionQuery(getAllUserTable, {
    queryKey: ["nongs"],
    input: undefined,
  });

  if (isLoading) {
    return;
  }

  return (
    <div className="flex w-full items-center justify-center pt-10">
      <div className="w-full max-w-[90vw]">
        <DataTable
          columns={columns}
          data={
            data
              ? data.map((item) => ({
                  id: item.id,
                  fullname: item.fullname,
                  gender: item.gender,
                  phone: item.phone,
                  email: item.email,
                  has_submit: item.has_submit,
                  status: "unlock" as "unlock" | "lock" | "done",
                  timestamp: null,
                }))
              : []
          }
        />
      </div>
    </div>
  );
}
