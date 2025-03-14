"use client";

import { useEffect, useState } from "react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { z } from "zod";

import { THABIANS_CITERIAS } from "@/components/cite/thanbian";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

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

  useEffect(() => {
    setInputValue(props.data);
  }, [props.data]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
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
              {THABIANS_CITERIAS[num] && (
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <div className="flex cursor-pointer text-base font-semibold">
                      {THABIANS_CITERIAS[num].question}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer"
                      >
                        <ChevronDownIcon />
                      </Button>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent asChild>
                    {THABIANS_CITERIAS[num].citeria}
                  </CollapsibleContent>
                </Collapsible>
              )}
              <div className="items-center0 flex w-full justify-center gap-4">
                <div className="flex w-full items-center gap-2">
                  <Input
                    value={
                      inputValue[`score${num}_user1` as keyof typeof inputValue]
                    }
                    name={`score${num}_user1`}
                    onChange={handleChange}
                    placeholder={`กรอกคะแนน ${num.replace("_", ".")} ผู้ตรวจคนที่ 1`}
                    type="number"
                    min={0}
                    step="0.01"
                  />
                  <Button
                    onClick={() =>
                      props.submitScore(
                        parseFloat(
                          inputValue[
                            `score${num}_user1` as keyof typeof inputValue
                          ],
                        ),
                        `score${num}_user1` as ScoreFieldEnum,
                      )
                    }
                    type="submit"
                    className="cursor-pointer"
                    size="icon"
                  >
                    <CheckIcon />
                  </Button>
                </div>
                <div className="flex w-full items-center gap-2">
                  <Input
                    value={
                      inputValue[`score${num}_user2` as keyof typeof inputValue]
                    }
                    name={`score${num}_user2`}
                    onChange={handleChange}
                    placeholder={`กรอกคะแนน ${num.replace("_", ".")} ผู้ตรวจคนที่ 2`}
                    type="number"
                    min={0}
                    step="0.01"
                  />
                  <Button
                    onClick={() =>
                      props.submitScore(
                        parseFloat(
                          inputValue[
                            `score${num}_user2` as keyof typeof inputValue
                          ],
                        ),
                        `score${num}_user2` as ScoreFieldEnum,
                      )
                    }
                    type="submit"
                    className="cursor-pointer"
                    size="icon"
                  >
                    <CheckIcon />
                  </Button>
                </div>
              </div>
              {index < 5 - 1 && <Separator className="my-4" />}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
export default TabianForm;
