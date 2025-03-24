"use client";

import { SendIcon } from "lucide-react";
import { toast } from "sonner";

import { sendTestEmail } from "@/app/(authed)/confirm/email/action";
import { LoadingSpinner } from "@/components/svg/loading-spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useServerActionMutation } from "@/hook/server-action-hooks";

interface TestButtonProps {
  email: string;
  fullname: string;
  nickname: string | null;
  user_id: string;
  sent?: boolean;
  disabled?: boolean;
}

function TestButton({
  fullname,
  nickname,
  sent,
  disabled,
  user_id,
}: TestButtonProps) {
  const { mutate, isPending, isSuccess } = useServerActionMutation(
    sendTestEmail,
    {
      onSuccess() {
        toast.success("ส่งอีเมลสำเร็จ");
      },
      onError() {
        toast.error(`เกิดข้อผิดพลาดบางอย่าง ส่งอีเมลไม่สำเร็จ`);
      },
    },
  );

  if (sent || isSuccess) {
    return (
      <Button disabled variant="outline">
        ส่งอีเมลทดสอบสิทธิ์แล้ว
      </Button>
    );
  }

  if (isPending) {
    return (
      <Button size="icon" disabled>
        <LoadingSpinner className="size-8" />
      </Button>
    );
  }

  if (disabled) {
    return (
      <Button
        effect="expandIcon"
        icon={SendIcon}
        iconPlacement="right"
        disabled
        variant="outline"
      >
        ไม่สามารถส่งอีเมลได้
      </Button>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button effect="expandIcon" icon={SendIcon} iconPlacement="right">
          ส่งอีเมลยืนยันทดสอบ
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>ส่งอีเมลทดสอบ ให้ {fullname}</AlertDialogTitle>
          <AlertDialogDescription>
            กำลังส่งอีเมลไปให้ delivered@resend.dev
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              mutate({ fullname, user_id, nickname });
            }}
          >
            ส่งอีเมลทดสอบ
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default TestButton;
