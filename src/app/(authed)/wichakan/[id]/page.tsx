"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronDownIcon } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { AnswerWrapper } from "@/components/answer-wrapper";
import BackwardButton from "@/components/backward-button";
import {
  InspectStatus,
  inspectStatusBadgeVariants,
  InspectStatusKeys,
} from "@/components/data-table/status-badge";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ViewControls } from "@/components/view-controls";
import { useServerActionQuery } from "@/hook/server-action-hooks";
import { authClient } from "@/lib/auth-client";
import {
  Plagiarism,
  plagiarismData as plagiarismJSONData,
} from "@/lib/plagiarism/plagiarism";
import { cn } from "@/lib/utils";

import {
  getAcademicAnswer,
  getUserWichakans,
  lockWichakarn,
  submitScoreAcademics,
} from "./action";
import WichakanForm, { formSchema } from "./form";

export default function AnswerAcademicPage() {
  const { data } = authClient.useSession();
  const queryClient = useQueryClient();

  const { id } = useParams();

  const [openPlagiarism, setOpenPlagiarism] = useState({
    answer1: false,
    answer2: false,
    answer3: false,
  });
  const [plagiarism, setPlagiarism] = useState<Plagiarism | null>(null);
  useEffect(() => {
    const data = plagiarismJSONData.find((obj) => obj.userId == id);
    setPlagiarism(data ? data : null);
  }, [id]);

  const {
    data: wichakansData,
    error: wichakansError,
    isLoading: wichakansLoading,
  } = useServerActionQuery(getUserWichakans, {
    queryKey: ["userWichakans", id],
    input: { id: id ? id.toString() : null },
  });

  const {
    data: academicAnswerData,
    error: academicAnswerError,
    isLoading: academicAnswerLoading,
  } = useServerActionQuery(getAcademicAnswer, {
    queryKey: ["academicAnswer", id],
    input: { userId: id ? id.toString() : null },
  });

  if (!id) {
    return null;
  }

  if (!academicAnswerLoading && academicAnswerError) {
    return redirect("/wichakans");
  }

  if (!wichakansLoading && wichakansError) {
    return redirect("/wichakans");
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!id) return;

    const [code] = await submitScoreAcademics({
      userId: id.toString(),
      scoreChess: parseInt(data.scoreChess),
      scoreAcademic: parseInt(data.scoreAcademic),
    });

    if (code == "This has lock by other user") {
      queryClient.invalidateQueries({ queryKey: ["userWichakans", id] });
      return toast.error("ใบสมัครนี้ถูกตรวจสอบโดยคนอื่นแล้ว");
    }

    if (code == "success") {
      queryClient.setQueryData(["userWichakans", id], {
        ...wichakansData,
        scoreChess: parseInt(data.scoreChess),
        scoreAcademic: parseInt(data.scoreAcademic),
        status: InspectStatus["DONE"],
      });
      toast.success("ส่งคะแนนสำเร็จเรียบแล้ว!");
    }
  }

  async function lock() {
    if (!id || !data?.user.username) return;

    if (wichakansData?.status == InspectStatus["LOCK"]) {
      const [code] = await lockWichakarn({
        userId: id.toString(),
        status: InspectStatus["UNLOCK"],
      });
      if (code == "success")
        queryClient.setQueryData(["userWichakans", id], {
          ...wichakansData,
          status: InspectStatus["UNLOCK"],
        });
    } else {
      const [code] = await lockWichakarn({
        userId: id.toString(),
        status: InspectStatus["LOCK"],
      });
      if (code == "This has lock by other user") {
        queryClient.invalidateQueries({ queryKey: ["userWichakans", id] });
        return toast.error("ใบสมัครนี้ถูกตรวจสอบโดยคนอื่นแล้ว");
      }
      if (code == "success")
        queryClient.setQueryData(["userWichakans", id], {
          ...wichakansData,
          staffUsername: data.user.username,
          status: InspectStatus["LOCK"],
        });
    }
  }

  return (
    <div className="p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="mb-4 text-center text-4xl font-bold">
          คำถามจากฝ่ายวิชาการ
        </h1>

        <div className="flex items-start gap-2 p-4">
          <div className="flex flex-col items-start justify-start">
            <p>
              <span>สถานะ: </span>
              <span
                className={cn(
                  inspectStatusBadgeVariants({
                    variant: wichakansData?.status as InspectStatusKeys,
                  }),
                  "font-bold",
                )}
              >
                <span className="capitalize">{wichakansData?.status}</span>{" "}
                {wichakansData?.status === InspectStatus.DONE &&
                  `(ตรวจโดย ${wichakansData.staffUsername})`}
              </span>
            </p>
            {wichakansData?.status == InspectStatus["LOCK"] && (
              <p>
                Lock โดย:{" "}
                <span className="font-bold">{wichakansData.staffUsername}</span>
              </p>
            )}
          </div>
          <div>
            {wichakansData?.status !== InspectStatus["DONE"] && (
              <Button
                disabled={
                  wichakansLoading ||
                  (wichakansData?.status == InspectStatus["LOCK"] &&
                    wichakansData?.staffUsername != null &&
                    wichakansData?.staffUsername != data?.user.username)
                }
                onClick={lock}
                className="cursor-pointer"
              >
                {wichakansData?.status == InspectStatus["UNLOCK"]
                  ? "ไม่มีใครตรวจอยู่"
                  : "มีคนตรวจอยู่"}
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <BackwardButton />
        <ViewControls className="mb-3 justify-end" />
      </div>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full w-full rounded-lg border"
      >
        <ResizablePanel defaultSize={60}>
          <div className="flex items-center justify-center p-6">
            {academicAnswerData?.answers ? (
              <AnswerWrapper
                type="academic"
                questions={{
                  algoAnswer: "10 สหายในเงามืด",
                  chessNotation: "อัศวินห่านห้าวหาญนักล่าแต้ม (notation)",
                  chessScore: "อัศวินห่านห้าวหาญนักล่าแต้ม (score)",
                }}
                answers={{
                  ...academicAnswerData.answers,
                  algoAnswer: (
                    <div className="flex flex-col gap-4">
                      {academicAnswerData.answers.algoAnswer
                        ?.split(/<-----ALGO-ANSWER-SPLITTER----->/g)
                        .map((answer, index) => (
                          <Card key={index}>
                            <CardHeader className="font-bold">
                              คำถามย่อย {index + 1}
                            </CardHeader>
                            {plagiarism &&
                              (
                                plagiarism[
                                  `high_sim_algo_part_${index + 1}_userId` as keyof typeof plagiarism
                                ] as string[]
                              ).length > 0 && (
                                <div>
                                  <div className="mb-5 ml-5 flex items-center">
                                    <Button
                                      type="button"
                                      size="icon"
                                      effect="shineHover"
                                      variant="outline"
                                      onClick={() =>
                                        setOpenPlagiarism({
                                          ...openPlagiarism,
                                          [`answer${index + 1}`]:
                                            !openPlagiarism[
                                              `answer${index + 1}` as keyof typeof openPlagiarism
                                            ],
                                        })
                                      }
                                    >
                                      <ChevronDownIcon />
                                    </Button>
                                    <p className="ml-2 text-red-500">
                                      ตรวจพบความคล้าย! {"(similarity > 0.9)"}
                                    </p>
                                  </div>
                                  <CardHeader>
                                    {openPlagiarism[
                                      `answer${index + 1}` as keyof typeof openPlagiarism
                                    ] &&
                                      (
                                        plagiarism[
                                          `high_sim_algo_part_${index + 1}_userId` as keyof typeof plagiarism
                                        ] as string[]
                                      ).map((userId) => (
                                        <Link
                                          key={userId}
                                          className="cursor-pointer text-xs hover:text-blue-500"
                                          href={`/wichakan/${userId}`}
                                        >
                                          คล้ายกับ {userId.substring(0, 5)}
                                        </Link>
                                      ))}
                                  </CardHeader>
                                </div>
                              )}
                            <CardContent className="answer font-sarabun text-foreground/90 leading-7">
                              {answer}
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  ),
                }}
              />
            ) : (
              <Spinner />
            )}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={40}>
          <div className="flex items-center justify-center p-6">
            เกณฑ์การให้คะแนน 10 สหายในเงามืด
          </div>
          <ScrollArea className="h-[calc(100vh-15rem)] w-full">
            <WichakanForm
              data={{
                scoreChess: academicAnswerData?.answers.chessScore
                  ? academicAnswerData?.answers.chessScore.toString()
                  : "",
                scoreAcademic: wichakansData?.scoreAcademic
                  ? wichakansData.scoreAcademic.toString()
                  : "",
              }}
              status={
                wichakansData?.status
                  ? (wichakansData.status as InspectStatusKeys)
                  : InspectStatus["UNLOCK"]
              }
              isSameUser={data?.user.username == wichakansData?.staffUsername}
              onSubmit={onSubmit}
            />
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
