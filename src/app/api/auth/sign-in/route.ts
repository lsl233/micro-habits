import { signIn } from "@/app/auth";
import { serverResponseError } from "@/lib/server-response";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const data = await req.json();
        const signInResponse = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });
        console.log(signInResponse, 'signInResponse');
        return NextResponse.json(signInResponse);
    } catch (error) {
        return serverResponseError(error, req);
    }
}