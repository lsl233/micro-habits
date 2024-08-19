
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { OneDayTodo } from "@/types";
import { TodoList } from "./_components/todo-list";
import { Todo } from "@prisma/client";

export default async function Home() {
  const todayTodo: OneDayTodo[] = [];

  const habits = await db.habit.findMany({
    include: {
      records: true,
    },
  });

  for (const habit of habits) {
    if (habit.cycleTimeType === "0") {
      if (habit.records.length) {
        const res = await db.todo.findMany({
          where: {
            createdAt: {
              gte: new Date(new Date().setHours(0, 0, 0, 0)),
              lt: new Date(new Date().setHours(23, 59, 59, 999)),
            },
          },
        })
        todayTodo.concat(res as OneDayTodo[])
      } else {
        todayTodo.push({
          habitId: habit.id,
          amount: habit.amount,
          title: `${habit.cycleTimeType} ${habit.action} ${habit.amount} ${habit.unit}`,
          completed: false,
        });
      }
    }
  }

  // 每天执行一次
  console.log("[Todo]", todayTodo);

  // console.log(habits)

  // const [record, setRecord, updateRecord] = useStorage<Record[]>("record", []);
  // const [habits, setHabits, updateHabit] = useHabits();
  // const [completeDrawerOpen, setCompleteDrawerOpen] = useState(false);
  // const [currentHabit, setCurrentHabit] = useState<Habit | undefined>();
  // const router = useRouter();

  // const handleChange = (habit: Habit, checked: boolean) => {
  //   if (checked) {
  //     setCompleteDrawerOpen(checked);
  //     setCurrentHabit(habit);
  //   }
  // };

  // const handleCancelComplete = (habitId: string) => {
  //   setRecord(record.filter(r => r.habitId !== habitId));
  // }

  // const handleOpenCompleteDrawer = (habit: Habit) => {
  //   setCompleteDrawerOpen(true);
  //   setCurrentHabit(habit);
  // }

  // const onSubmit = (values: z.infer<typeof formSchema>) => {
  //   if (currentHabit) {
  //     updateRecord([{
  //       habitId: currentHabit.id,
  //       id: new Date().getTime().toString(),
  //       amount: values.amount,
  //       completed: true,
  //       createdAt: new Date().getTime().toString(),
  //       updatedAt: new Date().getTime().toString()
  //     }])
  //     // updateHabit(currentHabit.id, { completed: true });
  //     setCompleteDrawerOpen(false);
  //     router.refresh();
  //   }
  // };

  // return (
  //   <div></div>
  // )

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
