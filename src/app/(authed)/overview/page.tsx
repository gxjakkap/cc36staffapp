import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/db";
import { user } from "@/db/schema";
import { count, sql } from "drizzle-orm";

export default async function OverviewPage() {
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

  return (
    <div className="container mx-auto pb-12 px-6 space-y-12">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Overview</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-2 lg:row-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                สถานะการสมัคร
              </CardTitle>
              <CardDescription>ภาพรวมของผู้สมัครทั้งหมด</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-8">
                <div>
                  <div className="text-6xl font-bold">{totalUsers}</div>
                  <div className="text-base text-muted-foreground mt-3">
                    ผู้สมัครทั้งหมด
                  </div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-green-600">
                    {completionStats.hasSubmit}
                  </div>
                  <div className="text-base text-muted-foreground mt-3">
                    {((completionStats.hasSubmit / totalUsers) * 100).toFixed(
                      2,
                    )}
                    % • ส่งใบสมัครแล้ว
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                ข้อมูลส่วนตัว
              </CardTitle>
              <CardDescription>
                ผู้สมัครที่กรอกข้อมูลส่วนตัวครบถ้วน
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-600">
                {completionStats.infoDone}
              </div>
              <div className="text-sm text-muted-foreground/80 mt-2">
                {((completionStats.infoDone / totalUsers) * 100).toFixed(2)}% •
                เสร็จสมบูรณ์
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                เอกสารประกอบ
              </CardTitle>
              <CardDescription>ผู้สมัครที่อัพโหลดเอกสารครบถ้วน</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-violet-600">
                {completionStats.filesDone}
              </div>
              <div className="text-sm text-muted-foreground/80 mt-2">
                {((completionStats.filesDone / totalUsers) * 100).toFixed(2)}% •
                เสร็จสมบูรณ์
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                ปริศนาปัญญาชน
              </CardTitle>
              <CardDescription>แบบทดสอบความสามารถทั่วไป</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-amber-600">
                {completionStats.regisDone}
              </div>
              <div className="text-sm text-muted-foreground/80 mt-2">
                {((completionStats.regisDone / totalUsers) * 100).toFixed(2)}% •
                เสร็จสมบูรณ์
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                ปริศนาวิศวะ
              </CardTitle>
              <CardDescription>แบบทดสอบความถนัดทางวิศวกรรม</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-rose-600">
                {completionStats.academicDone}
              </div>
              <div className="text-sm text-muted-foreground/80 mt-2">
                {((completionStats.academicDone / totalUsers) * 100).toFixed(2)}
                % • เสร็จสมบูรณ์
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
