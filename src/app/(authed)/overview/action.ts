import { db } from "@/db";
import { user } from "@/db/schema";
import { authenticatedAction } from "@/lib/safe-action";
import { count, sql } from "drizzle-orm";

const getOverview = authenticatedAction
  .createServerAction()
  .handler(async () => {
    const [{ count: totalUsers }] = await db
      .select({ count: count() })
      .from(user);

    const [completionStats] = await db
      .select({
        infoDone: sql<number>`sum(case when ${user.infoDone} = true then 1 else 0 end)`,
        regisDone: sql<number>`sum(case when ${user.regisDone} = true then 1 else 0 end)`,
        academicDone: sql<number>`sum(case when ${user.academicDone} = true then 1 else 0 end)`,
        filesDone: sql<number>`sum(case when ${user.filesDone} = true then 1 else 0 end)`,
        hasSubmit: sql<number>`sum(case when ${user.hasSubmitAnswer} = true then 1 else 0 end)`,
      })
      .from(user);

    return {
      totalUsers,
      completionStats,
    };
  });

export default getOverview;
