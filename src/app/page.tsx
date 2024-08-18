"use client";

import { Storage, useHabits, useStorage } from "@/lib/storage";
import { Habit, Record } from "@/types/habit";
import HabitItem from "./_components/habit-item";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import CompleteDrawer, { formSchema } from "./_components/complete-drawer";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

export default function Home() {
  const [record, setRecord, updateRecord] = useStorage<Record[]>("record", []);
  const [habits, setHabits, updateHabit] = useHabits();
  const [completeDrawerOpen, setCompleteDrawerOpen] = useState(false);
  const [currentHabit, setCurrentHabit] = useState<Habit | undefined>();
  const router = useRouter();

  const handleChange = (habit: Habit, checked: boolean) => {
    if (checked) {
      setCompleteDrawerOpen(checked);
      setCurrentHabit(habit);
    }
  };

  const handleCancelComplete = (habitId: string) => {
    setRecord(record.filter(r => r.habitId !== habitId));
  }

  const handleOpenCompleteDrawer = (habit: Habit) => {
    setCompleteDrawerOpen(true);
    setCurrentHabit(habit);
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (currentHabit) {
      updateRecord([{
        habitId: currentHabit.id,
        id: new Date().getTime().toString(),
        amount: values.amount,
        completed: true,
        createdAt: new Date().getTime().toString(),
        updatedAt: new Date().getTime().toString()
      }])
      // updateHabit(currentHabit.id, { completed: true });
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
          <HabitItem habit={habit} key={habit.id} onCancelComplete={handleCancelComplete} onOpenCompleteDrawer={handleOpenCompleteDrawer} />
        ))}
      </div>
      
      <CompleteDrawer onSubmit={onSubmit} open={completeDrawerOpen} habit={currentHabit} />
    </main>
  );
}
