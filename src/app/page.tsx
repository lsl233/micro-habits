"use client";

import { Storage } from "@/lib/storage";
import { Habit } from "@/types/habit";
import HabitItem from "./_components/habit-item";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    setHabits(Storage.get<Habit[]>("habits"));
  }, []);

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
          <HabitItem habit={habit} key={habit.id} />
        ))}
      </div>
    </main>
  );
}
