import { Button } from "@/components/ui/button";
import { CalendarPlus } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { HabitWithRecords, TodayDayTodo, TodoWithHabit } from "@/types";
import { TodoList } from "./_components/todo-list";
import { auth } from "./auth";
import { redirect } from "next/navigation";

// export const dynamic = "force-dynamic";

export default async function Home() {
  const todayTodo: TodayDayTodo[] = [];
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect("/auth/sign-in");
  }
  console.log("[user id page]", user.id);
  const habits: HabitWithRecords[] = await db.habit.findMany({
    where: {
      userId: user.id,
    },
    include: {
      records: {
        where: {
          createdAt: {
            gte: new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 1)),
            lt: new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 6)),
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const generateTodayTodo = (habits: HabitWithRecords[]) => {
    habits.forEach((habit) => {
      const records = habit.records;

      todayTodo.push({
        id: records.length > 0 ? records[0].id : "",
        habitId: habit.id,
        amount: habit.amount,
        actualAmount: records.length > 0 ? records[0].amount : 0,
        userId: habit.userId,
        action: habit.action,
        unit: habit.unit,
        loading: false,
        cycleTimeType: habit.cycleTimeType,
        completed: records.length > 0,
        records,
      });
    });
  };

  generateTodayTodo(habits);


  return (
    <>
      <Link className="inline-flex justify-start" href="/habits">
        <Button className="w-28 mb-4">
          <CalendarPlus className="w-4 h-4 mr-2" />
          New
        </Button>
      </Link>
      <div className="flex flex-col space-y-2 w-full">
        <TodoList todoList={todayTodo} />
      </div>
    </>
  );
}
