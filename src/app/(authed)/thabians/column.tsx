import Link from "next/link";
import { Column, ColumnDef, Row } from "@tanstack/react-table";
import { SearchIcon } from "lucide-react";

import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatId, formatThaiBuddhist } from "@/lib/formatter";
import { cn } from "@/lib/utils";

export type Thabians = {
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

  score_done: boolean;

  overall_score: number | null;

  score1_user1_staffUsername: string | null;
  score1_user2_staffUsername: string | null;
  score2_user1_staffUsername: string | null;
  score2_user2_staffUsername: string | null;
  score3_user1_staffUsername: string | null;
  score3_user2_staffUsername: string | null;
  score4_user1_staffUsername: string | null;
  score4_user2_staffUsername: string | null;
  score5_user1_staffUsername: string | null;
  score5_user2_staffUsername: string | null;
  score6_1_user1_staffUsername: string | null;
  score6_1_user2_staffUsername: string | null;
  score6_2_user1_staffUsername: string | null;
  score6_2_user2_staffUsername: string | null;
};

const scoreColumns = [
  { key: "score1", title: "ข้อที่ 1" },
  { key: "score2", title: "ข้อที่ 2" },
  { key: "score3", title: "ข้อที่ 3" },
  { key: "score4", title: "ข้อที่ 4" },
  { key: "score5", title: "ข้อที่ 5" },
  { key: "score6_1", title: "ข้อที่ 6.1" },
  { key: "score6_2", title: "ข้อที่ 6.2" },
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
          <ScoreColumn
            score={row.original[key as keyof Thabians["score1"]]}
            score_sep={{
              user1:
                row.original[`${key}_user1` as keyof Thabians["score1_user1"]],
              user2:
                row.original[`${key}_user2` as keyof Thabians["score1_user1"]],
            }}
            who={{
              user1:
                row.original[
                  `${key}_user1_staffUsername` as keyof Thabians["score1_user1"]
                ],
              user2:
                row.original[
                  `${key}_user2_staffUsername` as keyof Thabians["score1_user1"]
                ],
            }}
            when={{
              user1:
                row.original[
                  `updatedAt_${key}_user1` as keyof Thabians["updatedAt_score1_user1"]
                ],
              user2:
                row.original[
                  `updatedAt_${key}_user2` as keyof Thabians["updatedAt_score1_user1"]
                ],
            }}
          />
        ),
    size: 200,
    filterFn: (row: Row<Thabians>, _: unknown, filterValue: string[]) => {
      if (
        filterValue.includes("done1") &&
        row.original[`${key}_user1` as keyof Thabians["score1_user1"]] === null
      ) {
        return false;
      }
      if (
        filterValue.includes("done2") &&
        row.original[`${key}_user2` as keyof Thabians["score1_user1"]] === null
      ) {
        return false;
      }
      if (
        filterValue.includes("no_one") &&
        (row.original[`${key}_user1` as keyof Thabians["score1_user1"]] !==
          null ||
          row.original[`${key}_user2` as keyof Thabians["score1_user1"]] !==
            null)
      ) {
        return false;
      }

      if (
        filterValue.includes("not_done1") &&
        row.original[`${key}_user1` as keyof Thabians["score1_user1"]] !== null
      ) {
        return false;
      }
      if (
        filterValue.includes("not_done2") &&
        row.original[`${key}_user2` as keyof Thabians["score1_user1"]] !== null
      ) {
        return false;
      }

      if (
        filterValue.includes("done") &&
        (row.original[`${key}_user1` as keyof Thabians["score1_user1"]] ===
          null ||
          row.original[`${key}_user2` as keyof Thabians["score1_user1"]] ===
            null)
      ) {
        return false;
      }

      return true;
    },
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
      accessorKey: "overall_score",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="คะแนนรวม" />
      ),
      cell: isLoading
        ? () => <Skeleton className="h-5 w-24" />
        : ({ row }) => (
            <div
              className={cn(
                row.original.overall_score !== null
                  ? "text-foreground"
                  : "text-foreground/20",
              )}
            >
              {row.original.overall_score !== null ? (
                <OverallScoreCol row={row} />
              ) : (
                "N/A"
              )}
            </div>
          ),
      filterFn: (row, _, filterValue) => {
        if (filterValue.length >= 2) {
          return true;
        }

        return filterValue[0] === "done"
          ? row.original.overall_score !== null
          : row.original.overall_score === null;
      },
    },
    {
      accessorKey: "info_status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="สถานะข้อมูลส่วนตัว" />
      ),
      cell: isLoading
        ? () => <Skeleton className="h-5 w-24" />
        : ({ row }) => (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger>
                  {row.original.info_status === "done" ? "✅" : "❌"}
                </TooltipTrigger>
                {row.original.updatedAt_info ? (
                  <TooltipContent>
                    <p>
                      <span className="font-bold">ตรวจเมื่อ :</span>{" "}
                      {formatThaiBuddhist(row.original.updatedAt_info, true)}
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

interface ScoreColumnProp {
  score: number | null;
  score_sep: {
    user1: number | null;
    user2: number | null;
  };
  who: {
    user1: string | null;
    user2: string | null;
  };
  when: {
    user1: Date | null;
    user2: Date | null;
  };
}

const ScoreColumn = ({ score, who, when, score_sep }: ScoreColumnProp) => {
  return (
    <div
      className={cn(score !== null ? "text-foreground" : "text-foreground/20")}
    >
      {score !== null ? (
        <HoverCard openDelay={0} closeDelay={10}>
          <HoverCardTrigger asChild>
            <Button size="icon" variant="ghost" className="cursor-pointer p-0">
              {score}
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ผู้ตรวจ</TableHead>
                  <TableHead>คะแนน</TableHead>
                  <TableHead>วันที่ตรวจ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{who.user1 ? who.user1 : "N/A"}</TableCell>
                  <TableCell>
                    {score_sep.user1 ? score_sep.user1 : "N/A"}
                  </TableCell>
                  <TableCell>
                    {when.user1 ? formatThaiBuddhist(when.user1, true) : "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{who.user2 ? who.user2 : "N/A"}</TableCell>
                  <TableCell>
                    {score_sep.user2 ? score_sep.user2 : "N/A"}
                  </TableCell>
                  <TableCell>
                    {when.user2 ? formatThaiBuddhist(when.user2, true) : "N/A"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </HoverCardContent>
        </HoverCard>
      ) : (
        "N/A"
      )}
    </div>
  );
};

const OverallScoreCol = ({ row }: { row: Row<Thabians> }) => {
  const inspectorsData = [
    {
      label: "1",
      user_1: row.original.score1_user1_staffUsername || "N/A",
      user_2: row.original.score1_user2_staffUsername || "N/A",
    },
    {
      label: "2",
      user_1: row.original.score2_user1_staffUsername || "N/A",
      user_2: row.original.score2_user2_staffUsername || "N/A",
    },
    {
      label: "3",
      user_1: row.original.score3_user1_staffUsername || "N/A",
      user_2: row.original.score3_user2_staffUsername || "N/A",
    },
    {
      label: "4",
      user_1: row.original.score4_user1_staffUsername || "N/A",
      user_2: row.original.score4_user2_staffUsername || "N/A",
    },
    {
      label: "5",
      user_1: row.original.score5_user1_staffUsername || "N/A",
      user_2: row.original.score5_user2_staffUsername || "N/A",
    },
    {
      label: "6.1",
      user_1: row.original.score6_1_user1_staffUsername || "N/A",
      user_2: row.original.score6_1_user2_staffUsername || "N/A",
    },
    {
      label: "6.2",
      user_1: row.original.score6_2_user1_staffUsername || "N/A",
      user_2: row.original.score6_2_user2_staffUsername || "N/A",
    },
  ];

  return (
    <>
      {row.original.overall_score !== null ? (
        <HoverCard openDelay={0} closeDelay={10}>
          <HoverCardTrigger asChild>
            <Button size="icon" variant="ghost" className="cursor-pointer p-0">
              {row.original.overall_score}
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[70px]">ข้อที่</TableHead>
                  <TableHead>คนที่ 1</TableHead>
                  <TableHead>คนที่ 2</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inspectorsData.map((inspector, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {inspector.label.split(" ")[0]}{" "}
                      <span className="font-bold">
                        {inspector.label.split(" ")[1]}
                      </span>
                    </TableCell>
                    <TableCell>{inspector.user_1} </TableCell>
                    <TableCell>{inspector.user_2}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </HoverCardContent>
        </HoverCard>
      ) : (
        "N/A"
      )}
    </>
  );
};
