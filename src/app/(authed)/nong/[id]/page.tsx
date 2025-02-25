/* eslint-disable @next/next/no-img-element */

import { notFound } from "next/navigation";
import { db } from "@/db";
import { file, user } from "@/db/schema";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { eq } from "drizzle-orm";

interface Props {
  params: Promise<{ id: string }>;
}

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
    <div className="bg-neutral-100 mx-auto flex flex-col gap-y-3 pb-14 mt-20 lg:w-1/2">
      <div className="flex flex-col lg:gap-y-1 text-center lg:text-left">
        <h1 className="font-medium text-[1.875rem] lg:text-4xl text-zinc-900">
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
            <p className="text-gray-700 text-xl">
              <span className="font-medium">อายุ: </span>
              {data.age}
            </p>
            <p className=" text-gray-700 text-xl">
              <span className="font-medium">วันเกิด: </span>
              {formatDateString(new Date(data.birth || 0).getTime())}
            </p>
            <p className="text-gray-700 text-xl">
              <span className="font-medium">เพศ: </span>
              {data.gender ? genderVal(data.gender) : "undefined"}
            </p>
            <p className="text-gray-700 text-xl">
              <span className="font-medium">ชั้นการศึกษา: </span>
              {data.graduation}
            </p>
            <p className="text-gray-700 text-xl">
              <span className="font-medium">สายการเรียน: </span>
              {data.course}
            </p>
            <p className="text-gray-700 text-xl">
              <span className="font-medium">โรงเรียน: </span>
              {data.school}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-700 text-xl font-bold">Medical🩸</p>
            <p className="text-gray-700 text-xl">
              <span className="font-medium">หมู่เลือด: </span>
              {data.bloodGroup?.toUpperCase()}
            </p>
            <p className="text-gray-700 text-xl">
              <span className="font-medium">สิทธิการรักษา: </span>
              {data.medicalCoverage}
            </p>
            <p className="text-gray-700 text-xl">
              <span className="font-medium">โรคประจำตัว: </span>
              {data.chronicDisease}
            </p>
            <p className="text-gray-700 text-xl">
              <span className="font-medium">แพ้อาหาร: </span>
              {data.foodAllergic}
            </p>
            <p className="text-gray-700 text-xl">
              <span className="font-medium">แพ้ยา: </span>
              {data.drugAllergic}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-700 text-xl font-bold">Contact Info📱</p>
            <p className="text-gray-700 text-xl">
              <span className="font-medium">มือถือ: </span>
              {data.telephone}
            </p>
            <p className="text-gray-700 text-xl">
              <span className="font-medium">อีเมล: </span>
              <a
                href={`mailto:${data.email}`}
                className="hover:underline hover:text-blue-500"
              >
                {data.email?.toLowerCase()}
              </a>
            </p>
            <p className="text-gray-700 text-xl gap-x-2">
              <span className="font-medium">ที่อยู่: </span>
              <p className="break-words">{data.address}</p>
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-700 text-xl font-bold">
              Emergency Contact🆘
            </p>
            <p className="text-gray-700 text-xl">
              <span className="font-medium">ติดต่อผู้ปกครอง: </span>
              {data.parentPhone}
            </p>
            <p className="text-gray-700 text-xl">
              <span className="font-medium">ชื่อ: </span>
              {data.parentFullname} ({data.parentRelation})
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-700 text-xl font-bold">ข้อมูลเพิ่มเติม</p>
            <p className="text-gray-700 text-xl">
              <span className="font-medium">ประเภทอาหาร: </span>
              {data.preferFood}
            </p>
            <p className="text-gray-700 text-xl">
              <span className="font-medium">สะดวกมาค่ายทุกวัน: </span>
              {data.everydayAttendance ? "✅" : "❌"}
            </p>
            <p className="text-gray-700 text-xl">
              <span className="font-medium">สะดวกนำแลปท้อปมา: </span>
              {data.hasLaptop ? "✅" : "❌"}
            </p>
            <p className="text-gray-700 text-xl">
              <span className="font-medium">วิธีการเดินทาง: </span>
              {data.travel}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-700 text-xl font-bold">ไฟล์</p>
            <p className="text-gray-700 text-xl">
              <span className="font-medium">ปพ.1: </span>
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
            <p className="text-gray-700 text-xl">
              <span className="font-medium">ปพ.7: </span>
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
            <p className="text-gray-700 text-xl">
              <span className="font-medium">เอกสารขออนุญาตผู้ปกครอง: </span>
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
            <p className="text-gray-700 text-xl">
              <span className="font-medium">สำเนาบัตรประชาชน: </span>
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
