"use server";

import { z } from "zod";

import { authenticatedAction } from "@/lib/safe-action";

export const sendConfirmationEmail = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z.string(),
      fullname: z.string(),
    }),
  )
  .handler(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return;
  });
