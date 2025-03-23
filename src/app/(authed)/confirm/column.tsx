import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { Button } from "@/components/ui/button";

export type Confirm = {
  id: string;
  fullname: string;
  email: string;
  nickname: string;
  index: string;
};

export const createColumns = (): ColumnDef<Confirm>[] => [
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
    cell: ({ row }) => <div>{row.getValue("nickname")}</div>,
    size: 100,
    filterFn: "includesString",
  },

  {
    accessorKey: "index",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ลำดับ" />
    ),
    cell: ({ row }) => <div>{row.getValue("index")}</div>,
    size: 60,
    filterFn: "includesString",
  },
  {
    id: "ตอบรับการยืนยันสิทธิ์",
    cell: () => <Button>ส่งอีเมล</Button>,
    size: 40,
  },
];
