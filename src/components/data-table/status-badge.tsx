import { cva } from "class-variance-authority";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type Status = "lock" | "unlock" | "done";

interface StatusBadgeProps {
  status: Status;
}

const badgeVariants = cva("m-1", {
  variants: {
    variant: {
      lock: "bg-yellow-500",
      unlock: "bg-orange-500",
      done: "bg-green-500",
    },
  },
  defaultVariants: {
    variant: "lock",
  },
});

const statusText: Record<Status, string> = {
  lock: "มีคนตรวจ",
  unlock: "ไม่มีคนตรวจ",
  done: "ตรวจแล้ว",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge variant="outline" className="gap-1.5">
      <span
        className={`${cn(
          "size-1.5 rounded-full",
          badgeVariants({ variant: status }),
        )}`}
        aria-hidden="true"
      />
      {statusText[status]}
    </Badge>
  );
}
