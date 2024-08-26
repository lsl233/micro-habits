import { signIn } from "@/app/auth";
import { db } from "@/lib/db";
import { serverResponseError } from "@/lib/server-response";
import { NextResponse } from "next/server";
import crypto from "crypto";

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    const hashedPassword = crypto.createHash("sha256").update(data.password).digest("hex");

    const createdUser = await db.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
      },
    });

    const signInResponse = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (signInResponse.error) {
      throw new Error(signInResponse.error);
    }

    return NextResponse.json(createdUser);
  } catch (error) {
    return serverResponseError(error, req);
  }
};
