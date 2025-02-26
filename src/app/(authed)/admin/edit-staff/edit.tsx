import { useContext, useState } from "react";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useServerActionMutation } from "@/hook/server-action-hooks";
import { defaultToastReactQuery } from "@/lib/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { EditStaffContext } from ".";
import { editStaffAccount } from "../actions";

const ROLES = ["staff", "admin"] as const;
const RoleEnum = z.enum(ROLES);
const passwordSchema = z
  .string()
  .min(6, { message: "Password must be longer than 6 characters" })
  .regex(/[A-Z]/, {
    message: "Password must contain at least 1 uppercase letter",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least 1 lowercase letter",
  })
  .regex(/[0-9]/, { message: "Password must contain at least 1 number" })
  .regex(/[!@#$%^&*]/, {
    message: "Password must contain at least 1 special character",
  });

const editFormSchema = z.object({
  password: passwordSchema,
  role: RoleEnum,
});

const DropdownMenuEditStaff = () => {
  const { user } = useContext(EditStaffContext);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      role: user?.role as never,
      password: "",
    },
  });

  const { mutate, isPending } = useServerActionMutation(editStaffAccount, {
    onSuccess() {
      toast.success(`Delete User ${user?.username} success!`);
      setOpen(false);
    },
    onError: defaultToastReactQuery.onError,
  });

  if (!user) {
    return null;
  }

  const onSubmit = (data: z.infer<typeof editFormSchema>) => {
    mutate({ ...data, id: user.id });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full">
          <Edit2Icon /> Edit user
        </Button>
      </DialogTrigger>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit staff account</DialogTitle>
              <DialogDescription>
                {user.name} - {user.username}
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="************"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="staff">Staff</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              {isPending ? (
                <LoadingSpinner className="size-4" />
              ) : (
                <>
                  <Button type="submit">Confirm</Button>
                  <DialogClose>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </DialogClose>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
};
export default DropdownMenuEditStaff;
