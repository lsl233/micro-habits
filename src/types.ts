import { Habit, Prisma, Todo } from "@prisma/client";
import { Optional } from "@prisma/client/runtime/library";

export interface TodayDayTodo
  extends Omit<Habit, "id" | "createdAt" | "updatedAt" | "done"> {
    habitId: string;
    completed: boolean;
    id?: string;
}

export type TodoWithHabit = Prisma.TodoGetPayload<{
  include: { habit: true };
}>;

export type HabitWithRecords = Prisma.HabitGetPayload<{
  include: { records: true };
}>;
