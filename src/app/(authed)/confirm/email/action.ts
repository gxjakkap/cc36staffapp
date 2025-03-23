"use server";

import { Resend } from "resend";
import { z } from "zod";

import { EmailTemplate } from "@/app/(authed)/confirm/email/template";
import { PublicError } from "@/lib/errors";
import { authenticatedAction } from "@/lib/safe-action";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendConfirmationEmail = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z.string(),
      fullname: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    try {
      const { error } = await resend.emails.send({
        // TODO: REPLACE WITH COMCAMP.io email
        from: "onboarding@resend.dev",
        to: [input.email],
        subject: "Hello world",
        react: await EmailTemplate({ firstName: "john" }),
      });

      if (error) {
        console.log(error);
        throw new PublicError(`${error}`);
      }

      return;
    } catch (error) {
      throw new PublicError(`Said email erorr: ${error}`);
    }

    return;
  });
