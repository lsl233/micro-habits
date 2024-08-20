import { db } from "@/lib/db";
import { serverResponseError } from "@/lib/server-response";
import { Habit } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const createdHabit = await db.habit.create({ data });

    // // 自动创建 TODO
    // await db.todo.create({
    //   data: {
    //     habitId: createdHabit.id,
    //     amount: createdHabit.amount,
    //     completed: false,
    //     userId: createdHabit.userId,
    //   },
    // });

    return NextResponse.json(createdHabit);
  } catch (error) {
    return serverResponseError(error, req);
  }
}
