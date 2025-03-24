"use server";

import { Resend } from "resend";
import { z } from "zod";

import ConfirmEmail from "@/components/emails/confirm-email-template";
import { dbStaff } from "@/db";
import { confirmationStaff } from "@/db/staff-schema";
import { PublicError } from "@/lib/errors";
import { authenticatedAction } from "@/lib/safe-action";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendConfirmationEmail = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      user_id: z.string(),
      email: z.string(),
      fullname: z.string(),
    }),
  )
  .handler(async ({ input, ctx }) => {
    try {
      const { error } = await resend.emails.send({
        from: "noreply@mail.comcamp.io",
        to: [input.email],
        subject: "ยืนยันการเข้าร่วม ค่าย ComCamp36",
        react: ConfirmEmail({
          fullname: input.fullname,
        }),
      });

      if (error) {
        console.log(error);
        throw new PublicError(`${error}`);
      }

      await dbStaff.insert(confirmationStaff).values({
        userId: input.user_id,
        isSentEmail: true,
        staffName: ctx.user.username ?? "",
        sent_at: new Date(),
      });

      return;
    } catch (error) {
      throw new PublicError(`Said email erorr: ${error}`);
    }

    return;
  });
