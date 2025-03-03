import { redirect } from "next/navigation";

import { getRegisAnswer } from "@/app/(authed)/actions";
import getUserInfo from "@/app/(authed)/nong/[id]/action";
import { AnswerWrapper } from "@/components/answer-wrapper";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface AnswerRegisPageProps {
  params: Promise<{ id: string }>;
}

export default async function AnswerRegisPage({
  params,
}: AnswerRegisPageProps) {
  const { id } = await params;

  const [userInfoData, userInfoError] = await getUserInfo({ id });

  if (!userInfoData || userInfoError) {
    return redirect("/thabians");
  }

  const [regisAnswerData, regisAnswerError] = await getRegisAnswer({
    userId: id,
  });

  if (!regisAnswerData || regisAnswerError) {
    return redirect("/thabians");
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
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={40}>
          <div className="flex items-center justify-center p-6">
            เกณฑ์การให้คะแนน
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
