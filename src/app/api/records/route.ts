import { db } from "@/lib/db";
import { serverResponseError } from "@/lib/server-response";
import { Habit } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const createdRecord = await db.record.create({ data });

    return NextResponse.json(createdRecord);
  } catch (error) {
    return serverResponseError(error, req);
  }
}
