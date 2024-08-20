import { db } from "@/lib/db";
import { serverResponseError } from "@/lib/server-response";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body = await req.json();

  try {
    const createdTodo = await db.todo.create({
      data: {
        userId: body.userId, // Add userId field
        habit: {
          connect: {
            id: body.habitId
          }
        },
        amount: body.amount,
        completed: true,
      },
    });
    return NextResponse.json(createdTodo);
  } catch (error) {
    return serverResponseError(error, req);
  }
};
