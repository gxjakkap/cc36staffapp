"use server";

import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db, dbStaff } from "@/db";
import { answerRegis, user } from "@/db/schema";
import { tabian } from "@/db/staff-schema";
import { auth } from "@/lib/auth";
import { StaffRoles } from "@/lib/auth/role";
import { ForbiddenError, NotFoundError } from "@/lib/errors";
import { authenticatedAction } from "@/lib/safe-action";

import { ScoreFieldEnum } from "./enum";

export const getUserTabians = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      id: z.string().nullable(),
    }),
  )
  .handler(async ({ ctx, input }) => {
    if (!input.id) {
      return;
    }

    if (
      ctx.user.role !== StaffRoles.ADMIN &&
      ctx.user.role !== StaffRoles.REGIS
    ) {
      throw new ForbiddenError();
    }

    const users = await db
      .select()
      .from(user)
      .where(eq(user.id, input.id))
      .limit(1);

    if (users.length <= 0) {
      throw NotFoundError;
    }

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
      })
      .from(tabian)
      .where(eq(tabian.userId, users[0].id));

    if (tabiansData.length <= 0) {
      return {
        id: users[0].id,
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
        info_status: null,
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
      };
    }

    return {
      id: users[0].id,
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
    };
  });

export const submitScoreTabians = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      userId: z.string(),
      score: z.number(),
      field: z.nativeEnum(ScoreFieldEnum),
    }),
  )
  .handler(async ({ input }) => {
    try {
      const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (!session?.user.username) return;

      const tabiansData = await dbStaff
        .select({
          id: tabian.id,
        })
        .from(tabian)
        .where(eq(tabian.userId, input.userId));

      if (tabiansData.length <= 0) {
        await dbStaff.insert(tabian).values({
          userId: input.userId,
          [input.field]: input.score,
          [`${input.field}_staffUsername`]: session.user.username,
          [`updatedAt_${input.field}`]: new Date(),
        });
        return "success";
      }

      await dbStaff
        .update(tabian)
        .set({
          [input.field]: input.score,
          [`${input.field}_staffUsername`]: session.user.username,
          [`updatedAt_${input.field}`]: new Date(),
        })
        .where(eq(tabian.userId, input.userId));
      return "success";
    } catch (error) {
      console.log(error);
    }
  });

export const getRegisAnswer = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      userId: z.string().nullable(),
    }),
  )
  .handler(async ({ input }) => {
    if (!input.userId) {
      return;
    }

    const [answers] = await db
      .select({
        id: answerRegis.id,
        userId: answerRegis.userId,
        answer1: answerRegis.answer1,
        answer2: answerRegis.answer2,
        answer3: answerRegis.answer3,
        answer4: answerRegis.answer4,
        answer5: answerRegis.answer5,
        answer61: answerRegis.answer61,
        answer62: answerRegis.answer62,
      })
      .from(answerRegis)
      .where(eq(answerRegis.userId, input.userId));

    if (!answers) {
      throw NotFoundError;
    }

    return {
      answers,
    };
  });
