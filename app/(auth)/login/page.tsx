"use client"

import { login, LoginError } from "@/app/actions/login";
import { Button } from "@/app/components/button";
import { Input } from "@/app/components/input";
import Link from "next/link";
import { useActionState, useEffect } from "react"
import toast from "react-hot-toast";

const initialState: FormState<LoginError> = { success: false }

export default function Page() {
    const [state, formAction, isPending] = useActionState(login, initialState)

    useEffect(() => {

        if (state.success) {
            toast.success(state.message || "Login realizado com sucesso!")
        } else if (state.errors || state.message) {
            let message: string | undefined

            if (state.errors) {
                if (state.errors.email) {
                    message = state.errors.email[0]
                } else if (state.errors.password) {
                    message = state.errors.password[0]
                } else {
                    message = state.message
                }
            }

            toast.error(message || "Ocorreu um erro desconhecido")
        }

    }, [state])

    return (
        <>
            <form action={formAction} className="flex flex-col gap-2.5">
                <Input id="email" name="email" required type="email" label="E-mail" placeholder="Ex: seu-email@dominio.com" />
                <Input id="password" name="password" required type="password" label="Senha" placeholder="Ex: ••••••••" />
                <Button type="submit" disabled={isPending}>
                    {isPending ? "Carregando" : "Entrar"}
                </Button>
            </form>
            <p className="mt-4 text-sm font-light">Ainda não possui uma conta? <Link href={"/register/client"} className="text-[#1C4694] font-semibold">Criar conta!</Link></p>
        </>
    )
}