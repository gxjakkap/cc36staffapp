"use server";

import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { InspectStatus } from "@/components/data-table/status-badge";
import { db, dbStaff } from "@/db";
import { answerAcademic, user } from "@/db/schema";
import { wichakarn } from "@/db/staff-schema";
import { auth } from "@/lib/auth";
import { StaffRoles } from "@/lib/auth/role";
import { ForbiddenError, NotFoundError } from "@/lib/errors";
import { authenticatedAction } from "@/lib/safe-action";

export const getUserWichakans = authenticatedAction
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
      ctx.user.role !== StaffRoles.ACADEMIC
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

    const wichakansData = await dbStaff
      .select({
        id: wichakarn.id,
        scoreChess: wichakarn.scoreChess,
        scoreAcademic: wichakarn.scoreAcademic,
        status: wichakarn.status,
        staffUsername: wichakarn.staffUsername,
        timestamp: wichakarn.updatedAt,
      })
      .from(wichakarn)
      .where(eq(wichakarn.userId, users[0].id));

    if (wichakansData.length <= 0) {
      return {
        id: users[0].id,
        scoreChess: null,
        scoreAcademic: null,
        status: InspectStatus["UNLOCK"],
        staffUsername: null,
        timestamp: null,
      };
    }

    return {
      id: users[0].id,
      scoreChess: wichakansData[0].scoreChess,
      scoreAcademic: wichakansData[0].scoreAcademic,
      status: wichakansData[0].status,
      staffUsername: wichakansData[0].staffUsername,
      timestamp: wichakansData[0].timestamp,
    };
  });

export const lockWichakarn = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      userId: z.string(),
      status: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    try {
      const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (!session?.user.username) return;

      const wichakansData = await dbStaff
        .select({
          id: wichakarn.id,
          status: wichakarn.status,
          staffUsername: wichakarn.staffUsername,
        })
        .from(wichakarn)
        .where(eq(wichakarn.userId, input.userId));

      if (wichakansData.length > 0) {
        if (wichakansData[0].status == InspectStatus["LOCK"]) {
          if (wichakansData[0].staffUsername == session.user.username) {
            await dbStaff
              .update(wichakarn)
              .set({
                status: input.status,
                updatedAt: new Date(),
              })
              .where(eq(wichakarn.userId, input.userId));
          } else {
            return `This application has been locked by ${wichakansData[0].staffUsername}`;
          }
          return "success";
        }
        await dbStaff
          .update(wichakarn)
          .set({
            status: input.status,
            staffUsername: session.user.username,
            updatedAt: new Date(),
          })
          .where(eq(wichakarn.userId, wichakarn.userId));
        return "success";
      } else {
        await dbStaff.insert(wichakarn).values({
          userId: input.userId,
          status: InspectStatus["LOCK"],
          staffUsername: session.user.username,
        });
        return "success";
      }
    } catch (error) {
      console.log(error);
    }
  });

export const submitScoreAcademics = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      userId: z.string(),
      scoreAcademic: z.number(),
      scoreChess: z.number(),
    }),
  )
  .handler(async ({ input }) => {
    try {
      const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (!session?.user.username) return;
      const [wichakansData] = await dbStaff
        .select({
          id: wichakarn.id,
          staffUsername: wichakarn.staffUsername,
        })
        .from(wichakarn)
        .where(eq(wichakarn.userId, input.userId))
        .limit(1);

      if (wichakansData.staffUsername == session.user.username) {
        await dbStaff
          .update(wichakarn)
          .set({
            scoreAcademic: input.scoreAcademic.toString(),
            scoreChess: input.scoreChess,
            status: InspectStatus["DONE"],
            staffUsername: session.user.username,
            updatedAt: new Date(),
          })
          .where(eq(wichakarn.userId, input.userId));
        return "success";
      } else {
        return `This application has been lock by ${wichakansData.staffUsername}`;
      }
    } catch (error) {
      console.log(error);
    }
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
