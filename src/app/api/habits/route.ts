import { db } from "@/lib/db";
import { serverResponseError } from "@/lib/server-response";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const createdHabit = await db.habit.create({ data });

    return NextResponse.json(createdHabit);
  } catch (error) {
    return serverResponseError(error, req);
  }
}
