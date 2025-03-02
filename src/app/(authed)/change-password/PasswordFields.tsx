"use client";

import { useId, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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

import { upPassword } from "./action";
import { PasswordStrength } from "./PasswordStrength";

const formSchema = z.object({
  currentPassword: z
    .string()
    .min(2, { message: "Current password is required" }),
  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[0-9]/, { message: "Password must contain at least 1 number" })
    .regex(/[a-z]/, {
      message: "Password must contain at least 1 lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least 1 uppercase letter",
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
  const { mutate, isPending } = useServerActionMutation(upPassword);

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
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
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
            "Something went wrong, please check your credentials",
        );
      },
    });
  };

  return (
    <div className="mx-auto space-y-8 px-6 pt-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto flex w-[70vw] flex-col gap-y-4 lg:w-[30vw]"
        >
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <PasswordInput
                      id={currentPasswordId}
                      className="pe-9"
                      placeholder="Your current password"
                      type={isCurrentPasswordVisible ? "text" : "password"}
                      {...field}
                      aria-invalid={!!form.formState.errors.currentPassword}
                    />
                    <button
                      className="text-muted-foreground/80 hover:text-foreground focus-visible:outline-ring/70 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg outline-offset-2 transition-colors focus:z-10 focus-visible:outline focus-visible:outline-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
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
                        <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
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
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <PasswordInput
                      id={newPasswordId}
                      className="pe-9"
                      placeholder="Set your new password"
                      type={isNewPasswordVisible ? "text" : "password"}
                      {...field}
                      aria-invalid={strengthScore < 4}
                      aria-describedby={`${newPasswordId}-description`}
                    />
                    <button
                      className="text-muted-foreground/80 hover:text-foreground focus-visible:outline-ring/70 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg outline-offset-2 transition-colors focus:z-10 focus-visible:outline focus-visible:outline-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                      type="button"
                      onClick={toggleNewPasswordVisibility}
                      aria-label={
                        isNewPasswordVisible ? "Hide password" : "Show password"
                      }
                      aria-pressed={isNewPasswordVisible}
                      aria-controls={newPasswordId}
                    >
                      {isNewPasswordVisible ? (
                        <Eye size={16} strokeWidth={2} aria-hidden="true" />
                      ) : (
                        <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <PasswordStrength password={newPassword} passwordId={newPasswordId} />

          <Button type="submit" className="w-full" disabled={isPending}>
            Confirm
          </Button>
        </form>
      </Form>
    </div>
  );
}
