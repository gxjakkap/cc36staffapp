import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table/column-header";

export type DashboardTable = {
  username: string | null;
  count: number;
  percentage: number;
};

export const createColumns = (): ColumnDef<DashboardTable>[] => [
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: ({ row }) => <div>{row.original.username}</div>,
    size: 200,
    filterFn: "includesString",
  },
  {
    accessorKey: "count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Done" />
    ),
    cell: ({ row }) => <div>{row.original.count}</div>,
    size: 200,
  },
  {
    accessorKey: "percentage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Percentage (%)" />
    ),
    cell: ({ row }) => <div>{row.original.percentage}</div>,
    size: 200,
  },
];
