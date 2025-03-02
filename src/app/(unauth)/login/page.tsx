"use client";

import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
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
import { Input } from "@/components/ui/input";
import { useServerActionMutation } from "@/hook/server-action-hooks";

import { SignInStaff } from "./action";

const formSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export default function StaffLogin() {
  const { mutate, isPending } = useServerActionMutation(SignInStaff, {
    onSuccess() {
      toast.success("Sucessfully login");
      window.location.reload();
    },
    onError() {
      toast.error("Something went wrong, please check your crediential");
    },
  });

  const loginForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  const { resolvedTheme } = useTheme();

  return (
    <div className="mt-[25vh] flex flex-col gap-y-12">
      <div className="mx-auto">
        <Image
          style={{ width: "100%", height: "auto" }}
          width={250}
          height={130}
          src={
            resolvedTheme === "light" ? "/logo-black.png" : "/logo-white.png"
          }
          alt="ComCamp36Logo"
          priority
        />
      </div>
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(onSubmit)}
          className="mx-auto flex w-[70vw] flex-col gap-y-2 lg:w-[30vw]"
        >
          <FormField
            control={loginForm.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="*********" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            Sign in
          </Button>
        </form>
      </Form>
    </div>
  );
}
