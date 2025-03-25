"use server";

import { eq } from "drizzle-orm";

import { db, dbStaff } from "@/db";
import { confirmation, user } from "@/db/schema";
import { confirmationStaff } from "@/db/staff-schema";
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

    const dataStaffDb = await dbStaff.select().from(confirmationStaff);

    const mergedData = data.map((item) => {
      const staffInfo = dataStaffDb.find((staff) => staff.userId === item.id);

      return {
        ...item,
        staffInfo: staffInfo || null,
      };
    });

    return mergedData;
  });
