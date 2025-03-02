import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { SearchIcon } from "lucide-react";

import { DataTableColumnHeader } from "@/components/data-table/column-header";
import StatusBadge from "@/components/data-table/status-badge";
import { Button } from "@/components/ui/button";
import { formatId, formatThaiBuddhist } from "@/lib/formatter";

type Wichkans = {
  id: string;
  status: "lock" | "unlock" | "done";
  score_academic?: number;
  score_chess?: number;
  timestamp?: Date;
};

export const columns: ColumnDef<Wichkans>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="รหัส" />
    ),
    cell: ({ row }) => <div>{formatId(row.original.id)}</div>,
    size: 200,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="สถานะ" />
    ),
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
    size: 200,
  },
  {
    accessorKey: "score_academic",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="คะแนนพาร์ทที่ 1 (algorithms)"
      />
    ),
    cell: ({ row }) => (
      <div>
        {row.original.score_academic
          ? row.original.score_academic
          : "ยังไม่ได้ตรวจ"}
      </div>
    ),
    size: 200,
  },
  {
    accessorKey: "score_chess",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="คะแนนพาร์ทที่ 2 (chess)" />
    ),
    cell: ({ row }) => (
      <div>
        {row.original.score_chess ? row.original.score_chess : "ยังไม่ได้ตรวจ"}
      </div>
    ),
    size: 200,
  },
  {
    accessorKey: "timestamp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="เวลาที่ตรวจสอบ" />
    ),
    cell: ({ row }) => (
      <div>
        {row.original.timestamp
          ? formatThaiBuddhist(row.original.timestamp)
          : ""}
      </div>
    ),
    size: 200,
  },
  {
    id: "ตรวจสอบ",
    cell: ({ row }) => (
      <Link href={`/wichakan/${row.original.id}`}>
        <Button variant="outline" size="icon">
          <SearchIcon />
        </Button>
      </Link>
    ),
    size: 40,
  },
];
