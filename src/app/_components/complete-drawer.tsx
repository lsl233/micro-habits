import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Habit } from "@/types/habit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Storage } from "@/lib/storage";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export const formSchema = z.object({
  amount:  z.coerce.number().min(1, { message: "最少输入1" }).or(z.string()),
});

const CompleteDrawer = ({ habitId, open, onSwitchDrawer }: { habitId: string; open: boolean; onSwitchDrawer: () => void }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 1,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // TODO: 提交
    try {
      await axios.post(`/api/todo`, { amount: values.amount, habitId });
      onSwitchDrawer();
      router.refresh();
      toast.success("提交成功");
    } catch (error) {
      console.log(error);
      toast.error("提交失败");
    }
  }

  return (
    <Drawer open={open}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>记录数值</DrawerTitle>
          <DrawerDescription>记录你实际完成的具体数值</DrawerDescription>
        </DrawerHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid items-center flex-col w-full p-6"
          >
            <div>
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
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
            </div>

            <DrawerFooter className="flex justify-center flex-row">
              <Button type="submit">提交</Button>
              <Button onClick={onSwitchDrawer} variant="outline">取消</Button>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};

export default CompleteDrawer;
