"use client";

import Image from "next/image";
import { redirect, useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useServerActionQuery } from "@/hook/server-action-hooks";
import { formatDateString, genderVal, titleVal } from "@/lib/formatter";

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
    <div className="flex w-full max-w-screen justify-center py-12">
      <Card className="w-full max-w-[80rem]">
        <CardContent className="grid grid-cols-[1fr_2fr] gap-4">
          <div className="flex h-fit w-[25rem] flex-col justify-center">
            <div className="text-3xl font-bold">
              {titleVal(data.user.title || "")}
              {data.user.fullname || "ยังไม่ได้ระบุชื่อเต็ม"}
            </div>
            {data.files.imgUrl.includes(".heic") ? (
              <div className="bg-muted text-muted-foreground flex h-80 w-full flex-col items-center justify-center p-4 text-center">
                <p className="text-red-500">ไม่สามารถแสดงรูป HEIC ได้</p>
                <a
                  href={data.files.imgUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 text-blue-500 hover:underline"
                >
                  Download เพื่อดูรูป
                </a>
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
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-[auto_auto] gap-2">
                <span className="flex items-center gap-1">
                  <span className="text-foreground/80 font-bold">
                    ข้อมูลส่วนตัว:
                  </span>
                  {data.user.infoDone ? "✅" : "❌"}
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-foreground/80 font-bold">
                    คำถามทะเบียน:
                  </span>
                  {data.user.regisDone ? "✅" : "❌"}
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-foreground/80 font-bold">
                    คำถามวิชาการ:
                  </span>
                  {data.user.academicDone ? "✅" : "❌"}
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-foreground/80 font-bold">
                    ส่งคำตอบ:
                  </span>
                  {data.user.hasSubmitAnswer ? "✅" : "❌"}
                </span>
                <span className="col-span-2 flex items-center gap-2">
                  <span className="text-foreground/80 font-bold">ไฟล์:</span>
                  {data.user.filesDone ? "✅" : "❌"}
                  <div className="ml-1 flex flex-wrap gap-2">
                    {data.files.thaiIdUrl && (
                      <a
                        href={data.files.thaiIdUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-accent-foreground hover:text-accent-foreground/80 bg-accent rounded px-2 py-1 underline transition-colors"
                      >
                        สำเนาบัตรประชาชน
                      </a>
                    )}
                    {data.files.parentFormUrl && (
                      <a
                        href={data.files.parentFormUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-accent-foreground hover:text-accent-foreground/80 bg-accent rounded px-2 py-1 underline transition-colors"
                      >
                        เอกสารขออนุญาตผู้ปกครอง
                      </a>
                    )}
                    {data.files.p1Url && (
                      <a
                        href={data.files.p1Url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-accent-foreground hover:text-accent-foreground/80 bg-accent rounded px-2 py-1 underline transition-colors"
                      >
                        ปพ.1
                      </a>
                    )}
                    {data.files.p7Url && (
                      <a
                        href={data.files.p7Url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-accent-foreground hover:text-accent-foreground/80 bg-accent rounded px-2 py-1 underline transition-colors"
                      >
                        ปพ.7
                      </a>
                    )}
                  </div>
                </span>
              </div>
            </div>
            {ApplicantInfo.map((item, index) => (
              <ApplicantItems key={index} {...item} />
            ))}
          </div>
        </CardContent>
        <div className="flex justify-center">
          <Button
            onClick={() => submitInfo(true)}
            disabled={
              tabiansLoading ||
              (tabiansData?.info_status == "done" && tabiansData?.info == true)
            }
            className="cursor-pointer bg-green-500 text-white"
          >
            ถูกต้อง
          </Button>
          <Button
            onClick={() => submitInfo(false)}
            disabled={
              tabiansLoading ||
              (tabiansData?.info_status == "done" && !tabiansData?.info == true)
            }
            className="ml-2 cursor-pointer bg-red-500 text-white"
          >
            ไม่ถูกต้อง
          </Button>
        </div>
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
    return <h2 className="pt-4 text-xl font-bold">{label}</h2>;
  }

  return (
    <div className="text-foreground/80 grid w-full grid-cols-[1fr_3fr] gap-4 text-lg">
      <span className="text-foreground/60 font-semibold">{label}</span>
      <span className="text-foreground/60">{data}</span>
    </div>
  );
};

export default ApplicantPage;
