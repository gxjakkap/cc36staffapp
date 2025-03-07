"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  InspectStatus,
  InspectStatusKeys,
} from "@/components/data-table/status-badge";
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

export const formSchema = z.object({
  scoreAcademic: z.string().min(1, "จำเป็นต้องกรอกคะแนน"),
  scoreChess: z.string().min(1, "จำเป็นต้องกรอกคะแนน"),
});

interface WichakanProps {
  data: z.infer<typeof formSchema>;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  status: InspectStatusKeys;
  isSameUser: boolean;
}

function WichakanForm(props: WichakanProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...props.data,
    },
  });

  useEffect(() => {
    form.reset(props.data);
  }, [props.data, form.reset]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(props.onSubmit)}
        className="font-noto-sans-thai-looped"
      >
        <div className="flex items-center justify-center p-6">
          เกณฑ์การให้คะแนน
        </div>
        <div className="grid gap-10 p-7">
          <FormField
            disabled={
              props.status == InspectStatus["DONE"] ||
              props.status != InspectStatus["LOCK"] ||
              !props.isSameUser
            }
            control={form.control}
            name="scoreAcademic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Dicta rem repellat, quia harum voluptas deleniti culpa unde.
                  Magni provident, aperiam officiis fugiat quod molestias, at
                  labore inventore minus, quae fuga!
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="กรอกคะแนน 1"
                    type="number"
                    min={0}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={
              props.status == InspectStatus["DONE"] ||
              props.status != InspectStatus["LOCK"] ||
              !props.isSameUser
            }
            control={form.control}
            name="scoreChess"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Dicta rem repellat, quia harum voluptas deleniti culpa unde.
                  Magni provident, aperiam officiis fugiat quod molestias, at
                  labore inventore minus, quae fuga!
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="กรอกคะแนน 2"
                    type="number"
                    min={0}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center">
          <Button
            disabled={
              props.status == InspectStatus["DONE"] ||
              props.status != InspectStatus["LOCK"] ||
              !props.isSameUser
            }
            type="submit"
            className="cursor-pointer"
          >
            ส่งคะแนน
          </Button>
        </div>
      </form>
    </Form>
  );
}
export default WichakanForm;
