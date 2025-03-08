import { getOverview } from "@/app/(authed)/actions";
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
        <h1 className="text-destructive">
          เหลืออีก{" "}
          {Math.ceil(
            (new Date("2025-03-13").getTime() - new Date().getTime()) /
              (1000 * 60 * 60 * 24),
          )}{" "}
          วันปิดรับสมัคร
        </h1>
      </div>
      <Overview data={data} />
    </div>
  );
}
