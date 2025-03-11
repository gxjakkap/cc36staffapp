import { getOverview } from "@/app/(authed)/actions";
import { DragProvider } from "@/components/drag-context";
import { DragOverviewControl } from "@/components/drag-overview-control";
import { Overview } from "@/components/overview";
import { calculateTimeLeft } from "@/lib/utils";

export default async function Home() {
  const [data] = await getOverview();

  if (!data) {
    return null;
  }

  return (
    <div className="container mx-auto space-y-8 px-6 pt-8 pb-12">
      <div className="flex justify-between text-4xl font-bold">
        <h1>Overview</h1>
        <h1 className="text-destructive">
          {(() => {
            const { isLate, daysLeft, hoursLeft } = calculateTimeLeft(
              new Date("2025-03-13T23:59:59+07:00"),
            );

            if (isLate) return "หมดเขตรับสมัครแล้ว 🥳";

            return `เหลืออีก ${daysLeft > 0 ? `${daysLeft} วัน` : `${hoursLeft} ชั่วโมง`} ปิดรับสมัคร`;
          })()}
        </h1>
      </div>
      <DragProvider>
        <Overview data={data} />
        <DragOverviewControl />
      </DragProvider>
    </div>
  );
}
