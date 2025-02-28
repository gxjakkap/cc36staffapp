"use server";

import { z } from "zod";

import { auth } from "@/lib/auth";
import { unauthenticatedAction } from "@/lib/safe-action";

export const SignInStaff = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      username: z.string(),
      password: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    await auth.api.signInUsername({
      body: {
        username: input.username,
        password: input.password,
      },
    });
  });
