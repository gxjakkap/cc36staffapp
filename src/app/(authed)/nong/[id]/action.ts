"use server";

import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db, dbStaff } from "@/db";
import { file, user } from "@/db/schema";
import { remarks, tabian } from "@/db/staff-schema";
import { auth } from "@/lib/auth";
import { StaffRoles } from "@/lib/auth/role";
import { ForbiddenError, NotFoundError } from "@/lib/errors";
import { getPresignedURL } from "@/lib/files";
import { InspectStatusE } from "@/lib/inspect-status";
import { authenticatedAction } from "@/lib/safe-action";

export const getUserInfo = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      id: z.string().nullable(),
    }),
  )
  .handler(async ({ ctx, input }) => {
    if (!input.id) return;

    if (
      ctx.user.role !== StaffRoles.ADMIN &&
      ctx.user.role !== StaffRoles.REGIS
    ) {
      throw new ForbiddenError();
    }

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

    const [nongsRemark] = await dbStaff
      .select()
      .from(remarks)
      .where(eq(remarks.userId, input.id));

    const result = Object.fromEntries(urls) as Record<
      keyof typeof filePaths,
      string
    >;

    return {
      user: users[0].User,
      files: result,
      remarks: nongsRemark,
    };
  });

export const submitNongInfo = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      userId: z.string(),
      isCorrect: z.boolean(),
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
          info: input.isCorrect,
          info_status: InspectStatusE.DONE,
          info_staffUsername: session.user.username,
          updatedAt_info: new Date(),
        });
        return "success";
      }

      await dbStaff
        .update(tabian)
        .set({
          info: input.isCorrect,
          info_status: InspectStatusE.DONE,
          info_staffUsername: session.user.username,
          updatedAt_info: new Date(),
        })
        .where(eq(tabian.userId, input.userId));
      return "success";
    } catch (error) {
      console.log(error);
    }
  });

export const setNongWaiting = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      userId: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    try {
      const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (
        !session?.user.username ||
        (session.user.role !== StaffRoles.REGIS &&
          session.user.role !== StaffRoles.ADMIN)
      )
        return;

      const tabiansData = await dbStaff
        .select({
          id: tabian.id,
        })
        .from(tabian)
        .where(eq(tabian.userId, input.userId));

      if (tabiansData.length <= 0) {
        await dbStaff.insert(tabian).values({
          userId: input.userId,
          info: null,
          info_status: InspectStatusE.WAITING,
          info_staffUsername: session.user.username,
          updatedAt_info: new Date(),
        });
        return "success";
      }

      await dbStaff
        .update(tabian)
        .set({
          info: null,
          info_status: InspectStatusE.WAITING,
          info_staffUsername: session.user.username,
          updatedAt_info: new Date(),
        })
        .where(eq(tabian.userId, input.userId));
      return "success";
    } catch (err) {
      console.log(err);
    }
  });

export const addRemarks = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      userId: z.string(),
      remarks: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    try {
      const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (
        !session?.user.username ||
        (session.user.role !== StaffRoles.REGIS &&
          session.user.role !== StaffRoles.ADMIN)
      )
        return;

      await dbStaff.insert(remarks).values({
        userId: input.userId,
        remarks: input.remarks,
        updated_at: new Date(),
        added_by: session.user.username,
      });
      return "success";
    } catch (err) {
      console.log(err);
    }
  });

export const editRemarks = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      userId: z.string(),
      remarks: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    try {
      const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (
        !session?.user.username ||
        (session.user.role !== StaffRoles.REGIS &&
          session.user.role !== StaffRoles.ADMIN)
      )
        return;

      const [oldRemark] = await dbStaff
        .select()
        .from(remarks)
        .where(eq(remarks.userId, input.userId))
        .limit(1);

      if (!oldRemark) return;

      await dbStaff
        .update(remarks)
        .set({
          remarks: input.remarks,
          updated_at: new Date(),
          added_by: session.user.username,
        })
        .where(eq(remarks.userId, input.userId));
      return "success";
    } catch (err) {
      console.log(err);
    }
  });

export const remRemarks = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      userId: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    try {
      const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (
        !session?.user.username ||
        (session.user.role !== StaffRoles.REGIS &&
          session.user.role !== StaffRoles.ADMIN)
      )
        return;

      const [oldRemark] = await dbStaff
        .select()
        .from(remarks)
        .where(eq(remarks.userId, input.userId))
        .limit(1);

      if (!oldRemark) return;

      await dbStaff.delete(remarks).where(eq(remarks.userId, input.userId));
      return "success";
    } catch (err) {
      console.log(err);
    }
  });
