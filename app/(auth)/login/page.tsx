"use client"

import { Button } from "@/app/components/button";
import { Input } from "@/app/components/input";
import Link from "next/link";
import { SubmitEvent } from "react"

export default function Page() {

    const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        const email = formData.get("email")
        const password = formData.get("password")

        console.log(email?.toString(), password?.toString())
    }

    return (
        <>
            <form onSubmit={onSubmit} className="flex flex-col gap-2.5">
                <Input id="email" name="email" required type="email" label="E-mail" placeholder="Ex: seu-email@dominio.com" />
                <Input id="password" name="password" required type="password" label="Senha" placeholder="Ex: ••••••••" />
                <Button type="submit">Entrar</Button>
            </form>
            <p className="mt-4 text-sm font-light">Ainda não possui uma conta? <Link href={"/register"} className="text-[#1C4694] font-semibold">Criar conta!</Link></p>
        </>
    )
}