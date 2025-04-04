import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import {
  CircleAlertIcon,
  CircleCheckBigIcon,
  CircleDashedIcon,
  SearchIcon,
} from "lucide-react";

import { DataTableColumnHeader } from "@/components/data-table/column-header";
import StatusBadge, {
  InspectStatusKeys,
} from "@/components/data-table/status-badge";
import { Button } from "@/components/ui/button";
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
  staffUsername: string | null;
  info_correct: boolean | null;
};

export const createColumns = (): ColumnDef<Nongs>[] => [
  {
    accessorKey: "fullname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ชื่อเต็ม" />
    ),
    cell: ({ row }) => <div>{row.getValue("fullname")}</div>,
    size: 200,
    filterFn: "includesString",
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="เพศ" />
    ),
    cell: ({ row }) => <div>{genderVal(row.getValue("gender"))}</div>,
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
    cell: ({ row }) => (
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
    cell: ({ row }) => <div>{row.original.email}</div>,
    size: 200,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="สถานะ" />
    ),
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
    size: 60,
    filterFn: (row, _, filterValue) => {
      return filterValue.includes(row.original.status);
    },
  },
  {
    accessorKey: "info_correct",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ความถูกต้อง" />
    ),
    cell: ({ row }) => (
      <div>
        {row.original.info_correct != null ? (
          <div>
            {row.original.info_correct ? (
              <CircleCheckBigIcon className="text-green-500" />
            ) : (
              <CircleAlertIcon className="text-destructive" />
            )}
          </div>
        ) : (
          <div className="text-foreground/40">
            <CircleDashedIcon />
          </div>
        )}
      </div>
    ),
    size: 60,
    filterFn: (row, _, filterValue) => {
      if (filterValue[0] === "null") {
        return row.original.info_correct === null;
      }
      if (filterValue[0] === "correct") {
        return row.original.info_correct === true;
      }
      if (filterValue[0] === "incorrect") {
        return row.original.info_correct === false;
      }

      return true;
    },
  },
  {
    accessorKey: "timestamp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="เวลาที่ตรวจสอบ" />
    ),
    cell: ({ row }) => (
      <div>
        {row.original.timestamp ? (
          <div>
            {formatThaiBuddhist(row.original.timestamp, true)} (
            {row.original.staffUsername})
          </div>
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
      <Link href={`/nong/${row.original.id}`}>
        <Button variant="outline" size="icon">
          <SearchIcon />
        </Button>
      </Link>
    ),
    size: 40,
  },
];
