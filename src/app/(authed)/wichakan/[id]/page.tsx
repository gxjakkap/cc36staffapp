"use client";

import { redirect, useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

import { AnswerWrapper } from "@/components/answer-wrapper";
import {
  InspectStatus,
  inspectStatusBadgeVariants,
  InspectStatusKeys,
} from "@/components/data-table/status-badge";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useServerActionQuery } from "@/hook/server-action-hooks";
import { authClient } from "@/lib/auth-client";
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
                  "font-bold capitalize",
                )}
              >
                {wichakansData?.status}
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
              {wichakansData?.status == InspectStatus["LOCK"]
                ? InspectStatus["UNLOCK"]
                : InspectStatus["LOCK"]}
            </Button>
          </div>
        </div>
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
                    academicAnswerData.answers.algoAnswer ?? ""
                  ).replace(/<-----ALGO-ANSWER-SPLITTER----->/g, ""),
                }}
              />
            ) : (
              <Spinner />
            )}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={40}>
          <WichakanForm
            data={{
              scoreChess: wichakansData?.scoreChess
                ? wichakansData.scoreChess.toString()
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
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
