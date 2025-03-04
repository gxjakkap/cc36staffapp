import { redirect } from "next/navigation";

import { getRegisAnswer } from "@/app/(authed)/actions";
import getUserInfo from "@/app/(authed)/nong/[id]/action";
import { AnswerWrapper } from "@/components/answer-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { submitTabian } from "./action";

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
          <form action={submitTabian} className="p-5">
            <div>
              <p>
                1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Nemo quasi aut et voluptates quia eum fugit perferendis
                reprehenderit nobis quaerat laborum quas dignissimos alias ipsam
                velit dolor, voluptatem error quidem?
              </p>
              <Input
                name="score1"
                min={0}
                type="number"
                placeholder="กรอกคะแนน 1"
              ></Input>
            </div>
            <div className="mt-5">
              <p>
                2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Nemo quasi aut et voluptates quia eum fugit perferendis
                reprehenderit nobis quaerat laborum quas dignissimos alias ipsam
                velit dolor, voluptatem error quidem?
              </p>
              <Input
                name="score2"
                min={0}
                type="number"
                placeholder="กรอกคะแนน 2"
              ></Input>
            </div>
            <div className="mt-5">
              <p>
                3. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Nemo quasi aut et voluptates quia eum fugit perferendis
                reprehenderit nobis quaerat laborum quas dignissimos alias ipsam
                velit dolor, voluptatem error quidem?
              </p>
              <Input
                name="score3"
                min={0}
                type="number"
                placeholder="กรอกคะแนน 3"
              ></Input>
            </div>
            <div className="mt-5">
              <p>
                4. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Nemo quasi aut et voluptates quia eum fugit perferendis
                reprehenderit nobis quaerat laborum quas dignissimos alias ipsam
                velit dolor, voluptatem error quidem?
              </p>
              <Input
                name="score4"
                min={0}
                type="number"
                placeholder="กรอกคะแนน 4"
              ></Input>
            </div>
            <div className="mt-5">
              <p>
                5. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Nemo quasi aut et voluptates quia eum fugit perferendis
                reprehenderit nobis quaerat laborum quas dignissimos alias ipsam
                velit dolor, voluptatem error quidem?
              </p>
              <Input
                name="score5"
                min={0}
                type="number"
                placeholder="กรอกคะแนน 5"
              ></Input>
            </div>
            <div className="mt-5">
              <p>
                6.1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Nemo quasi aut et voluptates quia eum fugit perferendis
                reprehenderit nobis quaerat laborum quas dignissimos alias ipsam
                velit dolor, voluptatem error quidem?
              </p>
              <Input
                name="score6_1"
                min={0}
                type="number"
                placeholder="กรอกคะแนน 6.1"
              ></Input>
            </div>
            <div className="mt-5">
              <p>
                6.2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Nemo quasi aut et voluptates quia eum fugit perferendis
                reprehenderit nobis quaerat laborum quas dignissimos alias ipsam
                velit dolor, voluptatem error quidem?
              </p>
              <Input
                name="score6_2"
                min={0}
                type="number"
                placeholder="กรอกคะแนน 6.2"
              ></Input>
            </div>
            <div className="mt-5 flex items-center justify-center">
              <Button type="submit" className="cursor-pointer">
                Submit
              </Button>
            </div>
          </form>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
