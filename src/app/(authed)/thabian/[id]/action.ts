"use server";

import { z } from "zod";

import { authenticatedAction } from "@/lib/safe-action";

export const submitTabian = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      score1: z.string().min(1),
      score2: z.string().min(1),
      score3: z.string().min(1),
      score4: z.string().min(1),
      score5: z.string().min(1),
      score6_1: z.string().min(1),
      score6_2: z.string().min(1),
    }),
    {
      type: "formData",
    },
  )
  .handler(async ({ input }) => {
    console.log(input);
  });
