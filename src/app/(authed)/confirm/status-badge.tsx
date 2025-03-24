import { createElement } from "react";
import { cva } from "class-variance-authority";
import { CheckCircleIcon, ClockIcon, XCircleIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export const ConfirmStatus = {
  YES: "yes",
  NO: "no",
  CANDIDATE: "candidate",
  RESERVED: "reserved",
} as const;

export type ConfirmStatusKeys =
  (typeof ConfirmStatus)[keyof typeof ConfirmStatus];

interface ConfirmStatusBadgeProps {
  status: ConfirmStatusKeys;
  translate?: Record<ConfirmStatusKeys, string>;
}

export const confirmStatusBadgeVariants = cva("m-1", {
  variants: {
    variant: {
      yes: "text-green-500",
      no: "text-red-800",
      candidate: "text-orange-500",
      reserved: "text-amber-300",
    },
  },
  defaultVariants: {
    variant: "yes",
  },
});

const statusText: Record<ConfirmStatusKeys, string> = {
  yes: "ยืนยันสิทธิ์",
  no: "สละสิทธิ์",
  candidate: "ตัวจริง",
  reserved: "สำรอง",
};

const statusIcon: Record<
  ConfirmStatusKeys,
  React.ComponentType<{ className?: string }>
> = {
  yes: CheckCircleIcon,
  no: XCircleIcon,
  candidate: ClockIcon,
  reserved: ClockIcon,
};

export default function ConfirmStatusBadge({
  status,
  translate,
}: ConfirmStatusBadgeProps) {
  return (
    <div
      className={cn(
        confirmStatusBadgeVariants({ variant: status }),
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
