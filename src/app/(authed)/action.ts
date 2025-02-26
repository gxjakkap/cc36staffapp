"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(),
    redirect: "/login",
  });
}
