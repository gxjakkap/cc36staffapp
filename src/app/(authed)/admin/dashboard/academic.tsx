"use client";

import { useMemo } from "react";

import { DataTable } from "@/components/data-table";
import Spinner from "@/components/spinner";
import { useServerActionQuery } from "@/hook/server-action-hooks";

import { getPeoplePercent } from "./actions";
import { createColumns } from "./column";

function Academic() {
  const { data, isLoading } = useServerActionQuery(getPeoplePercent, {
    input: undefined,
    queryKey: ["works"],
  });

  const columns = useMemo(() => createColumns(), []);

  if (isLoading) {
    return <Spinner />;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="flex flex-col pt-10">
      <h1 className="text-xl">*ไม่รวมคะแนนของหัวหน้าฝ่าย</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default Academic;
