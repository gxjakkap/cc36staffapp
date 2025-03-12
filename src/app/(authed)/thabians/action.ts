"use server";

import { and, eq } from "drizzle-orm";

import { db, dbStaff } from "@/db";
import { user } from "@/db/schema";
import { tabian } from "@/db/staff-schema";
import { StaffRoles } from "@/lib/auth/role";
import { ForbiddenError } from "@/lib/errors";
import { authenticatedAction } from "@/lib/safe-action";

const getAllTabiansTable = authenticatedAction
  .createServerAction()
  .handler(async ({ ctx }) => {
    if (
      ctx.user.role !== StaffRoles.ADMIN &&
      ctx.user.role !== StaffRoles.REGIS
    ) {
      throw new ForbiddenError();
    }
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
            score1_user1: tabian.score1_user1,
            score1_user2: tabian.score1_user2,
            score2_user1: tabian.score2_user1,
            score2_user2: tabian.score2_user2,
            score3_user1: tabian.score3_user1,
            score3_user2: tabian.score3_user2,
            score4_user1: tabian.score4_user1,
            score4_user2: tabian.score4_user2,
            score5_user1: tabian.score5_user1,
            score5_user2: tabian.score5_user2,
            score6_1_user1: tabian.score6_1_user1,
            score6_1_user2: tabian.score6_1_user2,
            score6_2_user1: tabian.score6_2_user1,
            score6_2_user2: tabian.score6_2_user2,
            info: tabian.info,
            info_status: tabian.info_status,
            info_staffUsername: tabian.info_staffUsername,
            updatedAt_info: tabian.updatedAt_info,
            updatedAt_score1_user1: tabian.updatedAt_score1_user1,
            updatedAt_score1_user2: tabian.updatedAt_score1_user2,
            updatedAt_score2_user1: tabian.updatedAt_score2_user1,
            updatedAt_score2_user2: tabian.updatedAt_score2_user2,
            updatedAt_score3_user1: tabian.updatedAt_score3_user1,
            updatedAt_score3_user2: tabian.updatedAt_score3_user2,
            updatedAt_score4_user1: tabian.updatedAt_score4_user1,
            updatedAt_score4_user2: tabian.updatedAt_score4_user2,
            updatedAt_score5_user1: tabian.updatedAt_score5_user1,
            updatedAt_score5_user2: tabian.updatedAt_score5_user2,
            updatedAt_score6_1_user1: tabian.updatedAt_score6_1_user1,
            updatedAt_score6_1_user2: tabian.updatedAt_score6_1_user2,
            updatedAt_score6_2_user1: tabian.updatedAt_score6_2_user1,
            updatedAt_score6_2_user2: tabian.updatedAt_score6_2_user2,

            score1_user1_staffUsername: tabian.score1_user1_staffUsername,
            score1_user2_staffUsername: tabian.score1_user2_staffUsername,
            score2_user1_staffUsername: tabian.score2_user1_staffUsername,
            score2_user2_staffUsername: tabian.score2_user2_staffUsername,
            score3_user1_staffUsername: tabian.score3_user1_staffUsername,
            score3_user2_staffUsername: tabian.score3_user2_staffUsername,
            score4_user1_staffUsername: tabian.score4_user1_staffUsername,
            score4_user2_staffUsername: tabian.score4_user2_staffUsername,
            score5_user1_staffUsername: tabian.score5_user1_staffUsername,
            score5_user2_staffUsername: tabian.score5_user2_staffUsername,
            score6_1_user1_staffUsername: tabian.score6_1_user1_staffUsername,
            score6_1_user2_staffUsername: tabian.score6_1_user2_staffUsername,
            score6_2_user1_staffUsername: tabian.score6_2_user1_staffUsername,
            score6_2_user2_staffUsername: tabian.score6_2_user2_staffUsername,
          })
          .from(tabian)
          .where(eq(tabian.userId, user.id));

        if (tabiansData.length <= 0) {
          return {
            id: user.id,
            score1_user1: null,
            score1_user2: null,
            score2_user1: null,
            score2_user2: null,
            score3_user1: null,
            score3_user2: null,
            score4_user1: null,
            score4_user2: null,
            score5_user1: null,
            score5_user2: null,
            score6_1_user1: null,
            score6_1_user2: null,
            score6_2_user1: null,
            score6_2_user2: null,
            info: null,
            info_status: "unlock",
            info_staffUsername: null,
            updatedAt_info: null,
            updatedAt_score1_user1: null,
            updatedAt_score1_user2: null,
            updatedAt_score2_user1: null,
            updatedAt_score2_user2: null,
            updatedAt_score3_user1: null,
            updatedAt_score3_user2: null,
            updatedAt_score4_user1: null,
            updatedAt_score4_user2: null,
            updatedAt_score5_user1: null,
            updatedAt_score5_user2: null,
            updatedAt_score6_1_user1: null,
            updatedAt_score6_1_user2: null,
            updatedAt_score6_2_user1: null,
            updatedAt_score6_2_user2: null,

            score1: null,
            score2: null,
            score3: null,
            score4: null,
            score5: null,
            score6_1: null,
            score6_2: null,

            overall_score: null,

            score1_user1_staffUsername: null,
            score1_user2_staffUsername: null,
            score2_user1_staffUsername: null,
            score2_user2_staffUsername: null,
            score3_user1_staffUsername: null,
            score3_user2_staffUsername: null,
            score4_user1_staffUsername: null,
            score4_user2_staffUsername: null,
            score5_user1_staffUsername: null,
            score5_user2_staffUsername: null,
            score6_1_user1_staffUsername: null,
            score6_1_user2_staffUsername: null,
            score6_2_user1_staffUsername: null,
            score6_2_user2_staffUsername: null,
          };
        }

        return {
          id: user.id,
          score1_user1: tabiansData[0].score1_user1,
          score1_user2: tabiansData[0].score1_user2,
          score2_user1: tabiansData[0].score2_user1,
          score2_user2: tabiansData[0].score2_user2,
          score3_user1: tabiansData[0].score3_user1,
          score3_user2: tabiansData[0].score3_user2,
          score4_user1: tabiansData[0].score4_user1,
          score4_user2: tabiansData[0].score4_user2,
          score5_user1: tabiansData[0].score5_user1,
          score5_user2: tabiansData[0].score5_user2,
          score6_1_user1: tabiansData[0].score6_1_user1,
          score6_1_user2: tabiansData[0].score6_1_user2,
          score6_2_user1: tabiansData[0].score6_2_user1,
          score6_2_user2: tabiansData[0].score6_2_user2,
          info: tabiansData[0].info,
          info_status: tabiansData[0].info_status,
          info_staffUsername: tabiansData[0].info_staffUsername,
          updatedAt_info: tabiansData[0].updatedAt_info,
          updatedAt_score1_user1: tabiansData[0].updatedAt_score1_user1,
          updatedAt_score1_user2: tabiansData[0].updatedAt_score1_user2,
          updatedAt_score2_user1: tabiansData[0].updatedAt_score2_user1,
          updatedAt_score2_user2: tabiansData[0].updatedAt_score2_user2,
          updatedAt_score3_user1: tabiansData[0].updatedAt_score3_user1,
          updatedAt_score3_user2: tabiansData[0].updatedAt_score3_user2,
          updatedAt_score4_user1: tabiansData[0].updatedAt_score4_user1,
          updatedAt_score4_user2: tabiansData[0].updatedAt_score4_user2,
          updatedAt_score5_user1: tabiansData[0].updatedAt_score5_user1,
          updatedAt_score5_user2: tabiansData[0].updatedAt_score5_user2,
          updatedAt_score6_1_user1: tabiansData[0].updatedAt_score6_1_user1,
          updatedAt_score6_1_user2: tabiansData[0].updatedAt_score6_1_user2,
          updatedAt_score6_2_user1: tabiansData[0].updatedAt_score6_2_user1,
          updatedAt_score6_2_user2: tabiansData[0].updatedAt_score6_2_user2,

          score1: calculateScore(
            tabiansData[0].score1_user1,
            tabiansData[0].score1_user2,
          ),
          score2: calculateScore(
            tabiansData[0].score2_user1,
            tabiansData[0].score2_user2,
          ),
          score3: calculateScore(
            tabiansData[0].score3_user1,
            tabiansData[0].score3_user2,
          ),
          score4: calculateScore(
            tabiansData[0].score4_user1,
            tabiansData[0].score4_user2,
          ),
          score5: calculateScore(
            tabiansData[0].score5_user1,
            tabiansData[0].score5_user2,
          ),
          score6_1: calculateScore(
            tabiansData[0].score6_1_user1,
            tabiansData[0].score6_1_user2,
          ),
          score6_2: calculateScore(
            tabiansData[0].score6_2_user1,
            tabiansData[0].score6_2_user2,
          ),

          overall_score: calculateOverallScore([
            calculateScore(
              tabiansData[0].score1_user1,
              tabiansData[0].score1_user2,
            ),
            calculateScore(
              tabiansData[0].score2_user1,
              tabiansData[0].score2_user2,
            ),
            calculateScore(
              tabiansData[0].score3_user1,
              tabiansData[0].score3_user2,
            ),
            calculateScore(
              tabiansData[0].score4_user1,
              tabiansData[0].score4_user2,
            ),
            calculateScore(
              tabiansData[0].score5_user1,
              tabiansData[0].score5_user2,
            ),
            calculateScore(
              tabiansData[0].score6_1_user1,
              tabiansData[0].score6_1_user2,
            ),
            calculateScore(
              tabiansData[0].score6_2_user1,
              tabiansData[0].score6_2_user2,
            ),
          ]),

          score1_user1_staffUsername: tabiansData[0].score1_user1_staffUsername,
          score1_user2_staffUsername: tabiansData[0].score1_user2_staffUsername,
          score2_user1_staffUsername: tabiansData[0].score2_user1_staffUsername,
          score2_user2_staffUsername: tabiansData[0].score2_user2_staffUsername,
          score3_user1_staffUsername: tabiansData[0].score3_user1_staffUsername,
          score3_user2_staffUsername: tabiansData[0].score3_user2_staffUsername,
          score4_user1_staffUsername: tabiansData[0].score4_user1_staffUsername,
          score4_user2_staffUsername: tabiansData[0].score4_user2_staffUsername,
          score5_user1_staffUsername: tabiansData[0].score5_user1_staffUsername,
          score5_user2_staffUsername: tabiansData[0].score5_user2_staffUsername,
          score6_1_user1_staffUsername:
            tabiansData[0].score6_1_user1_staffUsername,
          score6_1_user2_staffUsername:
            tabiansData[0].score6_1_user2_staffUsername,
          score6_2_user1_staffUsername:
            tabiansData[0].score6_2_user1_staffUsername,
          score6_2_user2_staffUsername:
            tabiansData[0].score6_2_user2_staffUsername,
        };
      }),
    );

    return data;
  });

const calculateScore = (score1: string | null, score2: string | null) => {
  if (score1 === null && score2 === null) return null;
  if (score1 === null) return score2;
  if (score2 === null) return score1;
  return ((parseFloat(score1) + parseFloat(score2)) / 2).toFixed(2);
};

const calculateOverallScore = (scores: (string | null)[]) => {
  if (scores.some((score) => score === null)) return null;
  return scores
    .reduce((acc, score) => (acc ?? 0) + parseFloat(score!), 0)
    .toFixed(2);
};

export default getAllTabiansTable;
