"use server";

import { auth } from "@/lib/auth";
import { unauthenticatedAction } from "@/lib/safe-action";
import { z } from "zod";

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
