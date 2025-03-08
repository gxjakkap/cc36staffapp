"use client";

import { useEffect, useRef } from "react";
import { createSwapy, Swapy } from "swapy";

import { NumberFlow } from "@/components/number-flow";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface OverviewProps {
  data: {
    totalUsers: number;
    stats: {
      isMan: number;
      isWoman: number;
      infoDone: number;
      regisDone: number;
      academicDone: number;
      filesDone: number;
      hasSubmit: number;
    };
  };
}

export function Overview({ data }: OverviewProps) {
  const swapy = useRef<Swapy | null>(null);
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (container.current) {
      swapy.current = createSwapy(container.current);
    }

    return () => {
      swapy.current?.destroy();
    };
  }, []);

  return (
    <div ref={container}>
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-6">
        <div
          data-swapy-slot="a"
          className="slot col-span-full flex rounded-xl lg:col-span-2 lg:row-span-2"
        >
          <div data-swapy-item="a" className="flex size-full">
            <Card className="size-full">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  สถานะการสมัคร
                </CardTitle>
                <div className="text-muted-foreground mt-2 text-sm"></div>
                <CardDescription>ภาพรวมของผู้สมัครทั้งหมด</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-8">
                  <div>
                    <NumberFlow
                      value={data.totalUsers}
                      suffix=" คน"
                      className="text-primary text-6xl font-bold"
                    />
                    <div className="text-muted-foreground mt-3 text-base">
                      ผู้สมัครทั้งหมด
                    </div>
                  </div>
                  <div>
                    <NumberFlow
                      value={data.stats.hasSubmit}
                      suffix=" คน"
                      className="text-5xl font-bold text-emerald-500"
                    />
                    <div className="text-muted-foreground mt-3 text-base">
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
        </div>
        <div data-swapy-slot="b" className="slot flex rounded-xl lg:col-span-1">
          <div data-swapy-item="b" className="w-full">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  น้องผู้ชาย
                </CardTitle>
                <CardDescription>นับเฉพาะคนที่ข้อมูลส่วนตัวครบ</CardDescription>
              </CardHeader>
              <CardContent>
                <NumberFlow
                  value={Math.round(
                    (data.stats.isMan / data.stats.infoDone) * 100,
                  )}
                  suffix="%"
                  className="text-4xl font-bold text-indigo-500"
                />
                <div className="text-muted-foreground/80 mt-2 text-sm">
                  {data.stats.isMan} คน
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div
          data-swapy-slot="c"
          className="slot flex rounded-xl lg:col-span-1 lg:col-start-3 lg:row-start-2"
        >
          <div data-swapy-item="c" className="w-full">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  น้องผู้หญิง
                </CardTitle>
                <CardDescription>นับเฉพาะคนที่ข้อมูลส่วนตัวครบ</CardDescription>
              </CardHeader>
              <CardContent>
                <NumberFlow
                  value={Math.round(
                    (data.stats.isWoman / data.stats.infoDone) * 100,
                  )}
                  suffix="%"
                  className="text-4xl font-bold text-pink-500"
                />
                <div className="text-muted-foreground/80 mt-2 text-sm">
                  {data.stats.isWoman} คน
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div data-swapy-slot="d" className="slot flex rounded-xl lg:col-span-3">
          <div data-swapy-item="d" className="w-full">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold">
                  ข้อมูลส่วนบุคคล
                </CardTitle>
                <CardDescription className="text-sm">
                  ผู้สมัครที่กรอกข้อมูลส่วนบุคคลครบถ้วน
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NumberFlow
                  value={data.stats.infoDone}
                  suffix=" คน"
                  className="text-3xl font-bold text-blue-600"
                />
                <div className="text-muted-foreground/80 mt-1 text-xs">
                  {((data.stats.infoDone / data.totalUsers) * 100).toFixed(2)}%
                  • เสร็จสมบูรณ์
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div data-swapy-slot="e" className="slot flex rounded-xl lg:col-span-3">
          <div data-swapy-item="e" className="w-full">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  เอกสารประกอบ
                </CardTitle>
                <CardDescription>
                  ผู้สมัครที่อัปโหลดเอกสารครบถ้วน
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NumberFlow
                  value={data.stats.filesDone}
                  suffix=" คน"
                  className="text-4xl font-bold text-violet-500"
                />
                <div className="text-muted-foreground/80 mt-2 text-sm">
                  {((data.stats.filesDone / data.totalUsers) * 100).toFixed(2)}%
                  • เสร็จสมบูรณ์
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div data-swapy-slot="f" className="slot flex rounded-xl lg:col-span-3">
          <div data-swapy-item="f" className="flex size-full">
            <Card className="size-full">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  ปริศนาปัญญาชน
                </CardTitle>
                <CardDescription>
                  ผู้สมัครที่ตอบคำถามจากฝ่ายทะเบียนครบถ้วน
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NumberFlow
                  value={data.stats.regisDone}
                  suffix=" คน"
                  className="text-4xl font-bold text-amber-500"
                />
                <div className="text-muted-foreground/80 mt-2 text-sm">
                  {((data.stats.regisDone / data.totalUsers) * 100).toFixed(2)}%
                  • เสร็จสมบูรณ์
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div data-swapy-slot="g" className="slot flex rounded-xl lg:col-span-3">
          <div data-swapy-item="g" className="flex size-full">
            <Card className="size-full">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  ปริศนาวิศวะ
                </CardTitle>
                <CardDescription>
                  ผู้สมัครที่ตอบคำถามจากฝ่ายวิชาการครบถ้วน
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NumberFlow
                  value={data.stats.academicDone}
                  suffix=" คน"
                  className="text-4xl font-bold text-rose-500"
                />
                <div className="text-muted-foreground/80 mt-2 text-sm">
                  {((data.stats.academicDone / data.totalUsers) * 100).toFixed(
                    2,
                  )}
                  % • เสร็จสมบูรณ์
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
