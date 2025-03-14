"use server";

import { count, eq, or } from "drizzle-orm";

import { InspectStatus } from "@/components/data-table/status-badge";
import { dbStaff } from "@/db";
import { user, wichakarn } from "@/db/staff-schema";
import { StaffRoles } from "@/lib/auth/role";
import { authenticatedAction } from "@/lib/safe-action";

export const getPeoplePercent = authenticatedAction
  .createServerAction()
  .handler(async () => {
    const data = await dbStaff
      .select({
        staff: wichakarn.staffUsername,
        count: count(wichakarn.staffUsername),
      })
      .from(wichakarn)
      .groupBy(wichakarn.staffUsername)
      .where(eq(wichakarn.status, InspectStatus["DONE"]));

    const userData = await dbStaff
      .select({
        username: user.username,
      })
      .from(user)
      .where(or(eq(user.role, StaffRoles["ACADEMIC"])));

    const mergedData = await Promise.all(
      userData.map((item) => {
        const staffData = data.find((d) => d.staff === item.username);
        const count = staffData ? staffData.count : 0;
        const totalUsers = userData.length;
        return {
          username: item.username,
          count,
          percentage: (count / totalUsers) * 100,
        };
      }),
    );

    return mergedData;
  });
