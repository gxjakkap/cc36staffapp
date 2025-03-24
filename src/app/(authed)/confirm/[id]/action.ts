"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { db, dbStaff } from "@/db";
import { confirmation, user } from "@/db/schema";
import { confirmationStaff } from "@/db/staff-schema";
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
        email: user.email,
      })
      .from(confirmation)
      .where(eq(confirmation.userId, input.id))
      .leftJoin(user, eq(user.id, confirmation.userId));

    if (data.length < 0) {
      throw NotFoundError;
    }

    let url = "";
    if (data[0].receipt_key) url = await getPresignedURL(data[0].receipt_key);

    const dataStaff = await dbStaff
      .select()
      .from(confirmationStaff)
      .where(eq(confirmationStaff.userId, input.id));

    return {
      ...data[0],
      receipt_path: url,
      isSentEmail: dataStaff.length == 0 ? false : true,
      staffName: dataStaff.length > 0 ? dataStaff[0].staffName : null,
    };
  });
