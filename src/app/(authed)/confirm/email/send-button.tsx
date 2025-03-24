"use client";

import { SendIcon } from "lucide-react";
import { toast } from "sonner";

import { sendConfirmationEmail } from "@/app/(authed)/confirm/email/action";
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

interface SendButtonProps {
  email: string;
  fullname: string;
  user_id: string;
  sent?: boolean;
  disabled?: boolean;
}

function SendButton({
  email,
  fullname,
  sent,
  disabled,
  user_id,
}: SendButtonProps) {
  const { mutate, isPending, isSuccess } = useServerActionMutation(
    sendConfirmationEmail,
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
        ส่งอีเมลยืนยันสิทธิ์แล้ว
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
          ส่งอีเมลยืนยันสิทธิ์
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ส่งอีเมลยืนยันสิทธิ์ ให้ {fullname}
          </AlertDialogTitle>
          <AlertDialogDescription>
            ส่งแล้วย้อนกลับมาแก้ไขไม่ได้แล้วน่ะ undone น่ะ ส่งไปให้ {email}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              mutate({ email, fullname, user_id });
            }}
          >
            ส่งอีเมลยืนยันสิทธิ์
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default SendButton;
