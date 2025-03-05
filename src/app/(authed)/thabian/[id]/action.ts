"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { db, dbStaff } from "@/db";
import { user } from "@/db/schema";
import { tabian } from "@/db/staff-schema";
import { NotFoundError } from "@/lib/errors";
import { authenticatedAction } from "@/lib/safe-action";

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
        score1: tabian.score1,
        score2: tabian.score2,
        score3: tabian.score3,
        score4: tabian.score4,
        score5: tabian.score5,
        score6_1: tabian.score6_1,
        score6_2: tabian.score6_2,
        status: tabian.status,
        staffUsername: tabian.staffUsername,
        timestamp: tabian.updatedAt,
      })
      .from(tabian)
      .where(eq(tabian.userId, users[0].id));

    if (tabiansData.length <= 0) {
      return {
        id: users[0].id,
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
      id: users[0].id,
      score1: tabiansData[0].score1,
      score2: tabiansData[0].score2,
      score3: tabiansData[0].score3,
      score4: tabiansData[0].score4,
      score5: tabiansData[0].score5,
      score6_1: tabiansData[0].score6_1,
      score6_2: tabiansData[0].score6_2,
      status: tabiansData[0].status,
      staffUsername: tabiansData[0].staffUsername,
      timestamp: tabiansData[0].timestamp,
    };
  });

export const submitScoreTabians = authenticatedAction
  .createServerAction()
  .handler(async () => {
    //Do something
  });
