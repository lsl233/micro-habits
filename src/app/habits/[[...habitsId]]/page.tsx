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
import { Storage, useHabits } from "@/lib/storage";
import { useRouter } from "next/navigation";
import { Habit } from "@/types/habit";
import { useEffect, useMemo } from "react";
import { Unit, Type } from "@/lib/enum";
import { enumKeys } from "@/lib/utils";

const FormSchema = z.object({
  id: z.string(),
  title: z.string().min(1, {
    message: "最少输入一个字符",
  }),
  type: z.string().min(1, { message: "请选择时间类型" }),
  unit: z.string().min(1, { message: "请选择单位" }),
  amount: z.coerce.number().min(1, { message: "最少输入1" }).or(z.string()),
  completed: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const HabitsIdPage = ({ params }: { params: { habitsId: string } }) => {
  const router = useRouter();
  const habitsId = params?.habitsId?.[0] || new Date().getTime().toString();
  const units = enumKeys(Unit);
  const types = enumKeys(Type);
  const [habits, setHabits] = useHabits();
  const habit = habits.find((item) => item.id === habitsId);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: habitsId,
      title: "",
      amount: "",
      unit: "",
      type: "",
      completed: false,
      createdAt: new Date().getTime().toString(),
      updatedAt: new Date().getTime().toString(),
    },
  });

  useEffect(() => {
    if (habit) {
      form.reset({
        id: habit.id,
        title: habit.title,
        type: habit.type?.toString() || "",
        unit: habit.unit?.toString() || "",
        amount: habit.amount,
        completed: habit.completed,
        createdAt: habit.createdAt || new Date().getTime().toString(),
        updatedAt: habit.updatedAt || new Date().getTime().toString(),
      });
    }
  }, [form, habit]);

  const fields = form.watch();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const habitData: Habit = {
      ...data,
      type: data.type as unknown as Type,
      unit: data.unit as unknown as Unit,
    };
    setHabits(habitData);
    toast.success("习惯已保存");
    router.replace("/");
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
                    <Input placeholder="e.g.看书" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => {
              return (
                <FormItem className="md:w-1/4 w-full">
                  <FormLabel>数量</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g.1"
                      {...field}
                      className="text-center"
                    />
                  </FormControl>
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
                <FormItem key={field.value} className="md:w-1/4 w-full">
                  <FormLabel>单位</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            <span className="text-gray-500">e.g.页</span>
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {units.map((unit) => (
                            <SelectItem
                              value={String(Unit[unit])}
                              key={Unit[unit]}
                            >
                              {unit}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
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
                <FormItem key={field.value} className="md:w-1/4 w-full">
                  <FormLabel>时间类型</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            <span className="text-gray-500">e.g.每天</span>
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {types.map((type) => (
                            <SelectItem
                              value={String(Type[type])}
                              key={Type[type]}
                            >
                              {type}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <p className="mt-4">
          {Type[Number(fields.type)]}
          {fields.title} {fields.amount} {Unit[Number(fields.unit)]}
        </p>
        <Button type="submit" className="mt-4">
          创 建
        </Button>
      </form>
    </Form>
  );
};

export default HabitsIdPage;
