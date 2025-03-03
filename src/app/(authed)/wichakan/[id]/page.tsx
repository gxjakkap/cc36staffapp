import { redirect } from "next/navigation";

import { getAcademicAnswer } from "@/app/(authed)/actions";
import { AnswerWrapper } from "@/components/answer-wrapper";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface AnswerAcademicPageProps {
  params: Promise<{ id: string }>;
}

export default async function AnswerAcademicPage({
  params,
}: AnswerAcademicPageProps) {
  const { id } = await params;

  const [academicAnswerData, academicAnswerError] = await getAcademicAnswer({
    userId: id,
  });

  if (!academicAnswerData || academicAnswerError) {
    return redirect("/wichakans");
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-center text-4xl font-bold">
        คำถามจากฝ่ายวิชาการ
      </h1>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full w-full rounded-lg border"
      >
        <ResizablePanel defaultSize={60}>
          <div className="flex items-center justify-center p-6">
            <AnswerWrapper
              type="academic"
              questions={{
                algoAnswer: "10 สหายในเงามืด",
                chessNotation: "อัศวินห่านห้าวหาญนักล่าแต้ม (notation)",
                chessScore: "อัศวินห่านห้าวหาญนักล่าแต้ม (score)",
              }}
              answers={academicAnswerData.answers}
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
