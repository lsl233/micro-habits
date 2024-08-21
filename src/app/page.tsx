import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { HabitWithRecords, TodayDayTodo, TodoWithHabit } from "@/types";
import { TodoList } from "./_components/todo-list";
import { Todo } from "@prisma/client";

export const dynamic = 'force-dynamic'

export default async function Home() {
  const todayTodo: TodayDayTodo[] = [];

  // const todo: TodoWithHabit[] = await ;
  const habits: HabitWithRecords[] = await db.habit.findMany({
    where: {
      userId: "abf7fcd1-7562-47f4-abff-a5387c765651",
    },
    include: {
      records: {
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
            lt: new Date(new Date().setHours(23, 59, 59, 999)),
          },
        },
      },
    },
  })

  const generateTodayTodo = (habits: HabitWithRecords[]) => {
    habits.forEach((habit) => {
      const records = habit.records

      todayTodo.push({
        id: records.length > 0 ? records[0].id : '',
        habitId: habit.id,
        amount: habit.amount,
        userId: habit.userId,
        action: habit.action,
        unit: habit.unit,
        loading: false,
        cycleTimeType: habit.cycleTimeType,
        completed: records.length > 0,
      })
    })
  }

  generateTodayTodo(habits)



  console.log(habits)

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
        <TodoList todoList={todayTodo} />
      </div>
    </main>
  );
}
