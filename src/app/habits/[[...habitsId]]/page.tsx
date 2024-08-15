"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Storage } from "@/lib/storage";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  title: z.string().min(1, {
    message: "最少输入一个字符",
  }),
  type: z.string().min(1, { message: "请选择时间类型" }),
  unit: z.string().min(1, { message: "请选择单位" }),
  count: z.coerce.number().min(1, { message: "最少输入1" }).or(z.string()),
  completed: z.boolean().default(false),
  createdAt: z.string().default(new Date().getTime().toString()),
  updatedAt: z.string().default(new Date().getTime().toString()),
});

const HabitsIdPage = ({ params }: { params: { habitsId: string } }) => {
  const router = useRouter()
  const habitsId = params?.habitsId?.[0] || new Date().getTime().toString();
  const units = ["杯", "个", "次", "页", "米", "公里", "分钟", "小时"];
  const types = ["每天", "每周", "每月"];

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: habitsId,
      title: "",
      count: "",
      unit: "",
      type: "",
      completed: false,
    },
  });

  const texts = form.watch(["type", "title", "count", "unit"]);


  function onSubmit(data: z.infer<typeof FormSchema>) {
    Storage.append("habits", data);
    toast.success("You submitted the following values");
    router.replace('/')
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid items-center flex-col w-full p-6"
      >
        <div className="md:flex md:space-x-4 space-y-2 md:space-y-0">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => {
              return (
                <FormItem className="md:w-1/2 w-full">
                  <FormLabel>动作</FormLabel>
                  <FormControl>
                    <Input placeholder="动作" {...field} />
                  </FormControl>
                  <FormDescription>比如：喝水</FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="count"
            render={({ field }) => {
              return (
                <FormItem className="md:w-1/4 w-full">
                  <FormLabel>数量</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="数量"
                      {...field}
                      className="text-center"
                    />
                  </FormControl>
                  <FormDescription>比如：1</FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => {
              return (
                <FormItem className="md:w-1/4 w-full">
                  <FormLabel>单位</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent {...field}>
                        <SelectGroup>
                          {units.map((unit) => (
                            <SelectItem value={unit} key={unit}>
                              {unit}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>比如：杯</FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <div className="md:flex md:space-x-2 mt-6 border-t border-gray-200 border-b py-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => {
              return (
                <FormItem className="md:w-1/4 w-full">
                  <FormLabel>时间类型</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {types.map((type) => (
                            <SelectItem value={type} key={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>比如：每周</FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <p className="mt-4">{texts.join("")}</p>
        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default HabitsIdPage;
