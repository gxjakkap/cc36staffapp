"use client";

import { redirect, useParams } from "next/navigation";
import { z } from "zod";

import { getRegisAnswer } from "@/app/(authed)/actions";
import { AnswerWrapper } from "@/components/answer-wrapper";
import Spinner from "@/components/spinner";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useServerActionQuery } from "@/hook/server-action-hooks";

import { getUserTabians } from "./action";
import TabianForm, { formSchema } from "./form";

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

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
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
                  answer3: "คำถามที่ 3",
                  answer4: "คำถามที่ 4",
                  answer5: "คำถามที่ 5",
                  answer61: "คำถามที่ 6.1",
                  answer62: "คำถามที่ 6.2",
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
            onSubmit={onSubmit}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
