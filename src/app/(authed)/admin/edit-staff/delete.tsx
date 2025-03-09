"use client";

import { useContext, useState } from "react";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";

import { LoadingSpinner } from "@/components/svg/loading-spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useServerActionMutation } from "@/hook/server-action-hooks";
import { authClient } from "@/lib/auth-client";
import { defaultToastReactQuery } from "@/lib/toast";

import { EditStaffContext } from ".";
import { deleteStaffAccount } from "../actions";

const DropdownMenuDeleteStaff = () => {
  const { user } = useContext(EditStaffContext);

  const { data } = authClient.useSession();
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useServerActionMutation(deleteStaffAccount, {
    onSuccess() {
      toast.success(`Delete User ${user?.username} success!`);
      setOpen(false);
    },
    onError: defaultToastReactQuery.onError,
  });

  if (!user) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild disabled={user.id == data?.user.id}>
        <Button
          variant="ghost"
          className="text-destructive hover:text-destructive w-full justify-start"
        >
          <TrashIcon /> ลบบัญชี
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>ยืนยันการลบ</DialogTitle>
          <DialogDescription>
            คุณแน่ใจหรือไม่ว่าต้องการลบบัญชีนี้? การกระทำนี้ไม่สามารถย้อนคืนได้
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {isPending ? (
            <LoadingSpinner className="size-4" />
          ) : (
            <>
              <Button
                type="button"
                variant="destructive"
                onClick={() => {
                  mutate({
                    id: user.id,
                  });
                }}
              >
                ยืนยัน
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  ยกเลิก
                </Button>
              </DialogClose>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DropdownMenuDeleteStaff;
