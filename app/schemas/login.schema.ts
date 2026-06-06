import { z } from "zod"

export const LoginSchema = z.object({
    email: z.email("E-mail inválido"),
    password: z.string("A senha é obrigatória")
})