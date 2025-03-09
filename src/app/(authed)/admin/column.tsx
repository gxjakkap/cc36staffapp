import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { Skeleton } from "@/components/ui/skeleton";
import { capitalizeFirstLetter } from "@/lib/formatter";

import EditStaff from "./edit-staff";
import { UWRWithUsername } from "./staff-table";

export const createColumns = (
  isLoading: boolean,
): ColumnDef<UWRWithUsername>[] => [
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: isLoading
      ? () => <Skeleton className="h-5 w-32" />
      : ({ row }) => <div>{row.original.username}</div>,
    size: 200,
    filterFn: "includesString",
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: isLoading
      ? () => <Skeleton className="h-5 w-32" />
      : ({ row }) => <div>{capitalizeFirstLetter(row.original.name)}</div>,
    size: 200,
    filterFn: "includesString",
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: isLoading
      ? () => <Skeleton className="h-5 w-32" />
      : ({ row }) => <div>{row.original.email}</div>,
    size: 200,
    filterFn: "includesString",
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: isLoading
      ? () => <Skeleton className="h-5 w-32" />
      : ({ row }) => <div>{row.original.role}</div>,
    size: 200,
    filterFn: "includesString",
  },
  {
    id: "แก้ไข",
    cell: ({ row }) => <EditStaff user={row.original} />,
    size: 40,
  },
];
