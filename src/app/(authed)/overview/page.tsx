import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import getOverview from "./action";

export default async function OverviewPage() {
  const [data] = await getOverview();

  if (!data) {
    return null;
  }

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
                  <div className="text-6xl font-bold">{data?.totalUsers}</div>
                  <div className="text-base text-muted-foreground mt-3">
                    ผู้สมัครทั้งหมด
                  </div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-green-600">
                    {data?.completionStats.hasSubmit}
                  </div>
                  <div className="text-base text-muted-foreground mt-3">
                    {(
                      (data?.completionStats.hasSubmit / data.totalUsers) *
                      100
                    ).toFixed(2)}
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
                {data?.completionStats.infoDone}
              </div>
              <div className="text-sm text-muted-foreground/80 mt-2">
                {(
                  (data?.completionStats.infoDone / data?.totalUsers) *
                  100
                ).toFixed(2)}
                % • เสร็จสมบูรณ์
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
                {data?.completionStats.filesDone}
              </div>
              <div className="text-sm text-muted-foreground/80 mt-2">
                {(
                  (data.completionStats.filesDone / data.totalUsers) *
                  100
                ).toFixed(2)}
                % • เสร็จสมบูรณ์
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
                {data.completionStats.regisDone}
              </div>
              <div className="text-sm text-muted-foreground/80 mt-2">
                {(
                  (data.completionStats.regisDone / data.totalUsers) *
                  100
                ).toFixed(2)}
                % • เสร็จสมบูรณ์
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
                {data?.completionStats.academicDone}
              </div>
              <div className="text-sm text-muted-foreground/80 mt-2">
                {(
                  (data.completionStats.academicDone / data.totalUsers) *
                  100
                ).toFixed(2)}
                % • เสร็จสมบูรณ์
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
