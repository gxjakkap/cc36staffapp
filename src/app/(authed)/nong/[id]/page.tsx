"use client";

import { Fragment } from "react";
import Image from "next/image";
import { redirect, useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { CircleCheck, CircleX, Download, ExternalLink } from "lucide-react";
import { toast } from "sonner";

import BackwardButton from "@/components/backward-button";
import Spinner from "@/components/spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useServerActionQuery } from "@/hook/server-action-hooks";
import {
  formatDateString,
  formatThaiBuddhist,
  genderVal,
  titleVal,
} from "@/lib/formatter";

import { getUserTabians } from "../../thabian/[id]/action";
import { getUserInfo, submitNongInfo } from "./action";

function ApplicantPage() {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const { data, error, isLoading } = useServerActionQuery(getUserInfo, {
    queryKey: ["userInfos", id],
    input: { id: id ? id.toString() : null },
  });

  const {
    data: tabiansData,
    error: tabiansErr,
    isLoading: tabiansLoading,
  } = useServerActionQuery(getUserTabians, {
    queryKey: ["userInfoTabians", id],
    input: { id: id ? id.toString() : null },
  });

  if (!id) {
    return redirect("/nongs");
  }

  if (!isLoading && error) {
    return redirect("/nongs");
  }

  if (!tabiansLoading && tabiansErr) {
    return redirect("/nongs");
  }

  if (isLoading || !data) {
    return (
      <div className="flex w-full max-w-screen justify-center py-12">
        <Spinner />
      </div>
    );
  }

  const ApplicantInfo: ApplicantItemsProps[] = [
    {
      label: "ข้อมูลส่วนตัว",
      data: "",
      isHeader: true,
    },
    {
      label: "อายุ",
      data: `${data.user.age || "ยังไม่ได้ระบุอายุ"}`,
    },
    {
      label: "วันเกิด",
      data: `${formatDateString(new Date(data.user.birth || 0).getTime())}`,
    },
    {
      label: "เพศ",
      data: `${data.user.gender ? genderVal(data.user.gender) : "ยังไม่ได้ระบุเพศ"}`,
    },
    {
      label: "ประวัติการศึกษา",
      data: "",
      isHeader: true,
    },
    {
      label: "ชั้นการศึกษา",
      data: `${data.user.graduation || "ยังไม่ได้ระบุชั้นการศึกษา"}`,
    },
    {
      label: "สายการเรียน",
      data: `${data.user.course || "ยังไม่ได้ระบุสายการเรียน"}`,
    },
    {
      label: "โรงเรียน",
      data: `${data.user.school || "ยังไม่ได้ระบุโรงเรียน"}`,
    },
    {
      label: "ข้อมูลทางการแพทย์",
      data: "",
      isHeader: true,
    },
    {
      label: "หมู่เลือด",
      data: `${data.user.bloodGroup?.toUpperCase() || "ยังไม่ได้ระบุหมู่เลือด"}`,
    },
    {
      label: "สิทธิการรักษา",
      data: `${data.user.medicalCoverage || "ยังไม่ได้ระบุสิทธิการรักษา"}`,
    },
    {
      label: "โรคประจำตัว",
      data: `${data.user.chronicDisease || "ยังไม่ได้ระบุโรคประจำตัว"}`,
    },
    {
      label: "แพ้อาหาร",
      data: `${data.user.foodAllergic || "ยังไม่ได้ระบุแพ้อาหาร"}`,
    },
    {
      label: "แพ้ยา",
      data: `${data.user.drugAllergic || "ยังไม่ได้ระบุแพ้ยา"}`,
    },
    {
      label: "ข้อมูลสำหรับติดต่อ",
      data: "",
      isHeader: true,
    },
    {
      label: "มือถือ",
      data: `${data.user.telephone || "ยังไม่ได้ระบุมือถือ"}`,
    },
    {
      label: "อีเมล",
      data: `${data.user.email?.toLowerCase() || "ยังไม่ได้ระบุอีเมล"}`,
    },
    {
      label: "ที่อยู่",
      data: `${data.user.address || "ยังไม่ได้ระบุที่อยู่"}`,
    },
    {
      label: "ข้อมูลผู้ปกครอง",
      data: "",
      isHeader: true,
    },
    {
      label: "ติดต่อผู้ปกครอง",
      data: `${data.user.parentPhone || "ยังไม่ได้ระบุติดต่อผู้ปกครอง"}`,
    },
    {
      label: "ชื่อผู้ปกครอง",
      data: `${data.user.parentFullname} (${data.user.parentRelation})`,
    },
    {
      label: "ข้อมูลเกี่ยวกับค่าย",
      data: "",
      isHeader: true,
    },
    {
      label: "ประเภทอาหาร",
      data: `${data.user.preferFood || "ยังไม่ได้ระบุประเภทอาหาร"}`,
    },
    {
      label: "สะดวกมาค่ายทุกวัน",
      data: `${data.user.everydayAttendance ? "✅" : "❌"}`,
    },
    {
      label: "สะดวกนำแลปท้อปมา",
      data: `${data.user.hasLaptop ? "✅" : "❌"}`,
    },
    {
      label: "วิธีการเดินทาง",
      data: `${data.user.travel || "ยังไม่ได้ระบุวิธีการเดินทาง"}`,
    },
  ];

  async function submitInfo(isCorrect: boolean) {
    if (!id) return;
    const [code] = await submitNongInfo({ userId: id.toString(), isCorrect });
    if (code == "success") {
      queryClient.setQueryData(["userInfoTabians", id], {
        ...tabiansData,
        info_status: "done",
        info: isCorrect,
      });
      toast.success("ตรวจสอบข้อมูลเรียบร้อย");
    }
  }

  return (
    <div className="mx-auto px-4 py-8">
      <Card className="mx-auto w-full max-w-7xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-bold md:text-3xl">
            <BackwardButton />
            {titleVal(data.user.title || "")}{" "}
            {data.user.fullname || "ยังไม่ได้ระบุชื่อเต็ม"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_2fr]">
            <div className="flex flex-col gap-6">
              <div className="border-border overflow-hidden rounded-lg border">
                {data.files.imgUrl.includes(".heic") ? (
                  <div className="bg-muted text-muted-foreground flex h-80 w-full flex-col items-center justify-center rounded-md p-6 text-center">
                    <p className="font-medium text-red-500">
                      ไม่สามารถแสดงรูป HEIC ได้
                    </p>
                    <Button
                      variant="link"
                      size="sm"
                      className="mt-3 gap-2"
                      asChild
                    >
                      <a
                        href={data.files.imgUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Download size={16} /> ดาวน์โหลดรูป
                      </a>
                    </Button>
                  </div>
                ) : (
                  <Image
                    style={{ width: "100%", height: "auto" }}
                    width={1000}
                    height={0}
                    src={data.files.imgUrl}
                    alt="ComCamp36Logo"
                    priority
                  />
                )}
              </div>

              <div className="border-border rounded-lg border p-4">
                <h3 className="mb-4 text-xl font-semibold">สถานะการสมัคร</h3>
                <div className="grid grid-cols-2 gap-3">
                  <StatusItem
                    label="ข้อมูลส่วนตัว"
                    isDone={data.user.infoDone}
                  />
                  <StatusItem
                    label="คำถามทะเบียน"
                    isDone={data.user.regisDone}
                  />
                  <StatusItem
                    label="คำถามวิชาการ"
                    isDone={data.user.academicDone}
                  />
                  <StatusItem
                    label="ส่งคำตอบ"
                    isDone={data.user.hasSubmitAnswer}
                  />
                  <div className="col-span-full">
                    <StatusItem label="ไฟล์" isDone={data.user.filesDone} />
                    <div className="mt-2 flex flex-wrap gap-2 pl-3">
                      {data.files.thaiIdUrl && (
                        <Badge variant="outline" className="hover:bg-accent">
                          <a
                            href={data.files.thaiIdUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1"
                          >
                            สำเนาบัตรประชาชน <ExternalLink size={12} />
                          </a>
                        </Badge>
                      )}
                      {data.files.parentFormUrl && (
                        <Badge variant="outline" className="hover:bg-accent">
                          <a
                            href={data.files.parentFormUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1"
                          >
                            เอกสารขออนุญาตผู้ปกครอง <ExternalLink size={12} />
                          </a>
                        </Badge>
                      )}
                      {data.files.p1Url && (
                        <Badge variant="outline" className="hover:bg-accent">
                          <a
                            href={data.files.p1Url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1"
                          >
                            ปพ.1 <ExternalLink size={12} />
                          </a>
                        </Badge>
                      )}
                      {data.files.p7Url && (
                        <Badge variant="outline" className="hover:bg-accent">
                          <a
                            href={data.files.p7Url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1"
                          >
                            ปพ.7 <ExternalLink size={12} />
                          </a>
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-border rounded-lg border p-4 md:p-6">
              <div className="space-y-6">
                {ApplicantInfo.map((item, index) => (
                  <Fragment key={index}>
                    {item.isHeader && index > 0 && (
                      <Separator className="my-4" />
                    )}
                    <ApplicantItems {...item} />
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col justify-center gap-4 border-t pt-6">
          <div>
            {tabiansData?.updatedAt_info && (
              <p>
                <span className="font-bold">ตรวจเมื่อ : </span>
                {formatThaiBuddhist(tabiansData.updatedAt_info)}
              </p>
            )}
          </div>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => submitInfo(true)}
              disabled={
                tabiansLoading ||
                (tabiansData?.info_status == "done" &&
                  tabiansData?.info == true)
              }
              variant="success"
              className="min-w-32"
              size="lg"
            >
              <CircleCheck className="!size-5" /> ข้อมูลถูกต้อง
            </Button>
            <Button
              onClick={() => submitInfo(false)}
              disabled={
                tabiansLoading ||
                (tabiansData?.info_status == "done" &&
                  !tabiansData?.info == true)
              }
              variant="destructive"
              className="min-w-32"
              size="lg"
            >
              <CircleX className="!size-5" /> ข้อมูลไม่ถูกต้อง
            </Button>
          </div>
          <BackwardButton />
        </CardFooter>
      </Card>
    </div>
  );
}

interface ApplicantItemsProps {
  label: string;
  data: string;
  isHeader?: boolean;
}

const ApplicantItems: React.FC<ApplicantItemsProps> = ({
  label,
  data,
  isHeader,
}) => {
  if (isHeader) {
    return <h2 className="text-xl font-bold not-first:pt-2">{label}</h2>;
  }

  return (
    <div className="grid grid-cols-[1fr_2fr] gap-4 text-sm md:text-base">
      <span className="text-muted-foreground font-medium">{label}:</span>
      <span className="text-foreground">{data}</span>
    </div>
  );
};

interface StatusItemProps {
  label: string;
  isDone: boolean;
}

const StatusItem: React.FC<StatusItemProps> = ({ label, isDone }) => (
  <div className="flex items-center gap-2">
    <span className="text-muted-foreground text-sm font-medium">{label}:</span>
    {isDone ? "✅" : "❌"}
  </div>
);

export default ApplicantPage;
