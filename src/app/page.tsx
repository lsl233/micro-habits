"use client";

import { Storage, useHabits } from "@/lib/storage";
import { Habit } from "@/types/habit";
import HabitItem from "./_components/habit-item";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import CompleteDrawer, { formSchema } from "./_components/complete-drawer";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

export default function Home() {
  const [habits] = useHabits();
  const [completeDrawerOpen, setCompleteDrawerOpen] = useState(false);
  const [currentHabit, setCurrentHabit] = useState<Habit | undefined>();
  const router = useRouter();

  const handleChange = (habit: Habit, checked: boolean) => {
    if (checked) {
      setCompleteDrawerOpen(checked);
      setCurrentHabit(habit);
    }
  };
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (currentHabit) {
      Storage.setItem<Habit>("habits", (item) => {
        if (item.id === currentHabit.id) {
          item.completed = true;
          item.count = values.count;
          return true;
        }
        return false;
      });
      setCompleteDrawerOpen(false);
      router.refresh();
    }
  };

  return (
    <main className="flex min-h-screen flex-col p-6">
      <h1 className="text-4xl border-b pb-4 mb-4">微习惯</h1>
      <Link href="/habits">
        <Button className="w-28 mb-4">
          <Plus />
          New
        </Button>
      </Link>
      <div className="flex flex-col space-y-2">
        {habits.map((habit) => (
          <HabitItem habit={habit} key={habit.id} onChange={handleChange} />
        ))}
      </div>
      
      <CompleteDrawer onSubmit={onSubmit} open={completeDrawerOpen} habit={currentHabit} />
    </main>
  );
}
