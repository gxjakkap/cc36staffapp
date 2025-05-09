import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { PinIcon, SearchIcon } from "lucide-react";

import GenderBadge, { GenderKeys } from "@/app/(authed)/confirm/gender-badge";
import ConfirmStatusBadge, {
  ConfirmStatusKeys,
} from "@/app/(authed)/confirm/status-badge";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatPhoneNumber } from "@/lib/formatter";

export type Confirm = {
  id: string;
  fullname: string;
  email: string;
  nickname: string;
  index: number;
  status: string;
  gender: string;
  tel: string;
  staffInfo: {
    userId: string;
    isSentEmail: boolean | null;
    staffName: string;
    sent_at: Date;
  } | null;
};

export const createColumns = (): ColumnDef<Confirm>[] => [
  {
    accessorKey: "index",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="ลำดับ"
        className="justify-center"
      />
    ),
    cell: ({ row }) => (
      <div className="w-full text-center">{row.getValue("index")}</div>
    ),
    size: 30,
    enableSorting: true,
    sortingFn: "basic",
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="อีเมล" />
    ),
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
    size: 250,
    filterFn: "includesString",
  },
  {
    accessorKey: "tel",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="เบอร์โทร" />
    ),
    cell: ({ row }) => (
      <div>
        {row.original.tel
          ? formatPhoneNumber(row.original.tel)
          : "ไม่กรอกเบอร์โทรศัพท์"}
      </div>
    ),
    size: 150,
    filterFn: "includesString",
  },
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
    accessorKey: "nickname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ชื่อเล่น" />
    ),
    cell: ({ row }) => (
      <div>
        {row.original.nickname ? (
          <p>{row.original.nickname}</p>
        ) : (
          <p className="text-foreground/20">ยังไม่ได้กรอกชื่อเล่น</p>
        )}
      </div>
    ),
    size: 100,
    filterFn: "includesString",
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="เพศ" />
    ),
    cell: ({ row }) => (
      <GenderBadge gender={row.original.gender as GenderKeys} />
    ),
    size: 100,
    filterFn: (row, _, filterValue) => {
      return filterValue.includes(row.original.gender);
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="สถานะ" />
    ),
    cell: ({ row }) => (
      <ConfirmStatusBadge status={row.original.status as ConfirmStatusKeys} />
    ),
    size: 100,
    filterFn: "includesString",
  },
  {
    accessorKey: "staffInfo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="สถานะอีเมลยืนยันสิทธิ์" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[10rem] flex-col items-start justify-start">
        {row.original.staffInfo ? (
          <>
            <p>ชื่อ: {row.original.staffInfo.staffName}</p>
            <p>
              ส่งอีเมล:{" "}
              {row.original.staffInfo.isSentEmail ? "\u2705" : "\u274C"}
            </p>
            <p>
              ส่งเมื่อ: {row.original.staffInfo.sent_at.toLocaleDateString()}
            </p>
          </>
        ) : (
          <p className="text-foreground/20">ยังไม่ได้ส่ง</p>
        )}
      </div>
    ),
    size: 200,
    enableSorting: false,
  },
  {
    id: "ตรวจสอบ",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <SearchIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            ตรวจสอบ <span className="font-bold">{row.original.fullname}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={`/confirm/${row.original.id}`}>
            <DropdownMenuItem asChild>
              <div className="flex gap-2">
                <PinIcon />
                <p>การยืนยันสิทธิ์</p>
              </div>
            </DropdownMenuItem>
          </Link>
          <Link href={`/nong/${row.original.id}`}>
            <DropdownMenuItem>ข้อมูลส่วนตัว</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    size: 40,
  },
];
