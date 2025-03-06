"use server";

import { headers } from "next/headers";
import { count, eq, sql } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { answerAcademic, answerRegis, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { NotFoundError } from "@/lib/errors";
import { authenticatedAction } from "@/lib/safe-action";

export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(),
    redirect: "/login",
  });
}

export const getOverview = authenticatedAction
  .createServerAction()
  .handler(async () => {
    const [{ count: totalUsers }] = await db
      .select({ count: count() })
      .from(user);

    const [stats] = await db
      .select({
        isMan: sql<number>`sum(case when ${user.gender} = 'man' and ${user.infoDone} = true then 1 else 0 end)`,
        isWoman: sql<number>`sum(case when ${user.gender} = 'woman' and ${user.infoDone} = true then 1 else 0 end)`,
        infoDone: sql<number>`sum(case when ${user.infoDone} = true then 1 else 0 end)`,
        regisDone: sql<number>`sum(case when ${user.regisDone} = true then 1 else 0 end)`,
        academicDone: sql<number>`sum(case when ${user.academicDone} = true then 1 else 0 end)`,
        filesDone: sql<number>`sum(case when ${user.filesDone} = true then 1 else 0 end)`,
        hasSubmit: sql<number>`sum(case when ${user.hasSubmitAnswer} = true then 1 else 0 end)`,
      })
      .from(user);

    return {
      totalUsers,
      stats,
    };
  });

export const getAcademicAnswer = authenticatedAction
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
        id: answerAcademic.id,
        userId: answerAcademic.userId,
        algoAnswer: answerAcademic.algoAnswer,
        chessNotation: answerAcademic.chessNotation,
        chessScore: answerAcademic.chessScore,
      })
      .from(answerAcademic)
      .where(eq(answerAcademic.userId, input.userId));

    if (!answers) {
      throw NotFoundError;
    }

    return {
      answers,
    };
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
