"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { confirmation, user } from "@/db/schema";
import { authenticatedAction } from "@/lib/safe-action";

export const getAllPassedPerson = authenticatedAction
  .createServerAction()
  .handler(async () => {
    const data = await db
      .select({
        id: user.id,
        index: confirmation.index,
        email: user.email,
        fullname: confirmation.fullname,
        nickname: confirmation.nickname,
        status: confirmation.confirmationStatus,
        gender: user.gender,
        tel: user.telephone,
      })
      .from(confirmation)
      .leftJoin(user, eq(confirmation.userId, user.id));

    return data;
  });
