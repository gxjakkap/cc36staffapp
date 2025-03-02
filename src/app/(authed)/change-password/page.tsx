"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";

import ChangePass from "./password-fields";

export default async function PasswordPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return;
  }

  if (session.user.role !== "admin") redirect(`/`);

  return (
    <>
      <div className="flex w-full items-center justify-center pt-8">
        <Card className="">
          <CardHeader>
            <CardTitle className="text-lg">เปลี่ยนรหัสผ่าน</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="font-bold">ชื่อผู้ใช้งาน :</span>{" "}
            {session.user.username}
          </CardContent>
          <ChangePass></ChangePass>
        </Card>
      </div>
    </>
  );
}
