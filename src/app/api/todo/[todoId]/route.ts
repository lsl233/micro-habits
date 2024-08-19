import { db } from "@/lib/db";
import { serverResponseError } from "@/lib/server-response";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { todoId: string } }
) => {
  const { todoId } = params;
  const body = await req.json();

  try {
    await db.todo.update({
      where: {
        id: todoId,
      },
      data: body,
    });

    return NextResponse.json({ message: "删除成功" });
  } catch (error) {
    return serverResponseError(error, req);
  }
};
