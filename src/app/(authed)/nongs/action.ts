"use server";

import { eq } from "drizzle-orm";

import { InspectStatus } from "@/components/data-table/status-badge";
import { db, dbStaff } from "@/db";
import { user } from "@/db/schema";
import { tabian } from "@/db/staff-schema";
import { StaffRoles } from "@/lib/auth/role";
import { ForbiddenError } from "@/lib/errors";
import { authenticatedAction } from "@/lib/safe-action";

export const getAllTabiansInfoTable = authenticatedAction
  .createServerAction()
  .handler(async ({ ctx }) => {
    if (
      ctx.user.role !== StaffRoles.ADMIN &&
      ctx.user.role !== StaffRoles.REGIS
    ) {
      throw new ForbiddenError();
    }
    const users = await db
      .select({
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        gender: user.gender,
        phone: user.telephone,
        has_submit: user.hasSubmitAnswer,
      })
      .from(user);

    const data = await Promise.all(
      users.map(async (user) => {
        const tabiansData = await dbStaff
          .select({
            id: tabian.id,
            info: tabian.info,
            status: tabian.info_status,
            staffUsername: tabian.info_staffUsername,
            timestamp: tabian.updatedAt_info,
          })
          .from(tabian)
          .where(eq(tabian.userId, user.id));

        if (tabiansData.length <= 0) {
          return {
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            gender: user.gender,
            phone: user.phone,
            has_submit: user.has_submit,
            info: null,
            status: InspectStatus["UNLOCK"],
            staffUsername: null,
            timestamp: null,
          };
        }

        return {
          id: user.id,
          fullname: user.fullname,
          email: user.email,
          gender: user.gender,
          phone: user.phone,
          has_submit: user.has_submit,
          info: tabiansData[0].info,
          status: tabiansData[0].status,
          staffUsername: tabiansData[0].staffUsername,
          timestamp: tabiansData[0].timestamp,
        };
      }),
    );

    return data;
  });
