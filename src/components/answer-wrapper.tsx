import type { InferSelectModel } from "drizzle-orm";

import { Separator } from "@/components/ui/separator";
import type { answerAcademic, answerRegis } from "@/db/schema";
import { formatTextWithLineBreaks } from "@/lib/formatter";

type AnswerRegis = InferSelectModel<typeof answerRegis>;
type AnswerAcademic = InferSelectModel<typeof answerAcademic>;

type AnswerType<T extends "academic" | "regis"> = T extends "academic"
  ? AnswerAcademic
  : AnswerRegis;

type QuestionKeyType<T extends "academic" | "regis"> = T extends "academic"
  ? keyof Omit<AnswerAcademic, "id" | "userId">
  : keyof Omit<AnswerRegis, "id" | "userId">;

interface AnswerWrapperProps<T extends "academic" | "regis"> {
  type: T;
  questions: Record<QuestionKeyType<T>, string>;
  answers: AnswerType<T>;
}

export function AnswerWrapper<T extends "academic" | "regis">({
  questions: question,
  answers: answer,
}: AnswerWrapperProps<T>) {
  const filteredAnswers = Object.entries(answer).filter(
    ([key]) => key !== "id" && key !== "userId",
  );

  return (
    <div className="w-full">
      {filteredAnswers.map(([key, value], index) => (
        <div key={key}>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">
              {question[key as keyof typeof question]}
            </h3>
            <p
              className="text-wrap font-sarabun"
              dangerouslySetInnerHTML={{
                __html: formatTextWithLineBreaks(String(value)),
              }}
            />
          </div>
          {index < filteredAnswers.length - 1 && <Separator className="my-6" />}
        </div>
      ))}
    </div>
  );
}
