import { getOverview } from "@/app/(authed)/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Home() {
  const [data] = await getOverview();

  if (!data) {
    return null;
  }

  return (
    <div className="container mx-auto pt-8 pb-12 px-6 space-y-8">
      <div className="text-4xl font-bold flex justify-between">
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
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
        <div className="lg:col-span-2 lg:row-span-2 col-span-full">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                สถานะการสมัคร
              </CardTitle>
              <div className="text-sm text-muted-foreground mt-2"></div>
              <CardDescription>ภาพรวมของผู้สมัครทั้งหมด</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-8">
                <div>
                  <div className="text-6xl font-bold text-primary">
                    {data.totalUsers} คน
                  </div>
                  <div className="text-base text-muted-foreground mt-3">
                    ผู้สมัครทั้งหมด
                  </div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-emerald-500">
                    {data.stats.hasSubmit} คน
                  </div>
                  <div className="text-base text-muted-foreground mt-3">
                    {((data.stats.hasSubmit / data.totalUsers) * 100).toFixed(
                      2,
                    )}
                    % • ส่งใบสมัครแล้ว
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">ผู้ชาย</CardTitle>
              <CardDescription>ผู้สมัครที่เป็นผู้ชาย</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-indigo-500">
                {Math.round((data.stats.isMan / data.totalUsers) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground/80 mt-2">
                {data.stats.isMan} คน
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:row-start-2 lg:col-start-3 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">ผู้หญิง</CardTitle>
              <CardDescription>ผู้สมัครที่เป็นผู้หญิง</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-pink-500">
                {Math.round((data.stats.isWoman / data.totalUsers) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground/80 mt-2">
                {data.stats.isWoman} คน
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                ข้อมูลส่วนบุคคล
              </CardTitle>
              <CardDescription>
                ผู้สมัครที่กรอกข้อมูลส่วนบุคคลครบถ้วน
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-600">
                {data.stats.infoDone} คน
              </div>
              <div className="text-sm text-muted-foreground/80 mt-2">
                {((data.stats.infoDone / data.totalUsers) * 100).toFixed(2)}% •
                เสร็จสมบูรณ์
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                เอกสารประกอบ
              </CardTitle>
              <CardDescription>ผู้สมัครที่อัพโหลดเอกสารครบถ้วน</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-violet-500">
                {data.stats.filesDone} คน
              </div>
              <div className="text-sm text-muted-foreground/80 mt-2">
                {((data.stats.filesDone / data.totalUsers) * 100).toFixed(2)}% •
                เสร็จสมบูรณ์
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                ปริศนาปัญญาชน
              </CardTitle>
              <CardDescription>
                ผู้สมัครที่ตอบคำถามจากฝ่ายทะเบียนครบถ้วน
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-amber-500">
                {data.stats.regisDone} คน
              </div>
              <div className="text-sm text-muted-foreground/80 mt-2">
                {((data.stats.regisDone / data.totalUsers) * 100).toFixed(2)}% •
                เสร็จสมบูรณ์
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                ปริศนาวิศวะ
              </CardTitle>
              <CardDescription>
                ผู้สมัครที่ตอบคำถามจากฝ่ายวิชาการครบถ้วน
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-rose-500">
                {data.stats.academicDone} คน
              </div>
              <div className="text-sm text-muted-foreground/80 mt-2">
                {((data.stats.academicDone / data.totalUsers) * 100).toFixed(2)}
                % • เสร็จสมบูรณ์
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
