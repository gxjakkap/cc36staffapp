"use server";

import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db, dbStaff } from "@/db";
import { user } from "@/db/schema";
import { tabian } from "@/db/staff-schema";
import { auth } from "@/lib/auth";
import { NotFoundError } from "@/lib/errors";
import { authenticatedAction } from "@/lib/safe-action";

import { ScoreFieldEnum } from "./enum";

export const getUserTabians = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      id: z.string().nullable(),
    }),
  )
  .handler(async ({ input }) => {
    if (!input.id) {
      return;
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
        });
        return "success";
      }

      await dbStaff
        .update(tabian)
        .set({
          [input.field]: input.score,
          [`${input.field}_staffUsername`]: session.user.username,
        })
        .where(eq(tabian.userId, input.userId));
      return "success";
    } catch (error) {
      console.log(error);
    }
  });
