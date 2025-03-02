"use server";

import { headers } from "next/headers";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { authenticatedAction } from "@/lib/safe-action";

export const changePassword = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      currentPassword: z.string(),
      newPassword: z.string(),
    }),
  )
  .handler(async ({ ctx, input }) => {
    if (!ctx.user) {
      throw new Error("User not authenticated.");
    }

    try {
      const requestHeaders = await headers();
      await auth.api.changePassword({
        headers: requestHeaders,
        body: {
          userId: ctx.user.id,
          currentPassword: input.currentPassword,
          newPassword: input.newPassword,
          revokeOtherSessions: true,
        },
      });

      return { success: true, message: "Password updated successfully." };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to update password.",
      };
    }
  });
