import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { SearchIcon } from "lucide-react";

import { DataTableColumnHeader } from "@/components/data-table/column-header";
import StatusBadge from "@/components/data-table/status-badge";
import { Button } from "@/components/ui/button";
import {
  formatPhoneNumber,
  formatThaiBuddhist,
  genderVal,
} from "@/lib/formatter";

type Nongs = {
  id: string;
  fullname: string | null;
  gender: string | null;
  phone: string | null;
  email: string;
  has_submit: boolean;
  status: "lock" | "unlock" | "done";
  timestamp: Date | null;
};

export const columns: ColumnDef<Nongs>[] = [
  {
    accessorKey: "fullname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ชื่อเต็ม" />
    ),
    cell: ({ row }) => <div>{row.getValue("fullname")}</div>,
    size: 200,
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="เพศ" />
    ),
    cell: ({ row }) => <div>{genderVal(row.getValue("gender"))}</div>,
    size: 40,
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
          : "ยังไม่ได้ตรวจสอบ"}
      </div>
    ),
    size: 40,
  },
  {
    accessorKey: "has_submit",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ส่งใบสมัคร" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[5rem] items-center justify-center">
        {row.original.has_submit ? "✅" : "❌"}
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
