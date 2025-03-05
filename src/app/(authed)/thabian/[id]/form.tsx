"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

export const formSchema = z.object({
  score1: z.string().min(1, "จำเป็นต้องกรอกคะแนน"),
  score2: z.string().min(1, "จำเป็นต้องกรอกคะแนน"),
  score3: z.string().min(1, "จำเป็นต้องกรอกคะแนน"),
  score4: z.string().min(1, "จำเป็นต้องกรอกคะแนน"),
  score5: z.string().min(1, "จำเป็นต้องกรอกคะแนน"),
  score6_1: z.string().min(1, "จำเป็นต้องกรอกคะแนน"),
  score6_2: z.string().min(1, "จำเป็นต้องกรอกคะแนน"),
});

interface TabianFormProps {
  data: z.infer<typeof formSchema>;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
}

function TabianForm(props: TabianFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: props.data,
  });

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
            control={form.control}
            name="score1"
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
            control={form.control}
            name="score2"
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
          <FormField
            control={form.control}
            name="score3"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  3. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Dicta rem repellat, quia harum voluptas deleniti culpa unde.
                  Magni provident, aperiam officiis fugiat quod molestias, at
                  labore inventore minus, quae fuga!
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="กรอกคะแนน 3"
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
            control={form.control}
            name="score4"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  4. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Dicta rem repellat, quia harum voluptas deleniti culpa unde.
                  Magni provident, aperiam officiis fugiat quod molestias, at
                  labore inventore minus, quae fuga!
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="กรอกคะแนน 4"
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
            control={form.control}
            name="score5"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  5. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Dicta rem repellat, quia harum voluptas deleniti culpa unde.
                  Magni provident, aperiam officiis fugiat quod molestias, at
                  labore inventore minus, quae fuga!
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="กรอกคะแนน 5"
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
            control={form.control}
            name="score6_1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  6.1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Dicta rem repellat, quia harum voluptas deleniti culpa unde.
                  Magni provident, aperiam officiis fugiat quod molestias, at
                  labore inventore minus, quae fuga!
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="กรอกคะแนน 6.1"
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
            control={form.control}
            name="score6_2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  6.2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Dicta rem repellat, quia harum voluptas deleniti culpa unde.
                  Magni provident, aperiam officiis fugiat quod molestias, at
                  labore inventore minus, quae fuga!
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="กรอกคะแนน 6.2"
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
          <Button type="submit" className="cursor-pointer">
            ส่งคะแนน
          </Button>
        </div>
      </form>
    </Form>
  );
}
export default TabianForm;
