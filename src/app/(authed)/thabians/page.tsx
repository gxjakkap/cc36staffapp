"use client";

import { DataTable } from "@/components/data-table";

import { columns } from "./column";

export default function ThabiansPage() {
  return (
    <div className="flex w-full items-center justify-center pt-10">
      <div className="w-full max-w-[90vw]">
        <DataTable columns={columns} data={[]} />
      </div>
    </div>
  );
}
