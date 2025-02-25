/* eslint-disable @next/next/no-img-element */

import { Prompt } from "next/font/google";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { file, user } from "@/db/schema";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { eq } from "drizzle-orm";
import { Check, Cross } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

const promptReg = Prompt({
  weight: "400",
  subsets: ["latin", "thai"],
});

const promptMed = Prompt({
  weight: "500",
  subsets: ["latin", "thai"],
});

const promptBold = Prompt({
  weight: "700",
  subsets: ["latin", "thai"],
});

const formatDateString = (date: number) => {
  const epdate = new Date(date);
  return epdate.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const genderVal = (val: string) => {
  return val === "man" ? "ชาย" : "หญิง";
};

const titleVal = (title: string) => {
  switch (title) {
    case "miss":
      return "นางสาว";
    case "mrs":
      return "นาง";
    case "mr":
      return "นาย";
    case "master":
      return "เด็กชาย";
    case "miss_young":
      return "เด็กหญิง";
    default:
      return title;
  }
};

const S3 = new S3Client({
  region: `${process.env.S3_REGION}`,
  endpoint: `${process.env.S3_ENDPOINT}`,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY || "",
    secretAccessKey: process.env.S3_SECRET_KEY || "",
  },
});

async function getPresignedURL(filePath: string) {
  const url = await getSignedUrl(
    S3,
    new GetObjectCommand({
      Bucket: `${process.env.S3_BUCKET}`,
      Key: `${filePath}`,
    }),
    { expiresIn: 3600 },
  );
  return url;
}

export default async function StudentProfilePage({ params }: Props) {
  const { id } = await params;
  const dataArr = await db
    .select()
    .from(user)
    .leftJoin(file, eq(file.userId, user.id))
    .where(eq(user.id, id))
    .limit(1);
  if (dataArr.length < 1) {
    notFound();
  }
  const data = dataArr[0].User;
  console.log(data);
  const files = dataArr[0].File;
  console.log(files);
  const imgUrl =
    files && files.facePhotoFilepath
      ? await getPresignedURL(files.facePhotoFilepath)
      : "/placeholder_goose.png";
  const thaiIdUrl =
    files && files.thaiNationalidCopyFilepath
      ? await getPresignedURL(files.thaiNationalidCopyFilepath)
      : "";
  const parentFormUrl =
    files && files.parentPermissionFilepath
      ? await getPresignedURL(files.parentPermissionFilepath)
      : "";
  const p1Url =
    files && files.p1Filepath ? await getPresignedURL(files.p1Filepath) : "";
  const p7Url =
    files && files.p7Filepath ? await getPresignedURL(files.p7Filepath) : "";
  return (
    <div
      className={`${promptReg.className} bg-neutral-100 mx-auto flex flex-col gap-y-3 pb-14 mt-20 lg:w-1/2`}
    >
      <div className="flex flex-col lg:gap-y-1 text-center lg:text-left">
        <h1
          className={`${promptMed.className} text-[1.875rem] lg:text-4xl text-zinc-900`}
        >
          {titleVal(data.title || "")}
          {data.fullname}
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-x-20">
        <div className="mx-auto lg:mx-0">
          <div className="w-[250px] aspect-[4/5] overflow-hidden rounded-md">
            <img
              className="object-cover w-full h-full"
              src={imgUrl}
              alt={`${data.fullname}'s portrait`}
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-8 text-center lg:text-left mt-4 lg:mt-0">
          <div className="flex flex-col">
            <p className={`${promptReg.className} text-gray-700 text-xl`}>
              <span className={`${promptMed.className}`}>อายุ: </span>
              {data.age}
            </p>
            <p className={`${promptReg.className} text-gray-700 text-xl`}>
              <span className={`${promptMed.className}`}>วันเกิด: </span>
              {formatDateString(new Date(data.birth || 0).getTime())}
            </p>
            <p className={`${promptReg.className} text-gray-700 text-xl`}>
              <span className={`${promptMed.className}`}>เพศ: </span>
              {data.gender ? genderVal(data.gender) : "undefined"}
            </p>
            <p className={`${promptReg.className} text-gray-700 text-xl`}>
              <span className={`${promptMed.className}`}>ชั้นการศึกษา: </span>
              {data.graduation}
            </p>
            <p className={`${promptReg.className} text-gray-700 text-xl`}>
              <span className={`${promptMed.className}`}>สายการเรียน: </span>
              {data.course}
            </p>
            <p className={`${promptReg.className} text-gray-700 text-xl`}>
              <span className={`${promptMed.className}`}>โรงเรียน: </span>
              {data.school}
            </p>
          </div>
          <div className="flex flex-col">
            <p className={`${promptBold.className} text-gray-700 text-xl`}>
              Medical🩸
            </p>
            <p className={`${promptReg.className} text-gray-700 text-xl`}>
              <span className={`${promptMed.className}`}>หมู่เลือด: </span>
              {data.bloodGroup?.toUpperCase()}
            </p>
            <p className={`${promptReg.className} text-gray-700 text-xl`}>
              <span className={`${promptMed.className}`}>สิทธิการรักษา: </span>
              {data.medicalCoverage}
            </p>
            <p className={`${promptReg.className} text-gray-700 text-xl`}>
              <span className={`${promptMed.className}`}>โรคประจำตัว: </span>
              {data.chronicDisease}
            </p>
            <p className={`${promptReg.className} text-gray-700 text-xl`}>
              <span className={`${promptMed.className}`}>แพ้อาหาร: </span>
              {data.foodAllergic}
            </p>
            <p className={`${promptReg.className} text-gray-700 text-xl`}>
              <span className={`${promptMed.className}`}>แพ้ยา: </span>
              {data.drugAllergic}
            </p>
          </div>
          <div className="flex flex-col">
            <p className={`${promptBold.className} text-gray-700 text-xl`}>
              Contact Info📱
            </p>
            <p className={`${promptReg.className} text-gray-700 text-xl`}>
              <span className={`${promptMed.className}`}>มือถือ: </span>
              {data.telephone}
            </p>
            <p className={`${promptReg.className} text-gray-700 text-xl`}>
              <span className={`${promptMed.className}`}>อีเมล: </span>
              <a
                href={`mailto:${data.email}`}
                className="hover:underline hover:text-blue-500"
              >
                {data.email?.toLowerCase()}
              </a>
            </p>
            <p
              className={`${promptReg.className} text-gray-700 text-xl gap-x-2`}
            >
              <span className={`${promptMed.className}`}>ที่อยู่: </span>
              <p className="break-words">{data.address}</p>
            </p>
          </div>
          <div className="flex flex-col">
            <p className={`${promptBold.className} text-gray-700 text-xl`}>
              Emergency Contact🆘
            </p>
            <p className={`${promptReg.className} text-gray-700 text-xl`}>
              <span className={`${promptMed.className}`}>
                ติดต่อผู้ปกครอง:{" "}
              </span>
              {data.parentPhone}
            </p>
            <p className={`${promptReg.className} text-gray-700 text-xl`}>
              <span className={`${promptMed.className}`}>ชื่อ: </span>
              {data.parentFullname} ({data.parentRelation})
            </p>
          </div>
          <div className="flex flex-col">
            <p className={`${promptBold.className} text-gray-700 text-xl`}>
              ข้อมูลเพิ่มเติม
            </p>
            <p className={`${promptReg.className} text-gray-700 text-xl`}>
              <span className={`${promptMed.className}`}>ประเภทอาหาร: </span>
              {data.preferFood}
            </p>
            <p className={`${promptReg.className} text-gray-700 text-xl`}>
              <span className={`${promptMed.className}`}>
                สะดวกมาค่ายทุกวัน:{" "}
              </span>
              {data.everydayAttendance ? "✅" : "❌"}
            </p>
            <p className={`${promptReg.className} text-gray-700 text-xl`}>
              <span className={`${promptMed.className}`}>
                สะดวกนำแลปท้อปมา:{" "}
              </span>
              {data.hasLaptop ? "✅" : "❌"}
            </p>
            <p className={`${promptReg.className} text-gray-700 text-xl`}>
              <span className={`${promptMed.className}`}>วิธีการเดินทาง: </span>
              {data.travel}
            </p>
          </div>
          <div className="flex flex-col">
            <p className={`${promptBold.className} text-gray-700 text-xl`}>
              ไฟล์
            </p>
            <p className={`${promptReg.className} text-gray-700 text-xl`}>
              <span className={`${promptMed.className}`}>ปพ.1: </span>
              {p1Url.length > 0 ? (
                <a
                  href={`${p1Url}`}
                  target="_blank"
                  rel="noopener,noreferrer"
                  className="underline hover:text-blue-500"
                >
                  View
                </a>
              ) : (
                "บ๋อแบ๋"
              )}
            </p>
            <p className={`${promptReg.className} text-gray-700 text-xl`}>
              <span className={`${promptMed.className}`}>ปพ.7: </span>
              {p7Url.length > 0 ? (
                <a
                  href={`${p7Url}`}
                  target="_blank"
                  rel="noopener,noreferrer"
                  className="underline hover:text-blue-500"
                >
                  View
                </a>
              ) : (
                "บ๋อแบ๋"
              )}
            </p>
            <p className={`${promptReg.className} text-gray-700 text-xl`}>
              <span className={`${promptMed.className}`}>
                เอกสารขออนุญาตผู้ปกครอง:{" "}
              </span>
              {parentFormUrl.length > 0 ? (
                <a
                  href={`${parentFormUrl}`}
                  target="_blank"
                  rel="noopener,noreferrer"
                  className="underline hover:text-blue-500"
                >
                  View
                </a>
              ) : (
                "บ๋อแบ๋"
              )}
            </p>
            <p className={`${promptReg.className} text-gray-700 text-xl`}>
              <span className={`${promptMed.className}`}>
                สำเนาบัตรประชาชน:{" "}
              </span>
              {thaiIdUrl.length > 0 ? (
                <a
                  href={`${thaiIdUrl}`}
                  target="_blank"
                  rel="noopener,noreferrer"
                  className="underline hover:text-blue-500"
                >
                  View
                </a>
              ) : (
                "บ๋อแบ๋"
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
