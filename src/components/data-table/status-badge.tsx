import { createElement } from "react";
import { cva } from "class-variance-authority";
import {
  CircleCheckBigIcon,
  LoaderIcon,
  LockIcon,
  LockOpenIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

export const InspectStatus = {
  LOCK: "lock",
  UNLOCK: "unlock",
  DONE: "done",
  WAITING: "waiting",
} as const;

export type InspectStatusKeys =
  (typeof InspectStatus)[keyof typeof InspectStatus];

interface InspectStatusBadgeProps {
  status: InspectStatusKeys;
  translate?: Record<InspectStatusKeys, string>;
}

export const inspectStatusBadgeVariants = cva("m-1", {
  variants: {
    variant: {
      lock: "text-red-800",
      unlock: "text-orange-500",
      done: "text-green-500",
      waiting: "text-amber-300",
    },
  },
  defaultVariants: {
    variant: "lock",
  },
});

const statusText: Record<InspectStatusKeys, string> = {
  lock: "มีคนกำลังตรวจอยู่",
  unlock: "ยังไม่มีคนตรวจ",
  done: "ตรวจแล้ว",
  waiting: "รอส่งเอกสารเพิ่มเติม",
};

const statusIcon: Record<
  InspectStatusKeys,
  React.ComponentType<{ className?: string }>
> = {
  lock: LockIcon,
  unlock: LockOpenIcon,
  done: CircleCheckBigIcon,
  waiting: LoaderIcon,
};

export default function InspectStatusBadge({
  status,
  translate,
}: InspectStatusBadgeProps) {
  return (
    <div
      className={cn(
        inspectStatusBadgeVariants({ variant: status }),
        "flex items-center gap-2",
      )}
    >
      {status && createElement(statusIcon[status], { className: "size-4" })}
      <p className="text-foreground">
        {translate?.[status] ?? statusText[status]}
      </p>
    </div>
  );
}
