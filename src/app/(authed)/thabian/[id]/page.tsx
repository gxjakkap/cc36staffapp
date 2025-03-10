"use client";

import { redirect, useParams } from "next/navigation";
import { toast } from "sonner";

import { AnswerWrapper } from "@/components/answer-wrapper";
import Spinner from "@/components/spinner";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useServerActionQuery } from "@/hook/server-action-hooks";

import { getRegisAnswer, getUserTabians, submitScoreTabians } from "./action";
import { ScoreFieldEnum } from "./enum";
import TabianForm from "./form";

export default function AnswerRegisPage() {
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

  async function submitScore(score: number, field: ScoreFieldEnum) {
    if (!id) return;
    const [code] = await submitScoreTabians({
      userId: id.toString(),
      score,
      field,
    });
    if (code == "success") {
      toast.success("ส่งคะแนนเรียบร้อยแล้ว!");
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
                    "3. หากน้องและทีมจำนวน 5 คน กำลังอยู่บนยานอวกาศที่ติดอยู่ในวงโคจรของดาวเคราะห์ดวงหนึ่ง...",
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
              score1_user1: tabiansData?.score1_user1
                ? tabiansData.score1_user1.toString()
                : "",
              score1_user2: tabiansData?.score1_user2
                ? tabiansData.score1_user2.toString()
                : "",
              score2_user1: tabiansData?.score2_user1
                ? tabiansData.score2_user1.toString()
                : "",
              score2_user2: tabiansData?.score2_user2
                ? tabiansData.score2_user2.toString()
                : "",
              score3_user1: tabiansData?.score3_user1
                ? tabiansData.score3_user1.toString()
                : "",
              score3_user2: tabiansData?.score3_user2
                ? tabiansData.score3_user2.toString()
                : "",
              score4_user1: tabiansData?.score4_user1
                ? tabiansData.score4_user1.toString()
                : "",
              score4_user2: tabiansData?.score4_user2
                ? tabiansData.score4_user2.toString()
                : "",
              score5_user1: tabiansData?.score5_user1
                ? tabiansData.score5_user1.toString()
                : "",
              score5_user2: tabiansData?.score5_user2
                ? tabiansData.score5_user2.toString()
                : "",
              score6_1_user1: tabiansData?.score6_1_user1
                ? tabiansData.score6_1_user1.toString()
                : "",
              score6_1_user2: tabiansData?.score6_1_user2
                ? tabiansData.score6_1_user2.toString()
                : "",
              score6_2_user1: tabiansData?.score6_2_user1
                ? tabiansData.score6_2_user1.toString()
                : "",
              score6_2_user2: tabiansData?.score6_2_user1
                ? tabiansData.score6_2_user1.toString()
                : "",
            }}
            submitScore={submitScore}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
