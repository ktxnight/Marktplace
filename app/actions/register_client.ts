/* eslint-disable @typescript-eslint/no-unused-vars */
"use server"

import { z } from "zod"
import { CustumerRegistrationSchema, Step01Schema, Step02Schema, Step03Schema, Step04Schema } from "../schemas/register.client.schema"
import { TCustomerRegister } from '../interfaces/client';

export type CustumerRegistrationStep01Error = {
    email?: string[]
}

export async function validateEmail(prev: FormState<CustumerRegistrationStep01Error>, formData: FormData): Promise<FormState<CustumerRegistrationStep01Error>> {

    const validatedFields = Step01Schema.safeParse(
        Object.fromEntries(formData.entries())
    )

    if (!validatedFields.success) {
        const { properties } = z.treeifyError(validatedFields.error)
        return {
            success: false,
            errors: {
                email: properties?.email?.errors,
            }
        }
    }


    const { email } = validatedFields.data

    try {
        return { success: true }
    } catch (err) {
        console.error(err)
        return { success: false, message: "Erro Interno do Servidor" }
    }
}

export type CustumerRegistrationStep02Error = {
    name?: string[],
    document?: string[],
    dateOfBirth?: string[],
    phone?: string[]
}

export async function custumerRegisterStep02(prev: FormState<CustumerRegistrationStep02Error>, formData: FormData): Promise<FormState<CustumerRegistrationStep02Error>> {

    const validatedFields = Step02Schema.safeParse(
        Object.fromEntries(formData.entries())
    )

    if (!validatedFields.success) {
        const { properties } = z.treeifyError(validatedFields.error)
        return {
            success: false,
            errors: {
                name: properties?.name?.errors,
                document: properties?.document?.errors,
                dateOfBirth: properties?.dateOfBirth?.errors,
                phone: properties?.phone?.errors
            }
        }
    }

    const { name, document, dateOfBirth, phone } = validatedFields.data

    try {
        return { success: true }
    } catch (err) {
        console.error(err)
        return { success: false, message: "Erro Interno do Servidor" }
    }
}

export type CustumerRegistrationStep03Error = {
    zipcode?: string[],
    publicPlace?: string[],
    number?: string[],
    neighborhood?: string[],
    complement?: string[],
    city?: string[],
    state?: string[],
}

export async function custumerRegisterStep03(prev: FormState<CustumerRegistrationStep03Error>, formData: FormData): Promise<FormState<CustumerRegistrationStep03Error>> {

    const validatedFields = Step03Schema.safeParse(
        Object.fromEntries(formData.entries())
    )

    if (!validatedFields.success) {
        const { properties } = z.treeifyError(validatedFields.error)
        return {
            success: false,
            errors: {
                zipcode: properties?.zipcode?.errors,
                publicPlace: properties?.publicPlace?.errors,
                number: properties?.number?.errors,
                neighborhood: properties?.neighborhood?.errors,
                complement: properties?.complement?.errors,
                city: properties?.city?.errors,
                state: properties?.state?.errors,
            }
        }
    }

    const { zipcode, publicPlace, number, neighborhood, complement, city, state } = validatedFields.data

    try {
        return { success: true }
    } catch (err) {
        console.error(err)
        return { success: false, message: "Erro Interno do Servidor" }
    }
}

export type CustumerRegistrationStep04Error = {
    password?: string[],
    confPassword?: string[]
}

export async function custumerRegisterStep04(prev: FormState<CustumerRegistrationStep04Error>, formData: FormData): Promise<FormState<CustumerRegistrationStep04Error>> {

    const validatedFields = Step04Schema.safeParse(
        Object.fromEntries(formData.entries())
    )

    if (!validatedFields.success) {
        const { properties } = z.treeifyError(validatedFields.error)
        return {
            success: false,
            errors: {
                password: properties?.password?.errors,
                confPassword: properties?.confPassword?.errors,
            }
        }
    }

    const { password, confPassword } = validatedFields.data

    if (password !== confPassword) {
        return {
            success: false,
            message: "As senhas não são iguais"
        }
    }

    try {
        return { success: true }
    } catch (err) {
        console.error(err)
        return { success: false, message: "Erro Interno do Servidor" }
    }
}

type CustumerRegistrationError = CustumerRegistrationStep01Error &
    CustumerRegistrationStep02Error  &
        CustumerRegistrationStep03Error  &
        Omit<CustumerRegistrationStep04Error, "confPassword">

export async function custumerRegister(prev: FormState<CustumerRegistrationError>, formData: FormData): Promise<FormState<CustumerRegistrationError>> {

    const validatedFields = CustumerRegistrationSchema.safeParse(Object.fromEntries(formData.entries()))

    if (!validatedFields.success) {
        const { properties } = z.treeifyError(validatedFields.error) 
        return {
            success: false,
            errors: {
                email: properties?.email?.errors,
                name: properties?.name?.errors,
                document: properties?.document?.errors,
                dateOfBirth: properties?.dateOfBirth?.errors,
                phone: properties?.phone?.errors,
                zipcode: properties?.zipcode?.errors,
                publicPlace: properties?.publicPlace?.errors,
                number: properties?.number?.errors,
                neighborhood: properties?.neighborhood?.errors,
                complement: properties?.complement?.errors,
                city: properties?.city?.errors,
                state: properties?.state?.errors,
            }
        }
    }

    try {
        const response = await fetch("http://localhost:3001/users", {
            method: "POST",
            headers: {
                "Content-Type": "aplication/json",
            },
            body: JSON.stringify(validatedFields.data)
        })
        const data = await response.json()
        return { success: true, message: "Cadastro realizado com sucesso"}
    } catch (err) {
        console.error(err)
        return { success: false, message: "Erro Interno do Servidor"}
    }
}