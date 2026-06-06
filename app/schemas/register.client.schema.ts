/* eslint-disable @typescript-eslint/no-unused-vars */
import { EXPORT_DETAIL } from "next/dist/shared/lib/constants"
import { z } from "zod"

export const Step01Schema = z.object({
    email: z.email("E-mail inválido"),
})

export const Step02Schema = z.object({
    name: z.string("O nome é de preenchimento obrigatório"),
    document: z.string("O CPF é de preenchimento obrigatório"),
    dateOfBirth: z.string("A data de nascimento deve ser uma data válida").optional(),
    phone: z.string("O telefone é de preenchimento obrigatório")
})

export const Step03Schema = z.object({
    zipcode: z.string(),
    publicPlace: z.string(),
    number: z.string(),
    neighborhood: z.string(),
    complement: z.string().optional(),
    city: z.string(),
    state: z.string(),
})

export const Step04Schema = z.object({
    password: z.string(),
    confPassword: z.string()
})