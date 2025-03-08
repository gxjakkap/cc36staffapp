"use server";

import { headers } from "next/headers";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";

import ChangePass from "./password-fields";

export default async function PasswordPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return;
  }

  return (
    <>
      <div className="flex w-full items-center justify-center pt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">เปลี่ยนรหัสผ่าน</CardTitle>
            <CardDescription>
              <span className="font-bold">ชื่อผู้ใช้งาน :</span>{" "}
              {session.user.username}
            </CardDescription>
          </CardHeader>
          <ChangePass />
        </Card>
      </div>
    </>
  );
}
