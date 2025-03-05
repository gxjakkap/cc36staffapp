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

export const lockTabian = authenticatedAction
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

      const tabiansData = await dbStaff
        .select({
          id: tabian.id,
          status: tabian.status,
          staffUsername: tabian.staffUsername,
        })
        .from(tabian)
        .where(eq(tabian.userId, input.userId));

      if (tabiansData.length > 0) {
        if (tabiansData[0].status == "done") {
          return "This has lock by other user";
        }
        if (tabiansData[0].status == "lock") {
          if (tabiansData[0].staffUsername == session.user.username) {
            await dbStaff
              .update(tabian)
              .set({
                status: input.status,
                updatedAt: new Date(),
              })
              .where(eq(tabian.userId, input.userId));
          } else {
            return "This has lock by other user";
          }
          return "success";
        }
        await dbStaff
          .update(tabian)
          .set({
            status: input.status,
            staffUsername: session.user.username,
            updatedAt: new Date(),
          })
          .where(eq(tabian.userId, input.userId));
        return "success";
      } else {
        await dbStaff.insert(tabian).values({
          userId: input.userId,
          status: "lock",
          staffUsername: session.user.username,
        });
        return "success";
      }
    } catch (error) {
      console.log(error);
    }
  });

export const submitScoreTabians = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      userId: z.string(),
      score1: z.number(),
      score2: z.number(),
      score3: z.number(),
      score4: z.number(),
      score5: z.number(),
      score6_1: z.number(),
      score6_2: z.number(),
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
          staffUsername: tabian.staffUsername,
        })
        .from(tabian)
        .where(eq(tabian.userId, input.userId));

      if (tabiansData[0].staffUsername == session.user.username) {
        await dbStaff
          .update(tabian)
          .set({
            score1: input.score1,
            score2: input.score2,
            score3: input.score3,
            score4: input.score4,
            score5: input.score5,
            score6_1: input.score6_1,
            score6_2: input.score6_2,
            status: "done",
            staffUsername: session.user.username,
            updatedAt: new Date(),
          })
          .where(eq(tabian.userId, input.userId));
        return "success";
      } else {
        return "This has lock by other user";
      }
    } catch (error) {
      console.log(error);
    }
  });
