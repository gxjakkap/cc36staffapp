"use client";

import React from "react";
import Image from "next/image";
import { redirect, useParams } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useServerActionQuery } from "@/hook/server-action-hooks";

import { getConfirmInfo } from "./action";

export default function ConfirmIndividualPage() {
  const { id } = useParams();

  const { data, isLoading, error } = useServerActionQuery(getConfirmInfo, {
    input: { id: id ? id.toString() : null },
    queryKey: ["confirmInfo", id],
  });

  if (!id) {
    return redirect("/confirm");
  }

  if (!isLoading && error) {
    return redirect("/confirm");
  }

  function formatTimestampThai(timestamp: string) {
    const thaiMonths = [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ];

    const [datePart, timePart] = timestamp.split(" ");

    const [yyyy, mm, dd] = datePart.split("-");
    const [hh, mi] = timePart.split(":");

    const thaiYear = parseInt(yyyy, 10) + 543;

    const thaiMonth = thaiMonths[parseInt(mm, 10) - 1];

    return `${parseInt(dd, 10)} ${thaiMonth} ${thaiYear} ${hh}:${mi}`;
  }

  return (
    <div className="flex w-screen justify-center">
      <div className="mt-10 flex flex-col items-center justify-center">
        <Card className="w-full p-5 md:w-[35rem]">
          <CardHeader>
            <CardTitle className="text-3xl">ใบเสร็จ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full">
              <Image
                style={{ width: "100%", height: "auto" }}
                width={1000}
                height={0}
                src={
                  data?.receipt_path
                    ? data.receipt_path
                    : "/placeholder_goose.png"
                }
                alt="ComCamp36Logo"
                priority
              />
            </div>
            <p className="mt-2 text-center text-xl font-bold">
              {data?.receipt_date ? formatTimestampThai(data.receipt_date) : ""}
            </p>
          </CardContent>
        </Card>
        <Card className="p-5">
          <CardHeader>
            <CardTitle className="text-3xl">ข้อมูลเพิ่มเติม</CardTitle>
          </CardHeader>
          <CardContent>
            <p>ชื่อเล่น: {data?.nickname}</p>
            <p>อาหาร: {data?.requestFood}</p>
            <p>มี Ipad ไหม: {data?.haveIpad}</p>
            <p>มี Mouse ไหม: {data?.haveMouse}</p>
            <p>ระบบปฏิบัติการ: {data?.osNotebook}</p>
            <p>การเดินทางมาค่าย: {data?.travel}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
