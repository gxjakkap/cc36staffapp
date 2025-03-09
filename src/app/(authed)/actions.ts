"use server";

import { headers } from "next/headers";
import { count, sql } from "drizzle-orm";

import { db } from "@/db";
import { user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { authenticatedAction } from "@/lib/safe-action";

export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(),
    redirect: "/login",
  });
}

export const getOverview = authenticatedAction
  .createServerAction()
  .handler(async () => {
    const [{ count: totalUsers }] = await db
      .select({ count: count() })
      .from(user);

    const [stats] = await db
      .select({
        isMan: sql<number>`sum(case when ${user.gender} = 'man' and ${user.infoDone} = true then 1 else 0 end)`,
        isWoman: sql<number>`sum(case when ${user.gender} = 'woman' and ${user.infoDone} = true then 1 else 0 end)`,
        infoDone: sql<number>`sum(case when ${user.infoDone} = true then 1 else 0 end)`,
        regisDone: sql<number>`sum(case when ${user.regisDone} = true then 1 else 0 end)`,
        academicDone: sql<number>`sum(case when ${user.academicDone} = true then 1 else 0 end)`,
        filesDone: sql<number>`sum(case when ${user.filesDone} = true then 1 else 0 end)`,
        hasSubmit: sql<number>`sum(case when ${user.hasSubmitAnswer} = true then 1 else 0 end)`,
      })
      .from(user);

    return {
      totalUsers,
      stats,
    };
  });
