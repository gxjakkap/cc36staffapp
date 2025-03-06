"use server";

import { and, eq } from "drizzle-orm";

import { db, dbStaff } from "@/db";
import { user } from "@/db/schema";
import { wichakarn } from "@/db/staff-schema";
import { authenticatedAction } from "@/lib/safe-action";

const getAllWichakansTable = authenticatedAction
  .createServerAction()
  .handler(async () => {
    const users = await db
      .select({
        id: user.id,
      })
      .from(user)
      .where(and(eq(user.academicDone, true), eq(user.hasSubmitAnswer, true)));

    const data = await Promise.all(
      users.map(async (user) => {
        const wichakansData = await dbStaff
          .select({
            id: wichakarn.id,
            score_academic: wichakarn.scoreAcademic,
            score_chess: wichakarn.scoreChess,
            status: wichakarn.status,
            staffUsername: wichakarn.staffUsername,
            timestamp: wichakarn.updatedAt,
          })
          .from(wichakarn)
          .where(eq(wichakarn.userId, user.id));

        if (wichakansData.length <= 0) {
          return {
            id: user.id,
            score_chess: null,
            score_academic: null,
            status: "unlock",
            staffUsername: null,
            timestamp: null,
          };
        }

        return {
          id: user.id,
          score_chess: wichakansData[0].score_chess,
          score_academic: wichakansData[0].score_academic,
          status: wichakansData[0].status,
          staffUsername: wichakansData[0].staffUsername,
          timestamp: wichakansData[0].timestamp,
        };
      }),
    );

    return data;
  });

export default getAllWichakansTable;
