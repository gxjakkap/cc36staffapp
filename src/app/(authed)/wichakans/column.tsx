import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { SearchIcon } from "lucide-react";

import { DataTableColumnHeader } from "@/components/data-table/column-header";
import StatusBadge, {
  InspectStatusKeys,
} from "@/components/data-table/status-badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatId, formatThaiBuddhist } from "@/lib/formatter";

type Wichkans = {
  id: string;
  status: InspectStatusKeys;
  score_academic?: number | null;
  score_chess?: number | null;
  timestamp?: Date | null;
};

export const createColumns = (isLoading: boolean): ColumnDef<Wichkans>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="รหัส" />
    ),
    cell: isLoading
      ? () => <Skeleton className="h-5 w-24" />
      : ({ row }) => <div>{formatId(row.original.id)}</div>,
    size: 200,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="สถานะ" />
    ),
    cell: isLoading
      ? () => <Skeleton className="h-5 w-20" />
      : ({ row }) => <StatusBadge status={row.original.status} />,
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
    cell: isLoading
      ? () => <Skeleton className="h-5 w-16" />
      : ({ row }) => (
          <>
            {row.original.score_academic ? (
              <div>{row.original.score_academic}</div>
            ) : (
              <p className="text-foreground/25">ยังไม่ได้ตรวจ</p>
            )}
          </>
        ),
    size: 200,
  },
  {
    accessorKey: "score_chess",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="คะแนนพาร์ทที่ 2 (chess)" />
    ),
    cell: isLoading
      ? () => <Skeleton className="h-5 w-16" />
      : ({ row }) => (
          <>
            {row.original.score_chess ? (
              <div>{row.original.score_chess}</div>
            ) : (
              <p className="text-foreground/25">ยังไม่ได้ตรวจ</p>
            )}
          </>
        ),
    size: 200,
  },
  {
    accessorKey: "timestamp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="เวลาที่ตรวจสอบ" />
    ),
    cell: isLoading
      ? () => <Skeleton className="h-5 w-28" />
      : ({ row }) => (
          <>
            {row.original.timestamp ? (
              <div>{formatThaiBuddhist(row.original.timestamp)}</div>
            ) : (
              <p className="text-foreground/25">ยังไม่ได้ตรวจ</p>
            )}
          </>
        ),
    size: 200,
  },
  {
    id: "ตรวจสอบ",
    cell: ({ row }) => (
      <Link href={isLoading ? "#" : `/wichakan/${row.original.id}`}>
        <Button variant="outline" size="icon">
          <SearchIcon />
        </Button>
      </Link>
    ),
    size: 40,
  },
];
