import Link from "next/link";
import { Column, ColumnDef, Row } from "@tanstack/react-table";
import { SearchIcon } from "lucide-react";

import { DataTableColumnHeader } from "@/components/data-table/column-header";
import type { InspectStatusKeys } from "@/components/data-table/status-badge";
import StatusBadge from "@/components/data-table/status-badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatId, formatThaiBuddhist } from "@/lib/formatter";
import { cn } from "@/lib/utils";

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

  score1: number | null;
  score2: number | null;
  score3: number | null;
  score4: number | null;
  score5: number | null;
  score6_1: number | null;
  score6_2: number | null;
};

const scoreColumns = [
  { key: "score1", title: "คะแนน 1" },
  { key: "score2", title: "คะแนน 2" },
  { key: "score3", title: "คะแนน 3" },
  { key: "score4", title: "คะแนน 4" },
  { key: "score5", title: "คะแนน 5" },
  { key: "score6_1", title: "คะแนน 6.1" },
];

export const createColumns = (isLoading: boolean): ColumnDef<Thabians>[] => {
  const scoreColumnDefs = scoreColumns.map(({ key, title }) => ({
    accessorKey: key,
    header: ({ column }: { column: Column<Thabians> }) => (
      <DataTableColumnHeader column={column} title={title} />
    ),
    cell: isLoading
      ? () => <Skeleton className="h-5 w-24" />
      : ({ row }: { row: Row<Thabians> }) => (
          <ScoreColumn score={row.original[key as keyof Thabians["score1"]]} />
        ),
    size: 200,
  }));

  return [
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
    ...scoreColumnDefs,
    {
      accessorKey: "score6_2",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="คะแนน 6.2" />
      ),
      cell: isLoading
        ? () => <Skeleton className="h-5 w-24" />
        : ({ row }) => <ScoreColumn score={row.original.score6_2} />,
      size: 200,
    },
    {
      accessorKey: "info_status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ข้อมูลส่วนตัว" />
      ),
      cell: isLoading
        ? () => <Skeleton className="h-5 w-24" />
        : ({ row }) => (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger>
                  <StatusBadge
                    status={row.original.info_status as InspectStatusKeys}
                  />
                </TooltipTrigger>
                {row.original.updatedAt_info ? (
                  <TooltipContent>
                    <p>
                      <span className="font-bold">ตรวจเมื่อ :</span>{" "}
                      {formatThaiBuddhist(row.original.updatedAt_info)}
                    </p>
                  </TooltipContent>
                ) : null}
              </Tooltip>
            </TooltipProvider>
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
};

const ScoreColumn = ({ score }: { score: number | null }) => {
  return (
    <div
      className={cn(score !== null ? "text-foreground" : "text-foreground/20")}
    >
      {score !== null ? score : "N/A"}
    </div>
  );
};
