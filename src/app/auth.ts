import NextAuth from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
// Your own logic for dealing with plaintext password strings; be careful!
import zod from "zod";
import crypto from "crypto";
import { db } from "@/lib/db";

export const signInSchema = zod.object({
  email: zod
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: zod
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: process.env.NODE_ENV === "development",
  trustHost: true,
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // http://localhost:3000/api/auth/signin
      credentials: {
        email: {},
        password: {},
      },
      
      authorize: async (credentials) => {
        try {
          let user = null;
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          // logic to salt and hash password
          const pwHash = crypto
            .createHash("sha256")
            .update(password)
            .digest("hex");

          user = await db.user.findFirst({
            where: {
              email,
              password: pwHash,
            },
            select: {
              id: true,
              email: true,
            },
          });

          console.log("[user id]", user?.id);

          if (!user) {
            throw new Error("User not found.");
          }

          return user;
        } catch (error) {
          console.error("[error]", error);
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
  },
});
