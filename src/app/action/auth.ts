"use server"

import { signIn as authSignIn } from "@/app/auth"
import { isRedirectError } from "next/dist/client/components/redirect"
import { redirect } from "next/navigation"

export const signIn = async (formData: FormData) => {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
        const result = await authSignIn("credentials", { email, password, redirect: false })
        console.log(result, 'sign in')
    } catch (error) {
        if (isRedirectError(error)) {
            console.error(error)
            throw error
        }
        console.error(error)
    } finally {
        redirect("/")
    }
}