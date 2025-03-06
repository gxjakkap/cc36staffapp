"use client";

import { redirect, useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

import { getRegisAnswer } from "@/app/(authed)/actions";
import { AnswerWrapper } from "@/components/answer-wrapper";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useServerActionQuery } from "@/hook/server-action-hooks";
import { authClient } from "@/lib/auth-client";

import { getUserTabians, lockTabian, submitScoreTabians } from "./action";
import TabianForm, { formSchema } from "./form";

export default function AnswerRegisPage() {
  const { data } = authClient.useSession();
  const queryClient = useQueryClient();

  const { id } = useParams();
  const {
    data: tabiansData,
    error: tabiansError,
    isLoading: tabiansLoading,
  } = useServerActionQuery(getUserTabians, {
    queryKey: ["userTabians", id],
    input: { id: id ? id.toString() : null },
  });

  const {
    data: regisAnswerData,
    error: regisAnswerError,
    isLoading: regisAnswerLoading,
  } = useServerActionQuery(getRegisAnswer, {
    queryKey: ["regisAnswer", id],
    input: { userId: id ? id.toString() : null },
  });

  if (!id) {
    return null;
  }

  if (!tabiansLoading && tabiansError) {
    return redirect("/thabians");
  }

  if (!regisAnswerLoading && regisAnswerError) {
    return redirect("/thabians");
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!id) return;

    const [code] = await submitScoreTabians({
      userId: id.toString(),
      score1: parseInt(data.score1),
      score2: parseInt(data.score2),
      score3: parseInt(data.score3),
      score4: parseInt(data.score4),
      score5: parseInt(data.score5),
      score6_1: parseInt(data.score6_1),
      score6_2: parseInt(data.score6_2),
    });
    if (code == "This has lock by other user") {
      queryClient.invalidateQueries({ queryKey: ["userTabians", id] });
      return toast.error("ใบสมัครนี้ถูกตรวจสอบโดยคนอื่นแล้ว");
    }
    if (code == "success") {
      queryClient.setQueryData(["userTabians", id], {
        ...tabiansData,
        score1: parseInt(data.score1),
        score2: parseInt(data.score2),
        score3: parseInt(data.score3),
        score4: parseInt(data.score4),
        score5: parseInt(data.score5),
        score6_1: parseInt(data.score6_1),
        score6_2: parseInt(data.score6_2),
        status: "done",
      });
      toast.success("ส่งคะแนนสำเร็จเรียบแล้ว!");
    }
  }

  async function lock() {
    if (!id || !data?.user.username) return;

    if (tabiansData?.status == "lock") {
      const [code] = await lockTabian({
        userId: id.toString(),
        status: "unlock",
      });
      if (code == "success")
        queryClient.setQueryData(["userTabians", id], {
          ...tabiansData,
          status: "unlock",
        });
    } else {
      const [code] = await lockTabian({
        userId: id.toString(),
        status: "lock",
      });
      if (code == "This has lock by other user") {
        queryClient.invalidateQueries({ queryKey: ["userTabians", id] });
        return toast.error("ใบสมัครนี้ถูกตรวจสอบโดยคนอื่นแล้ว");
      }
      if (code == "success")
        queryClient.setQueryData(["userTabians", id], {
          ...tabiansData,
          staffUsername: data.user.username,
          status: "lock",
        });
    }
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-center text-4xl font-bold">
        คำถามจากฝ่ายทะเบียน
      </h1>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full w-full rounded-lg border"
      >
        <div className="absolute flex items-center p-2">
          <p>
            Status:{" "}
            <span
              className={
                tabiansData?.status == "lock"
                  ? "text-yellow-500"
                  : tabiansData?.status == "done"
                    ? "text-green-500"
                    : "text-orange-500"
              }
            >
              {tabiansData?.status}
            </span>
          </p>
          {tabiansData?.status == "lock" && (
            <p className="ml-2">
              Lock by:{" "}
              <span className="font-bold">{tabiansData.staffUsername}</span>
            </p>
          )}
          <div className="ml-2">
              <Button
                disabled={
                  tabiansLoading ||
                  (tabiansData?.status == "lock" &&
                    tabiansData?.staffUsername != null &&
                    tabiansData?.staffUsername != data?.user.username)
                }
                onClick={lock}
                className="cursor-pointer"
              >
                {tabiansData?.status == "lock" ? "unlock" : "lock"}
              </Button>
          </div>
        </div>
        <ResizablePanel defaultSize={60}>
          <div className="flex items-center justify-center p-6">
            {regisAnswerData ? (
              <AnswerWrapper
                type="regis"
                questions={{
                  answer1: "1. น้องคาดหวังอะไรจากค่าย ComCamp36",
                  answer2:
                    "2. ในยุคที่ AI และหุ่นยนต์สามารถทำงานแทนมนุษย์ได้มากขึ้น น้องคิดว่าวิศวกรคอมพิวเตอร์ยังมีความสำคัญอย่างไร?",
                  answer3:
                    "3. หากน้องและทีมจำนวน 5 คน กำลังอยู่บนยานอวกาศที่ติดอยู่ในวงโคจรของดาวเคราะห์ดวงหนึ่ง ยานน้องได้รับความเสียหายจากอุกกาบาตที่ชนเข้ามา ระบบอื่น ๆ ของยานได้รับความเสียหายเล็กน้อย แต่ระบบกรองน้ำของยานเสียหายมาก น้ำสะอาดที่เหลือมีเพียง 40 ลิตร ทีมของคุณต้องอยู่รอดให้ได้อีก 60 วันก่อนที่ทีมกู้ภัยจากโลกจะมาถึง จงระบุปัญหาทั้งหมดที่เกิดขึ้น พร้อมเสนอแนวทางการแก้ปัญหาและอธิบายหลักการมาพอสังเขป",
                  answer4:
                    "4. หากในค่ายมี Group Project แล้วน้องได้อยู่ในกลุ่มที่มีคนไม่ค่อยทำงาน นิ่งเฉย หรือทิ้งงาน น้องจะจัดการกับปัญหานี้อย่างไร?",
                  answer5:
                    "5. ถ้าต้องสอนเด็ก 7 ขวบให้เข้าใจว่า Algorithm คืออะไร โดยห้ามใช้คำศัพท์เทคนิค จะอธิบายอย่างไร?",
                  answer61:
                    "6.1 หากน้องสามารถพัฒนานวัตกรรมเพื่อช่วยแก้ปัญหาสังคมนี้ได้หนึ่งอย่าง น้องจะเลือกพัฒนาอะไร?",
                  answer62: "6.2 จงอธิบายการทำงานของนวัตกรรมนี้",
                }}
                answers={regisAnswerData.answers}
              />
            ) : (
              <Spinner />
            )}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={40}>
          <TabianForm
            data={{
              score1: tabiansData?.score1 ? tabiansData.score1.toString() : "",
              score2: tabiansData?.score2 ? tabiansData.score2.toString() : "",
              score3: tabiansData?.score3 ? tabiansData.score3.toString() : "",
              score4: tabiansData?.score4 ? tabiansData.score4.toString() : "",
              score5: tabiansData?.score5 ? tabiansData.score5.toString() : "",
              score6_1: tabiansData?.score6_1
                ? tabiansData.score6_1.toString()
                : "",
              score6_2: tabiansData?.score6_2
                ? tabiansData.score6_2.toString()
                : "",
            }}
            status={
              tabiansData?.status
                ? (tabiansData.status as "lock" | "unlock" | "done")
                : "unlock"
            }
            isSameUser={data?.user.username == tabiansData?.staffUsername}
            onSubmit={onSubmit}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
