"use server";

import { and, eq } from "drizzle-orm";

import { db, dbStaff } from "@/db";
import { user } from "@/db/schema";
import { tabian } from "@/db/staff-schema";
import { authenticatedAction } from "@/lib/safe-action";

const getAllTabiansTable = authenticatedAction
  .createServerAction()
  .handler(async () => {
    const users = await db
      .select({
        id: user.id,
      })
      .from(user)
      .where(and(eq(user.regisDone, true), eq(user.hasSubmitAnswer, true)));

    const data = await Promise.all(
      users.map(async (user) => {
        const tabiansData = await dbStaff
          .select({
            id: tabian.id,
            scoreRegis: tabian.scoreRegis,
            status: tabian.status,
            staffUsername: tabian.staffUsername,
            timestamp: tabian.updatedAt,
          })
          .from(tabian)
          .where(eq(tabian.userId, user.id));

        return {
          id: user.id,
          scoreRegis: tabiansData[0].scoreRegis,
          status: tabiansData[0].status,
          staffUsername: tabiansData[0].staffUsername,
          timestamp: tabiansData[0].timestamp,
        };
      }),
    );

    return data;
  });

export default getAllTabiansTable;
