import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { SearchIcon } from "lucide-react";

import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { Button } from "@/components/ui/button";
import { formatId, formatThaiBuddhist } from "@/lib/formatter";

type Thabians = {
  id: string;
  status: "lock" | "unlock" | "done";
  score?: number;
  timestamp?: Date;
};

export const columns: ColumnDef<Thabians>[] = [
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
    cell: ({ row }) => <div>{row.original.status}</div>,
    size: 200,
  },
  {
    accessorKey: "score",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="คะแนน" />
    ),
    cell: ({ row }) => <div>{row.original.score}</div>,
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
      <Link href={`/nong/${row.original.id}`}>
        <Button variant="outline" size="icon">
          <SearchIcon />
        </Button>
      </Link>
    ),
    size: 40,
  },
];
