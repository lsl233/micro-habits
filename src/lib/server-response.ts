import { NextResponse } from "next/server";

export const serverResponseError = (error: any, req: Request) => {
    console.error(`[${req.method} ${req.url}]`, error);
    if (error instanceof Error) {
        return new NextResponse(error.message, { status: 500 });
    } else {
        return new NextResponse("Internal Error", { status: 500 });
    }
}