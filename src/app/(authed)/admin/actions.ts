"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { ForbiddenError } from "@/lib/errors";
import { authenticatedAction } from "@/lib/safe-action";
import { z } from "zod";

export const addStaffAccount = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      name: z.string(),
      role: z.enum(["staff", "admin"]),
      email: z.string(),
      username: z.string(),
      password: z.string(),
    }),
  )
  .handler(async ({ ctx, input }) => {
    if (ctx.user.role != "admin") {
      throw new ForbiddenError();
    }

    await auth.api.createUser({
      headers: await headers(),
      body: {
        email: input.email,
        name: input.name,
        password: input.password,
        role: input.role,
        data: {
          username: input.username,
        },
      },
    });
  });

export const deleteStaffAccount = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .handler(async ({ ctx, input }) => {
    if (ctx.user.role != "admin") {
      throw new ForbiddenError();
    }

    await auth.api.removeUser({
      headers: await headers(),
      body: {
        userId: input.id,
      },
    });
  });

export const editStaffAccount = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      id: z.string(),
      password: z.string().optional(),
      role: z.enum(["staff", "admin"]).optional(),
    }),
  )
  .handler(async ({ ctx, input }) => {
    if (ctx.user.role != "admin") {
      throw new ForbiddenError();
    }

    if (input.password) {
      await auth.api.setUserPassword({
        headers: await headers(),
        body: {
          userId: input.id,
          newPassword: input.password,
        },
      });
    }

    if (input.role) {
      await auth.api.setRole({
        headers: await headers(),
        body: {
          userId: input.id,
          role: input.role,
        },
      });
    }
  });
