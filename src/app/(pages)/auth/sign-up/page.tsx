"use client";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/wrap/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z
  .object({
    email: z.string({ required_error: "请输入邮箱" }).email("请输入正确的邮箱"),
    password: z
      .string({ required_error: "请输入密码" })
      .min(8, "最少输入8位字符密码"),
    confirmPassword: z.string({ required_error: "请输入确认密码" }),
  })

  // .superRefine(({ password, confirmPassword }, ctx) => {
  //   if (password !== confirmPassword) {
  //     ctx.addIssue({
  //       code: z.ZodIssueCode.custom,
  //       path: ["confirmPassword"],
  //       message: "两次输入的密码不一致，请重新输入"
  //     });
  //   }
  // });

const SignUpPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true)
      await fetch('/api/auth/sign-up', { method: 'POST', body: JSON.stringify(data) })
      router.replace("/")
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <CardHeader>
        <CardTitle>注册</CardTitle>
        <CardDescription>邮箱、密码注册</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid items-center flex-col w-full space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>邮箱</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入邮箱" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>密码</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="请输入密码"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>确认密码</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="请输入确认密码"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Button loading={loading} type="submit" className="w-full">
              提 交
            </Button>
          </form>
        </Form>
      </CardContent>
    </>
  );
};

export default SignUpPage;
