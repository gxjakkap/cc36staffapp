"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CheckIcon, ChevronDownIcon } from "lucide-react";
import { z } from "zod";

import { THABIANS_CRITERIAS } from "@/components/cite/thabian";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { ScoreFieldEnum } from "./enum";

export const formSchema = z.object({
  score1_user1: z.string(),
  score1_user2: z.string(),
  score2_user1: z.string(),
  score2_user2: z.string(),
  score3_user1: z.string(),
  score3_user2: z.string(),
  score4_user1: z.string(),
  score4_user2: z.string(),
  score5_user1: z.string(),
  score5_user2: z.string(),
  score6_1_user1: z.string(),
  score6_1_user2: z.string(),
  score6_2_user1: z.string(),
  score6_2_user2: z.string(),
});

interface TabianFormProps {
  data: z.infer<typeof formSchema>;
  submitScore: (score: number, field: ScoreFieldEnum) => void;
}

function TabianForm(props: TabianFormProps) {
  const [inputValue, setInputValue] = useState({
    score1_user1: "",
    score1_user2: "",
    score2_user1: "",
    score2_user2: "",
    score3_user1: "",
    score3_user2: "",
    score4_user1: "",
    score4_user2: "",
    score5_user1: "",
    score5_user2: "",
    score6_1_user1: "",
    score6_1_user2: "",
    score6_2_user1: "",
    score6_2_user2: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [openSection, setOpenSection] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setInputValue(props.data);
  }, [props.data]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, max } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (value && (isNaN(parseFloat(value)) || parseFloat(value) < 0)) {
      setErrors((prev) => ({
        ...prev,
        [name]: "คะแนนต้องเป็นตัวเลขและไม่น้อยกว่า 0",
      }));
    } else if (value && parseFloat(value) > parseFloat(max)) {
      setErrors((prev) => ({ ...prev, [name]: `คะแนนต้องไม่เกิน ${max}` }));
    }

    setInputValue({ ...inputValue, [name]: value });
  }

  function handleSubmit(field: ScoreFieldEnum) {
    const value = inputValue[field as keyof typeof inputValue];
    const numericValue = parseFloat(value);

    const criteriaKey = field.replace("_user1", "").replace("_user2", "");
    const maxScore =
      THABIANS_CRITERIAS[criteriaKey.replace("score", "")].maxScore;

    if (!value || isNaN(numericValue)) {
      setErrors((prev) => ({ ...prev, [field]: "กรุณากรอกคะแนน" }));
      return;
    }

    if (numericValue < 0 || numericValue > maxScore) {
      setErrors((prev) => ({
        ...prev,
        [field]: `คะแนนต้องอยู่ระหว่าง 0-${maxScore}`,
      }));
      return;
    }

    props.submitScore(numericValue, field);
  }

  return (
    <div>
      <div className="flex items-center justify-center p-6">
        เกณฑ์การให้คะแนน
      </div>
      <ScrollArea className="font-noto-sans-thai-looped h-[calc(100vh-15rem)] w-full">
        <div className="grid w-full gap-4 px-8">
          {["1", "2", "3", "4", "5", "6_1", "6_2"].map((num, index) => (
            <div key={num} className="flex flex-col gap-4">
              {THABIANS_CRITERIAS[num] && (
                <Collapsible
                  open={
                    openSection[num] === undefined ? false : openSection[num]
                  }
                  onOpenChange={(open) => {
                    setOpenSection((prev) => ({
                      ...prev,
                      [num]: open,
                    }));
                  }}
                >
                  <CollapsibleTrigger asChild>
                    <div className="flex cursor-pointer items-center justify-between gap-2 rounded-md text-base font-semibold">
                      <span>
                        {THABIANS_CRITERIAS[num].question}
                        <Badge size="lg" variant="destructive" className="mt-1">
                          {THABIANS_CRITERIAS[num].maxScore} คะแนน
                        </Badge>
                      </span>
                      <ChevronDownIcon
                        className={cn(
                          "size-4 shrink-0 transition-transform",
                          openSection[num] && "rotate-180",
                        )}
                      />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 rounded-md border p-2">
                    {THABIANS_CRITERIAS[num].criteria}
                  </CollapsibleContent>
                </Collapsible>
              )}
              <div className="flex w-full flex-col justify-center gap-4 md:flex-row">
                <div className="flex w-full flex-1 flex-col">
                  <Label htmlFor={`score${num}_user1`} className="mb-2">
                    ผู้ตรวจคนที่ 1
                  </Label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Input
                        id={`score${num}_user1`}
                        value={
                          inputValue[
                            `score${num}_user1` as keyof typeof inputValue
                          ]
                        }
                        name={`score${num}_user1`}
                        onChange={handleChange}
                        placeholder={`กรอกคะแนนข้อ ${num.replace("_", ".")} (${THABIANS_CRITERIAS[num].maxScore} คะแนน)`}
                        type="number"
                        min={0}
                        max={THABIANS_CRITERIAS[num].maxScore}
                        step="0.01"
                        className={cn(
                          errors[`score${num}_user1`] && "border-red-500 pr-8",
                        )}
                        aria-invalid={!!errors[`score${num}_user1`]}
                        aria-describedby={
                          errors[`score${num}_user1`]
                            ? `error-score${num}_user1`
                            : undefined
                        }
                      />
                      {errors[`score${num}_user1`] && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <AlertCircle className="text-destructive absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 transform" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{errors[`score${num}_user1`]}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                    <Button
                      onClick={() =>
                        handleSubmit(`score${num}_user1` as ScoreFieldEnum)
                      }
                      type="submit"
                      className="cursor-pointer"
                      size="icon"
                      disabled={!!errors[`score${num}_user1`]}
                    >
                      <CheckIcon />
                    </Button>
                  </div>
                  {errors[`score${num}_user1`] && (
                    <p
                      id={`error-score${num}_user1`}
                      className="text-destructive mt-1 text-xs"
                    >
                      {errors[`score${num}_user1`]}
                    </p>
                  )}
                </div>
                <div className="flex w-full flex-1 flex-col">
                  <Label htmlFor={`score${num}_user2`} className="mb-2">
                    ผู้ตรวจคนที่ 2
                  </Label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Input
                        id={`score${num}_user2`}
                        value={
                          inputValue[
                            `score${num}_user2` as keyof typeof inputValue
                          ]
                        }
                        name={`score${num}_user2`}
                        onChange={handleChange}
                        placeholder={`กรอกคะแนนข้อ ${num.replace("_", ".")} (${THABIANS_CRITERIAS[num].maxScore} คะแนน)`}
                        type="number"
                        min={0}
                        max={THABIANS_CRITERIAS[num].maxScore}
                        step="0.01"
                        className={cn(
                          errors[`score${num}_user2`] && "border-red-500 pr-8",
                        )}
                        aria-invalid={!!errors[`score${num}_user2`]}
                        aria-describedby={
                          errors[`score${num}_user2`]
                            ? `error-score${num}_user2`
                            : undefined
                        }
                      />
                      {errors[`score${num}_user2`] && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <AlertCircle className="text-destructive absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 transform" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{errors[`score${num}_user2`]}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                    <Button
                      onClick={() =>
                        handleSubmit(`score${num}_user2` as ScoreFieldEnum)
                      }
                      type="submit"
                      className="cursor-pointer"
                      size="icon"
                      disabled={!!errors[`score${num}_user2`]}
                    >
                      <CheckIcon />
                    </Button>
                  </div>
                  {errors[`score${num}_user2`] && (
                    <p
                      id={`error-score${num}_user2`}
                      className="text-destructive mt-1 text-xs"
                    >
                      {errors[`score${num}_user2`]}
                    </p>
                  )}
                </div>
              </div>
              {index < 5 && <Separator className="my-4" />}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
export default TabianForm;
