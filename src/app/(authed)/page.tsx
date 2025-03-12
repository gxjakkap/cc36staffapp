import { Suspense } from "react";

import { getOverview } from "@/app/(authed)/actions";
import { Countdown } from "@/components/countdown";
import { DragProvider } from "@/components/drag-context";
import { DragOverviewControl } from "@/components/drag-overview-control";
import { Overview } from "@/components/overview";

export default async function Home() {
  const [data] = await getOverview();

  if (!data) {
    return null;
  }

  return (
    <div className="container mx-auto space-y-8 px-6 pt-8 pb-12">
      <div className="flex justify-between text-4xl font-bold">
        <h1>Overview</h1>
        <Suspense>
          <Countdown
            targetDate={new Date("2025-03-13T23:59:59+07:00")}
            expiredMessage="ปิดรับสมัครแล้ว 🥳"
            className="font-inter"
          />
        </Suspense>
      </div>
      <DragProvider>
        <Overview data={data} />
        <DragOverviewControl />
      </DragProvider>
    </div>
  );
}
