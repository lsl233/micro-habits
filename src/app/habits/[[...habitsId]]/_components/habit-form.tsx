"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

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
import { useEffect, useMemo } from "react";
import { Unit, Type } from "@/lib/enum";
import { enumKeys } from "@/lib/utils";
import { Habit } from "@prisma/client";

const FormSchema = z.object({
  id: z.string().or(z.undefined()),
  action: z.string().min(2, {
    message: "最少输入两个字符",
  }),
  cycleTimeType: z.string({ message: "请选择" }),
  unit: z.string({ message: "请选择" }),
  amount: z.coerce.number().min(1, { message: "最少输入1" }).or(z.string()),
  done: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

interface HabitFormProps {
  habit: Habit | undefined;
}

const defaultValues = {
  id: "",
  action: "",
  cycleTimeType: "",
  unit: "",
  amount: "",
  done: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const HabitForm = ({ habit }: HabitFormProps) => {
  const router = useRouter();

  const units = enumKeys(Unit);
  const types = enumKeys(Type);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: habit || defaultValues,
  });

  const fields = form.watch();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      if (data.id) {
        await axios.patch(`/api/habits/${data.id}`, data);
      } else {
        delete data.id;
        await axios.post("/api/habits", {
          ...data,
          userId: 'abf7fcd1-7562-47f4-abff-a5387c765651'
        });
      }
      toast.success("习惯已保存");
      router.replace("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid items-center flex-col w-full p-6"
      >
        <div className="md:flex md:space-x-4 space-y-2 md:space-y-0">
          <FormField
            control={form.control}
            name="action"
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
                      defaultValue={String(field.value)}
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
            name="cycleTimeType"
            render={({ field }) => {
              return (
                <FormItem key={field.value} className="md:w-1/4 w-full">
                  <FormLabel>时间类型</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={String(field.value)}
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
          {fields.cycleTimeType !== "" && Type[Number(fields.cycleTimeType)]}
          {fields.action} {fields.amount}{" "}
          {fields.unit !== "" && Unit[Number(fields.unit)]}
        </p>
        <Button type="submit" className="mt-4">
          创 建
        </Button>
      </form>
    </Form>
  );
};

export default HabitForm;
