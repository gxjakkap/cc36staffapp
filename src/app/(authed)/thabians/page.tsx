"use client";

import { useMemo } from "react";
import { CheckCircle2Icon, XCircleIcon } from "lucide-react";

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
    ],
    [data],
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
