import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const Gender = {
  MAN: "man",
  WOMAN: "woman",
} as const;

export type GenderKeys = (typeof Gender)[keyof typeof Gender];

interface GenderBadgeProps {
  gender: GenderKeys;
  translate?: Record<GenderKeys, string>;
}

export const genderBadgeVariants = cva("m-1", {
  variants: {
    variant: {
      man: "text-blue-500",
      woman: "text-pink-500",
    },
  },
  defaultVariants: {
    variant: "man",
  },
});

const genderText: Record<GenderKeys, string> = {
  man: "ผู้ชาย",
  woman: "ผู้หญิง",
};

export default function GenderBadge({ gender, translate }: GenderBadgeProps) {
  return (
    <div
      className={cn(
        genderBadgeVariants({ variant: gender }),
        "flex items-center gap-2",
      )}
    >
      <p className="text-foreground">
        {translate?.[gender] ?? genderText[gender]}
      </p>
    </div>
  );
}
