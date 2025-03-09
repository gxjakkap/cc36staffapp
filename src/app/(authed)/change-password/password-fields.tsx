"use client";

import { useId, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/passwordInput";
import { useServerActionMutation } from "@/hook/server-action-hooks";

import { changePassword } from "./action";
import { PasswordStrength } from "./password-strength";

const formSchema = z.object({
  currentPassword: z.string().min(1, { message: "กรุณากรอกรหัสผ่านปัจจุบัน" }),
  newPassword: z
    .string()
    .min(8, { message: "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร" })
    .regex(/[0-9]/, { message: "รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว" })
    .regex(/[a-z]/, {
      message: "รหัสผ่านต้องมีตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว",
    })
    .regex(/[A-Z]/, {
      message: "รหัสผ่านต้องมีตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว",
    }),
});

export default function ChangePass() {
  const currentPasswordId = useId();
  const newPasswordId = useId();

  // State for password visibility
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState<boolean>(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] =
    useState<boolean>(false);

  const toggleCurrentPasswordVisibility = () =>
    setIsCurrentPasswordVisible((prev) => !prev);
  const toggleNewPasswordVisibility = () =>
    setIsNewPasswordVisible((prev) => !prev);

  // Server action mutation
  const { mutate, isPending } = useServerActionMutation(changePassword);

  // Use the form schema to infer the form type
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const newPassword = form.watch("newPassword") || "";

  // Password strength checking functions
  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร" },
      { regex: /[0-9]/, text: "รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว" },
      {
        regex: /[a-z]/,
        text: "รหัสผ่านต้องมีตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว",
      },
      {
        regex: /[A-Z]/,
        text: "รหัสผ่านต้องมีตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว",
      },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(newPassword);

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutate(values, {
      onSuccess: (data) => {
        if (data.success) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      },
      onError: (error) => {
        toast.error(
          error?.message ||
            "เกิดข้อผิดพลาด ตรวจสอบข้อมูลการเข้าสู่ระบบอีกครั้ง",
        );
      },
    });
  };

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto flex w-[70vw] flex-col gap-y-4 lg:w-[30vw]"
        >
          <CardContent className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>กรอกรหัสผ่านเดิม</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <PasswordInput
                        id={currentPasswordId}
                        className="pe-9"
                        placeholder="รหัสผ่านเดิม"
                        type={isCurrentPasswordVisible ? "text" : "password"}
                        {...field}
                        aria-invalid={!!form.formState.errors.currentPassword}
                      />
                      <button
                        className="text-muted-foreground/80 hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors focus:outline-none"
                        type="button"
                        onClick={toggleCurrentPasswordVisibility}
                        aria-label={
                          isCurrentPasswordVisible
                            ? "Hide password"
                            : "Show password"
                        }
                        aria-pressed={isCurrentPasswordVisible}
                        aria-controls={currentPasswordId}
                      >
                        {isCurrentPasswordVisible ? (
                          <Eye size={16} strokeWidth={2} aria-hidden="true" />
                        ) : (
                          <EyeOff
                            size={16}
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ตั้งรหัสผ่านใหม่</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <PasswordInput
                        id={newPasswordId}
                        className="pe-9"
                        placeholder="รหัสผ่านใหม่"
                        type={isNewPasswordVisible ? "text" : "password"}
                        {...field}
                        aria-invalid={strengthScore < 4}
                        aria-describedby={`${newPasswordId}-description`}
                      />
                      <button
                        className="text-muted-foreground/80 hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors focus:outline-none"
                        type="button"
                        onClick={toggleNewPasswordVisibility}
                        aria-label={
                          isNewPasswordVisible
                            ? "Hide password"
                            : "Show password"
                        }
                        aria-pressed={isNewPasswordVisible}
                        aria-controls={newPasswordId}
                      >
                        {isNewPasswordVisible ? (
                          <Eye size={16} strokeWidth={2} aria-hidden="true" />
                        ) : (
                          <EyeOff
                            size={16}
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <PasswordStrength
              password={newPassword}
              passwordId={newPasswordId}
            />
          </CardContent>
          <CardFooter className="pt-4">
            <Button type="submit" className="w-full" disabled={isPending}>
              ยืนยัน
            </Button>
          </CardFooter>
        </form>
      </Form>
    </div>
  );
}
