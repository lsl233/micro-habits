import { Habit, Prisma, Todo, Record } from "@prisma/client";
import { Optional } from "@prisma/client/runtime/library";

export interface TodayDayTodo
  extends Omit<Habit, "id" | "createdAt" | "updatedAt" | "done"> {
    habitId: string;
    completed: boolean;
    loading: boolean;
    id?: string;
    actualAmount?: number;
    records?: Record[];
}

export type TodoWithHabit = Prisma.TodoGetPayload<{
  include: { habit: true };
}>;

export type HabitWithRecords = Prisma.HabitGetPayload<{
  include: { records: true };
}>;

export type RecordWithHabit = Prisma.RecordGetPayload<{
  include: { habit: true };
}>;
