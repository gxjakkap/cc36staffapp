"use server";

import { db } from "@/db";
import { user } from "@/db/schema";
import { authenticatedAction } from "@/lib/safe-action";
import { and, eq } from "drizzle-orm";

const getAllUserTable = authenticatedAction
  .createServerAction()
  .handler(async () => {
    const users = await db
      .select({
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        gender: user.gender,
        phone: user.telephone,
        hasSubmit: user.hasSubmitAnswer,
      })
      .from(user)
      .where(and(eq(user.infoDone, true), eq(user.filesDone, true)));

    return users;
  });

export default getAllUserTable;
