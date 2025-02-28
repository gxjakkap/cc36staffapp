"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { file, user } from "@/db/schema";
import { NotFoundError } from "@/lib/errors";
import { getPresignedURL } from "@/lib/files";
import { authenticatedAction } from "@/lib/safe-action";

const getUserInfo = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .handler(async ({ input }) => {
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

export default getUserInfo;
