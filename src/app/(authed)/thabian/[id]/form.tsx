"use client";

import { useEffect, useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
      <div className="font-noto-sans-thai-looped">
        <div className="flex items-center justify-center p-6">
          เกณฑ์การให้คะแนน
        </div>
        <div className="grid gap-10 p-7">
          {["1", "2", "3", "4", "5", "6_1", "6_2"].map((num) => (
            <div key={num} className="items-center0 flex justify-center">
              <div className="flex items-center">
                <Input
                  name={`score${num}_user1`}
                  onChange={handleChange}
                  placeholder={`กรอกคะแนน ${num} ผู้ตรวจคนที่ 1`}
                  type="number"
                  min={0}
                />
                <Button
                  onClick={() =>
                    props.submitScore(
                      parseInt(
                        inputValue[
                          `score${num}_user1` as keyof typeof inputValue
                        ],
                      ),
                      `score${num}_user1` as ScoreFieldEnum,
                    )
                  }
                  type="submit"
                  className="cursor-pointer"
                >
                  ส่งคะแนน
                </Button>
              </div>
              <div className="flex items-center">
                <Input
                  name={`score${num}_user2`}
                  onChange={handleChange}
                  placeholder={`กรอกคะแนน ${num} ผู้ตรวจคนที่ 2`}
                  type="number"
                  min={0}
                />
                <Button
                  onClick={() =>
                    props.submitScore(
                      parseInt(
                        inputValue[
                          `score${num}_user2` as keyof typeof inputValue
                        ],
                      ),
                      `score${num}_user2` as ScoreFieldEnum,
                    )
                  }
                  type="submit"
                  className="cursor-pointer"
                >
                  ส่งคะแนน
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default TabianForm;
