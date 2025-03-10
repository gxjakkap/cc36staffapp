import type { InferSelectModel } from "drizzle-orm";

import { ScrollArea } from "@/components/ui/scroll-area";
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
    <div className="mb-3 w-full">
      <div className="flex items-center justify-center pb-4">คำถาม</div>
      <ScrollArea className="h-[calc(100vh-15rem)] w-full">
        {filteredAnswers.map(([key, value], index) => (
          <div key={key} className="mx-auto max-w-[80ch]">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">
                {question[key as keyof typeof question]}
              </h3>
              <p
                className="answer font-sarabun text-foreground/90 leading-7"
                dangerouslySetInnerHTML={{
                  __html: formatTextWithLineBreaks(String(value)),
                }}
              />
            </div>
            {index < filteredAnswers.length - 1 && (
              <Separator className="my-8" />
            )}
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
