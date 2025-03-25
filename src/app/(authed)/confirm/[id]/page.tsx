"use client";

import React, { Fragment, ReactNode } from "react";
import Image from "next/image";
import { redirect, useParams } from "next/navigation";

import SendButton from "@/app/(authed)/confirm/email/send-button";
import ConfirmStatusBadge, {
  ConfirmStatusKeys,
} from "@/app/(authed)/confirm/status-badge";
import BackwardButton from "@/components/backward-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useServerActionQuery } from "@/hook/server-action-hooks";

import TestButton from "../email/test-button";
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

  if (!data) {
    return null;
  }

  if (!isLoading && error) {
    return redirect("/confirm");
  }

  const ApplicantInfo: ApplicantItemsProps[] = [
    {
      label: "ข้อมูลส่วนตัว",
      data: "",
      isHeader: true,
    },
    {
      label: "ชื่อเล่น",
      data: `${data.nickname || ""}`,
    },
    {
      label: "ชื่อเต็ม",
      data: `${data.fullname || ""}`,
    },
    {
      label: "ประเภทอาหารที่ต้องการเป็นพิเศษ",
      data: `${data.requestFood || ""}`,
    },
    {
      label: "มี iPad",
      data: `${data.haveIpad ? "มี" : "ไม่มี"}`,
    },
    {
      label: "มีเมาส์",
      data: `${data.haveMouse ? "มี" : "ไม่มี"}`,
    },
    {
      label: "ระบบปฏิบัติการโน้ตบุ๊ก",
      data: `${data.osNotebook || ""}`,
    },
    {
      label: "การเดินทาง",
      data: `${data.travel || ""}`,
    },
  ];

  return (
    <div className="mx-auto px-4 py-8">
      <Card className="mx-auto w-full max-w-7xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-bold md:text-3xl">
            <BackwardButton />
            {data.fullname || "ยังไม่ได้ระบุชื่อเต็ม"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_2fr]">
            <div className="flex flex-col gap-6">
              <div className="border-border overflow-hidden rounded-lg border">
                {data.receipt_path != "" ? (
                  <Image
                    style={{ width: "100%", height: "auto" }}
                    width={1000}
                    height={0}
                    src={data.receipt_path}
                    alt="ComCamp36Logo"
                    priority
                  />
                ) : (
                  <div className="flex w-full items-center justify-center p-2">
                    ยังไม่ได้ส่งใบเสร็จ
                  </div>
                )}
              </div>
              <ApplicantItems
                data={data.receipt_date ?? ""}
                label="วัน/เวลาที่โอนเงิน"
              />
              <div className="border-border rounded-lg border p-4">
                <h3 className="mb-4 text-xl font-semibold">สถานการคัดเลือก</h3>
                <div className="grid grid-cols-2 gap-3">
                  <StatusItem
                    label="สถานะ"
                    status={
                      <ConfirmStatusBadge
                        status={data.status as ConfirmStatusKeys}
                      />
                    }
                  />
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

              <div className="flex w-full flex-col items-center justify-center gap-2 pt-10">
                <SendButton
                  email={data.email ?? ""}
                  fullname={data.fullname}
                  nickname={data.nickname}
                  disabled={
                    (!data.isSentEmail && data.status != "yes") ||
                    data.staffName != null
                  }
                  user_id={Array.isArray(id) ? id[0] : id}
                />
                {/** Manually replace the condition to render the button na kub */}
                {false && (
                  <TestButton
                    email={"delivered@resend.dev"}
                    fullname={data?.fullname ?? "Test"}
                    nickname={data?.nickname ?? "Nick"}
                    disabled={false}
                  />
                )}
                {data.staffName && `${data.staffName}`}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface StatusItemProps {
  label: string;
  status: ReactNode;
}

const StatusItem: React.FC<StatusItemProps> = ({ label, status }) => (
  <div className="flex items-center gap-2">
    <span className="text-muted-foreground text-sm font-medium">{label}:</span>
    {status}
  </div>
);

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
