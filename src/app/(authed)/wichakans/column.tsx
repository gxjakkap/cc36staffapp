import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { SearchIcon } from "lucide-react";

import { DataTableColumnHeader } from "@/components/data-table/column-header";
import StatusBadge, {
  InspectStatusKeys,
} from "@/components/data-table/status-badge";
import { Button } from "@/components/ui/button";
import { formatId, formatThaiBuddhist } from "@/lib/formatter";

export type Wichkans = {
  id: string;
  status: InspectStatusKeys;
  score_academic: number | null;
  score_chess: number | null;
  timestamp: Date | null;
  score_chess_normalize: number | null;
  score: number | null;
};

export const createColumns = (): ColumnDef<Wichkans>[] => [
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
      <>
        {row.original.score_academic ? (
          <div>{row.original.score_academic}</div>
        ) : (
          <p className="text-foreground/40">ยังไม่ได้ตรวจ</p>
        )}
      </>
    ),
    size: 200,
  },
  {
    accessorKey: "score_chess_normalize",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="คะแนนพาร์ทที่ 2 (chess)" />
    ),
    cell: ({ row }) => (
      <>
        {row.original.score_chess_normalize ? (
          <div>{row.original.score_chess_normalize}</div>
        ) : (
          <p className="text-foreground/40">ยังไม่ได้ตรวจ</p>
        )}
      </>
    ),
    size: 200,
  },
  {
    accessorKey: "score",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="คะแนนรวม" />
    ),
    cell: ({ row }) => <div>{row.original.score}</div>,
    size: 200,
  },

  {
    accessorKey: "timestamp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ตรวจล่าสุด" />
    ),
    cell: ({ row }) => (
      <>
        {row.original.timestamp ? (
          <div>{formatThaiBuddhist(row.original.timestamp)}</div>
        ) : (
          <p className="text-foreground/40">ยังไม่มีการตรวจ</p>
        )}
      </>
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
