"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  WichakanCite1,
  WichakanCite2,
  WichakanCite3,
} from "@/components/cite/wichakan";
import {
  InspectStatus,
  InspectStatusKeys,
} from "@/components/data-table/status-badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
          เกณฑ์การให้คะแนน 10 สหายในเงามืด
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
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center gap-2 text-xl">
                      เกณฑ์การให้คะแนน 1{" "}
                      <div>
                        <Button
                          type="button"
                          size="icon"
                          effect="shineHover"
                          variant="outline"
                        >
                          <ChevronDownIcon />
                        </Button>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <WichakanCite1 />
                      <WichakanCite2 />
                      <WichakanCite3 />
                    </CollapsibleContent>
                  </Collapsible>
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
                <FormLabel className="text-xl font-semibold">
                  อัศวินห่านห้าวหาญนักล่าแต้ม
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
