import { db } from "@/lib/db"
import { serverResponseError } from "@/lib/server-response"
import { Habit } from "@prisma/client"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const course = await db.habit.create({
            data: body
        })
        return NextResponse.json(course)
    } catch (error) {
        return serverResponseError(error, req)
    }
}