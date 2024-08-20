import * as cron from "node-cron";
import { db } from "@/lib/db";

const insertTodo = async () => {
  try {
    const habits = await db.habit.findMany();
    await db.todo.createMany({
      data: habits.map((habit) => ({
        habitId: habit.id,
        amount: habit.amount,
        completed: false,
        userId: habit.userId,
      })),
    });
    console.log("[Schedule Task] Todo created successfully");
  } catch (error) {
    console.error("[Schedule Task] Error creating todo:", error);
  }
};

insertTodo();

cron.schedule("0 0 * * *", insertTodo);


