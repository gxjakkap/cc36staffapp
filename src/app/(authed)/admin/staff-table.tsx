"use client";

import { useMemo } from "react";
import { UserWithRole } from "better-auth/plugins/admin";

import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTableFilterField } from "@/types";

import { AddStaffDialog } from "./add-staff";
import { createColumns } from "./column";

export interface UWRWithUsername extends UserWithRole {
  username?: string;
}

export interface StaffUsersTableProps {
  data: {
    users: UWRWithUsername[];
  };
  isLoading: boolean;
}

export function StaffUsersTable({ data, isLoading }: StaffUsersTableProps) {
  const columns = useMemo(() => createColumns(isLoading), [isLoading]);

  const filterFields: DataTableFilterField<UWRWithUsername>[] = useMemo(
    () => [
      {
        id: "username",
        label: "",
        placeholder: "ค้นหาด้วย Username",
      },
      {
        id: "email",
        label: "",
        placeholder: "ค้นหาด้วย Email",
      },
      {
        id: "name",
        label: "",
        placeholder: "ค้นหาด้ว Name",
      },
      {
        id: "role",
        label: "Roles",
        options: [
          {
            label: "Admin",
            value: "admin",
            count:
              data.users?.filter((item) => item.role === "admin").length || 0,
          },
          {
            label: "Regis",
            value: "regis",
            count:
              data.users?.filter((item) => item.role === "regis").length || 0,
          },
          {
            label: "Academic",
            value: "academic",
            count:
              data.users?.filter((item) => item.role === "academic").length ||
              0,
          },
          {
            label: "Staff",
            value: "staff",
            count:
              data.users?.filter((item) => item.role === "staff").length || 0,
          },
        ],
      },
    ],
    [data],
  );

  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          Staff Accounts
          <AddStaffDialog />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={data.users}
          filterFields={filterFields}
        />
      </CardContent>
    </Card>
  );
}
