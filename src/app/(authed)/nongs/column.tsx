import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { SearchIcon } from "lucide-react";

import { DataTableColumnHeader } from "@/components/data-table/column-header";
import StatusBadge, {
  InspectStatusKeys,
} from "@/components/data-table/status-badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  formatPhoneNumber,
  formatThaiBuddhist,
  genderVal,
} from "@/lib/formatter";

export type Nongs = {
  id: string;
  fullname: string | null;
  gender: string | null;
  phone: string | null;
  email: string;
  has_submit: boolean;
  status: InspectStatusKeys;
  timestamp: Date | null;
};

export const createColumns = (isLoading: boolean): ColumnDef<Nongs>[] => [
  {
    accessorKey: "fullname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ชื่อเต็ม" />
    ),
    cell: isLoading
      ? () => <Skeleton className="h-5 w-32" />
      : ({ row }) => <div>{row.getValue("fullname")}</div>,
    size: 200,
    filterFn: "includesString",
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="เพศ" />
    ),
    cell: isLoading
      ? () => <Skeleton className="h-5 w-12" />
      : ({ row }) => <div>{genderVal(row.getValue("gender"))}</div>,
    size: 40,
    filterFn: (row, _, filterValue) => {
      return filterValue.includes(row.original.gender);
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="เบอร์โทรศัพท์" />
    ),
    cell: isLoading
      ? () => <Skeleton className="h-5 w-24" />
      : ({ row }) => (
          <div>
            {row.original.phone
              ? formatPhoneNumber(row.original.phone)
              : "ไม่กรอกเบอร์โทรศัพท์"}
          </div>
        ),
    size: 100,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="อีเมล" />
    ),
    cell: isLoading
      ? () => <Skeleton className="h-5 w-40" />
      : ({ row }) => <div>{row.original.email}</div>,
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
    size: 60,
    filterFn: (row, _, filterValue) => {
      return filterValue.includes(row.original.status);
    },
  },
  {
    accessorKey: "timestamp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="เวลาที่ตรวจสอบ" />
    ),
    cell: isLoading
      ? () => <Skeleton className="h-5 w-28" />
      : ({ row }) => (
          <div>
            {row.original.timestamp ? (
              <div>{formatThaiBuddhist(row.original.timestamp, true)}</div>
            ) : (
              <div className="text-foreground/40">ยังไม่ได้ตรวจสอบ</div>
            )}
          </div>
        ),
    size: 40,
  },
  {
    id: "ตรวจสอบ",
    cell: ({ row }) => (
      <Link href={isLoading ? "#" : `/nong/${row.original.id}`}>
        <Button variant="outline" size="icon">
          <SearchIcon />
        </Button>
      </Link>
    ),
    size: 40,
  },
];
