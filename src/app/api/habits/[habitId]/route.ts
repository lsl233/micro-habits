import { db } from "@/lib/db";
import { serverResponseError } from "@/lib/server-response";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request, { params }: { params: { habitId: string } }) => {
    try {
        const { habitId } = params;
        const body = await req.json();

        const updatedHabit = await db.habit.update({
            where: {
                id: habitId
            },
            data: body
        })
        return NextResponse.json(updatedHabit);
    } catch (error) {
        serverResponseError(error, req);
    }
}