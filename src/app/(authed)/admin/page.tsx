import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { StaffUsersTable } from "@/app/(authed)/admin/staff-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return;
  }

  if (session.user.role !== "admin") redirect(`/`);

  const staffsData = await auth.api.listUsers({
    headers: await headers(),
    query: {},
  });

  return (
    <div className="container mx-auto flex flex-col gap-y-4 px-6 pt-8 pb-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Admin panel</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            <strong>Hi!</strong>{" "}
            {`${session.user.name} (${session.user.username})`}
          </p>
        </CardContent>
      </Card>
      <StaffUsersTable data={staffsData} />
    </div>
  );
}
