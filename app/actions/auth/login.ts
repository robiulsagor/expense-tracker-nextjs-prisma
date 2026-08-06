"use server"

import { signIn } from "@/auth"

export const login = async (email: string, password: string) => {
    await signIn("credentials", {
        email,
        password,
        redirectTo:"/"
    })
}