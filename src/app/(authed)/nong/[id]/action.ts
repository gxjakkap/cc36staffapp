"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { db, dbStaff } from "@/db";
import { file, user } from "@/db/schema";
import { NotFoundError } from "@/lib/errors";
import { getPresignedURL } from "@/lib/files";
import { authenticatedAction } from "@/lib/safe-action";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { tabian } from "@/db/staff-schema";

export const getUserInfo = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      id: z.string().nullable(),
    }),
  )
  .handler(async ({ input }) => {
    if (!input.id) return

    const users = await db
      .select()
      .from(user)
      .leftJoin(file, eq(file.userId, user.id))
      .where(eq(user.id, input.id))
      .limit(1);

    if (users.length <= 0) {
      throw NotFoundError;
    }

    const files = users[0].File;

    const filePaths = {
      imgUrl: files?.facePhotoFilepath,
      thaiIdUrl: files?.thaiNationalidCopyFilepath,
      parentFormUrl: files?.parentPermissionFilepath,
      p1Url: files?.p1Filepath,
      p7Url: files?.p7Filepath,
    };

    const urls = await Promise.all(
      Object.entries(filePaths).map(async ([key, path]) => {
        return [
          key,
          path
            ? await getPresignedURL(path)
            : key === "imgUrl"
              ? "/placeholder_goose.png"
              : "",
        ];
      }),
    );

    const result = Object.fromEntries(urls) as Record<
      keyof typeof filePaths,
      string
    >;

    return {
      user: users[0].User,
      files: result,
    };
});

export const submitNongInfo = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      userId: z.string(),
      isCorrect: z.boolean()
    })
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
            info: input.isCorrect,
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
})