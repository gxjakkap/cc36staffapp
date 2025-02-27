import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { formatDateString, genderVal, titleVal } from "@/lib/formatter";

import getUserInfo from "./action";

interface ApplicantPageProps {
  params: Promise<{ id: string }>;
}

async function ApplicantPage({ params }: ApplicantPageProps) {
  const [data, error] = await getUserInfo({
    id: (await params).id,
  });

  if (!data || error) {
    return null;
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

  return (
    <div className="py-12 max-w-screen w-full flex justify-center">
      <Card className="max-w-[80rem] w-full">
        <CardContent className="grid grid-cols-[1fr_2fr] gap-4">
          <div className="flex justify-center w-[25rem] h-fit flex-col">
            <div className="text-3xl font-bold">
              {titleVal(data.user.title || "")}
              {data.user.fullname || "ยังไม่ได้ระบุชื่อเต็ม"}
            </div>
            <Image
              style={{ width: "100%", height: "auto" }}
              width={1000}
              height={0}
              src={data.files.imgUrl}
              alt="ComCamp36Logo"
              priority
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-[auto_auto]">
                <span className="flex items-center gap-1">
                  <span className="font-bold text-foreground/80">
                    ข้อมูลส่วนตัว:
                  </span>
                  {data.user.infoDone ? "✅" : "❌"}
                </span>
                <span className="flex items-center gap-1">
                  <span className="font-bold text-foreground/80">
                    คำถามทะเบียน:
                  </span>
                  {data.user.regisDone ? "✅" : "❌"}
                </span>
                <span className="flex items-center gap-1">
                  <span className="font-bold text-foreground/80">
                    คำถามวิชาการ:
                  </span>
                  {data.user.academicDone ? "✅" : "❌"}
                </span>
                <span className="flex items-center gap-1">
                  <span className="font-bold text-foreground/80">ไฟล์:</span>
                  {data.user.filesDone ? "✅" : "❌"}
                </span>
                <span className="flex items-center gap-1">
                  <span className="font-bold text-foreground/80">
                    ส่งคำตอบ:
                  </span>
                  {data.user.hasSubmitAnswer ? "✅" : "❌"}
                </span>
              </div>
            </div>
            {ApplicantInfo.map((item, index) => (
              <ApplicantItems key={index} {...item} />
            ))}
          </div>
        </CardContent>
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
    return <h2 className="text-xl font-bold pt-4">{label}</h2>;
  }

  return (
    <div className="grid w-full grid-cols-[1fr_3fr] gap-4 text-lg text-foreground/80">
      <span className="font-semibold text-foreground/60">{label}</span>
      <span className="text-foreground/60">{data}</span>
    </div>
  );
};

export default ApplicantPage;
