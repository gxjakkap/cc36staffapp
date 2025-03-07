import { createElement } from "react";
import { cva } from "class-variance-authority";
import { CircleCheckBigIcon, LockIcon, LockOpenIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export const InspectStatus = {
  LOCK: "lock",
  UNLOCK: "unlock",
  DONE: "done",
} as const;

export type InspectStatusKeys =
  (typeof InspectStatus)[keyof typeof InspectStatus];

interface InspectStatusBadgeProps {
  status: InspectStatusKeys;
}

const badgeVariants = cva("m-1", {
  variants: {
    variant: {
      lock: "text-yellow-500",
      unlock: "text-orange-500",
      done: "text-green-500",
    },
  },
  defaultVariants: {
    variant: "lock",
  },
});

const statusText: Record<InspectStatusKeys, string> = {
  lock: "มีคนตรวจ",
  unlock: "ไม่มีคนตรวจ",
  done: "ตรวจแล้ว",
};

const statusIcon: Record<
  InspectStatusKeys,
  React.ComponentType<{ className?: string }>
> = {
  lock: LockOpenIcon,
  unlock: LockIcon,
  done: CircleCheckBigIcon,
};

export default function InspectStatusBadge({
  status,
}: InspectStatusBadgeProps) {
  return (
    <div
      className={cn(
        badgeVariants({ variant: status }),
        "flex items-center gap-2",
      )}
    >
      {status && createElement(statusIcon[status], { className: "size-4" })}
      <p className="text-foreground">{statusText[status]}</p>
    </div>
  );
}
