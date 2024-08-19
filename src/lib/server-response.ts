import { NextResponse } from "next/server";

export const serverResponseError = (error: any, req: Request) => {
    console.error(`[${req.method} ${req.url}]`, error);
    if (error instanceof Error) {
        return new NextResponse("Internal Error", { status: 500, statusText: error.message });
    } else {
        return new NextResponse("Internal Error", { status: 500 });
    }
}