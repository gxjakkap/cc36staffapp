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
          })
          .from(tabian)
          .where(eq(tabian.userId, user.id));

        if (tabiansData.length <= 0) {
          return {
            id: user.id,
            score1: null,
            score2: null,
            score3: null,
            score4: null,
            score5: null,
            score6_1: null,
            score6_2: null,
            status: "unlock",
            staffUsername: null,
            timestamp: null,
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
        };
      }),
    );

    return data;
  });

export default getAllTabiansTable;
