"use server";

import { and, count, eq } from "drizzle-orm";

import { db, dbStaff } from "@/db";
import { answerAcademic, user } from "@/db/schema";
import { wichakarn } from "@/db/staff-schema";
import { StaffRoles } from "@/lib/auth/role";
import { ForbiddenError } from "@/lib/errors";
import { authenticatedAction } from "@/lib/safe-action";

const MAX_SCORE = 68414;
const MIN_SCORE = 81;

const getAllWichakansTable = authenticatedAction
  .createServerAction()
  .handler(async ({ ctx }) => {
    if (
      ctx.user.role !== StaffRoles.ADMIN &&
      ctx.user.role !== StaffRoles.ACADEMIC
    ) {
      throw new ForbiddenError();
    }
    const users = await db
      .select({
        id: user.id,
        score_chess: answerAcademic.chessScore,
      })
      .from(user)
      .leftJoin(answerAcademic, eq(answerAcademic.userId, user.id))
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

        const score_chess_normalize =
          user.score_chess !== null
            ? Math.ceil(
                (15 * (user.score_chess - MIN_SCORE)) / (MAX_SCORE - MIN_SCORE),
              )
            : 0;

        if (wichakansData.length <= 0) {
          return {
            id: user.id,
            score_chess: user.score_chess,
            score_chess_normalize: score_chess_normalize,
            score_academic: null,
            status: "unlock",
            staffUsername: null,
            timestamp: null,
            score: score_chess_normalize,
          };
        }

        return {
          id: user.id,
          score_chess: user.score_chess,
          score_chess_normalize: score_chess_normalize,
          score_academic: wichakansData[0].score_academic,
          status: wichakansData[0].status,
          staffUsername: wichakansData[0].staffUsername,
          timestamp: wichakansData[0].timestamp,
          score:
            score_chess_normalize +
            (Number(wichakansData[0].score_academic) ?? 0),
        };
      }),
    );

    return data;
  });

export const getPersonalRecordCheck = authenticatedAction
  .createServerAction()
  .handler(async ({ ctx }) => {
    const data = await dbStaff
      .select({
        staff: wichakarn.staffUsername,
        count: count(wichakarn.staffUsername),
      })
      .from(wichakarn)
      .groupBy(wichakarn.staffUsername);

    if (!data) {
      return {
        staff: ctx.user.username,
        count: 0,
      };
    }

    const personalRecord = data.find(
      (record) => record.staff === ctx.user.username,
    );

    return personalRecord
      ? personalRecord
      : { staff: ctx.user.username, count: 0 };
  });

export default getAllWichakansTable;
