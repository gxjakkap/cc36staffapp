import { redirect } from "next/navigation";
import { getAcademicAnswer } from "@/app/(authed)/actions";
import getUserInfo from "@/app/(authed)/nong/[id]/action";
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

  const [userInfoData, userInfoError] = await getUserInfo({ id });

  if (!userInfoData || userInfoError) {
    return redirect("/wichakans");
  }

  const [academicAnswerData, academicAnswerError] = await getAcademicAnswer({
    userId: id,
  });

  if (!academicAnswerData || academicAnswerError) {
    return redirect("/wichakans");
  }

  return (
    <div className="p-6">
      <h1 className="font-bold text-4xl mb-4 text-center">
        คำถามจากฝ่ายวิชาการ
      </h1>
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full h-full border rounded-lg"
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
