"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { confirmation } from "@/db/schema";
import { NotFoundError } from "@/lib/errors";
import { getPresignedURL } from "@/lib/files";
import { authenticatedAction } from "@/lib/safe-action";

export const getConfirmInfo = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      id: z.string().nullable(),
    }),
  )
  .handler(async ({ input }) => {
    if (!input.id) return;

    const data = await db
      .select({
        userId: confirmation.userId,
        index: confirmation.index,
        fullname: confirmation.fullname,
        nickname: confirmation.nickname,
        requestFood: confirmation.requestFood,
        haveIpad: confirmation.haveIpad,
        haveMouse: confirmation.haveMouse,
        osNotebook: confirmation.osNotebook,
        travel: confirmation.travel,
        status: confirmation.confirmationStatus,
        receipt_key: confirmation.receiptPath,
        receipt_date: confirmation.receiptDatetime,
      })
      .from(confirmation)
      .where(eq(confirmation.userId, input.id));

    if (data.length < 0) {
      throw NotFoundError;
    }

    let url = "";
    if (data[0].receipt_key) url = await getPresignedURL(data[0].receipt_key);
    return {
      ...data[0],
      receipt_path: url,
    };
  });
