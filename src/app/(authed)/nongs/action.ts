"use server";

import { and, eq } from "drizzle-orm";

import { db, dbStaff } from "@/db";
import { user } from "@/db/schema";
import { tabian } from "@/db/staff-schema";
import { authenticatedAction } from "@/lib/safe-action";

export const getAllTabiansInfoTable = authenticatedAction
  .createServerAction()
  .handler(async () => {
    const users = await db
      .select({
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        gender: user.gender,
        phone: user.telephone,
        has_submit: user.hasSubmitAnswer,
      })
      .from(user)
      .where(and(eq(user.infoDone, true), eq(user.filesDone, true)));

    const data = await Promise.all(
      users.map(async (user) => {
        const tabiansData = await dbStaff
          .select({
            id: tabian.id,
            info: tabian.info,
            status: tabian.status,
            staffUsername: tabian.staffUsername,
            timestamp: tabian.updatedAt,
          })
          .from(tabian)
          .where(eq(tabian.userId, user.id));

        if (tabiansData.length <= 0) {
          return {
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            gender: user.gender,
            phone: user.phone,
            has_submit: user.has_submit,
            info: null,
            status: "unlock",
            staffUsername: null,
            timestamp: null,
          };
        }

        return {
          id: user.id,
          fullname: user.fullname,
          email: user.email,
          gender: user.gender,
          phone: user.phone,
          has_submit: user.has_submit,
          info: tabiansData[0].info,
          status: tabiansData[0].status,
          staffUsername: tabiansData[0].staffUsername,
          timestamp: tabiansData[0].timestamp,
        };
      }),
    );

    return data;
  });
