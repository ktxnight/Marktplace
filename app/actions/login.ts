/* eslint-disable @typescript-eslint/no-unused-vars */
"use server"

import { LoginSchema } from "../schemas/login.schema";
import { z } from "zod"

export type LoginError = {
    email?: string[],
    password?: string[]
}

export async function login(prev: FormState<LoginError>, formData: FormData): Promise<FormState<LoginError>> {

    const validatedFields = LoginSchema.safeParse(
        Object.fromEntries(formData.entries())
    )

    if (!validatedFields.success) {
        const { properties } = z.treeifyError(validatedFields.error)
        return {
            success: false,
            errors: {
                email: properties?.email?.errors,
                password: properties?.password?.errors
            },
            message: "Verifique os campos informados!"
        }
    }

    const { email, password } = validatedFields.data

    try {
        return { success: true, message: "Login realizado com sucesso!" }
    } catch (err) {
        console.error(err)
        return { success: false, message: "Erro Interno do Servidor" }
    }
}