import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { SearchIcon } from "lucide-react";

import { DataTableColumnHeader } from "@/components/data-table/column-header";
import type { InspectStatusKeys } from "@/components/data-table/status-badge";
import StatusBadge from "@/components/data-table/status-badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatId } from "@/lib/formatter";

type Thabians = {
  id: string;
  score1_user1: number | null;
  score1_user2: number | null;
  score2_user1: number | null;
  score2_user2: number | null;
  score3_user1: number | null;
  score3_user2: number | null;
  score4_user1: number | null;
  score4_user2: number | null;
  score5_user1: number | null;
  score5_user2: number | null;
  score6_1_user1: number | null;
  score6_1_user2: number | null;
  score6_2_user1: number | null;
  score6_2_user2: number | null;
  info: boolean | null;
  info_status: string | null;
  updatedAt_info: Date | null;
  updatedAt_score1_user1: Date | null;
  updatedAt_score1_user2: Date | null;
  updatedAt_score2_user1: Date | null;
  updatedAt_score2_user2: Date | null;
  updatedAt_score3_user1: Date | null;
  updatedAt_score3_user2: Date | null;
  updatedAt_score4_user1: Date | null;
  updatedAt_score4_user2: Date | null;
  updatedAt_score5_user1: Date | null;
  updatedAt_score5_user2: Date | null;
  updatedAt_score6_1_user1: Date | null;
  updatedAt_score6_1_user2: Date | null;
  updatedAt_score6_2_user1: Date | null;
  updatedAt_score6_2_user2: Date | null;
};

export const createColumns = (isLoading: boolean): ColumnDef<Thabians>[] => [
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
    accessorKey: "info_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="สถานะข้อมูล" />
    ),
    cell: isLoading
      ? () => <Skeleton className="h-5 w-24" />
      : ({ row }) => (
          <div>
            <StatusBadge
              status={row.original.info_status as InspectStatusKeys}
            />
          </div>
        ),
    size: 150,
  },
  {
    id: "ตรวจสอบ",
    cell: ({ row }) => (
      <Link href={isLoading ? "#" : `/thabian/${row.original.id}`}>
        <Button variant="outline" size="icon">
          <SearchIcon />
        </Button>
      </Link>
    ),
    size: 40,
  },
];
