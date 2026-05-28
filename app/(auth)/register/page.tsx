"use client"

import { Button } from "@/app/components/button";
import { Input } from "@/app/components/input";
import Link from "next/link";
import { SubmitEvent } from "react"

export default function Page() {

    const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        const name = formData.get("name")
        const email = formData.get("email")
        const password = formData.get("password")
        const confPassword = formData.get("conf-password")

        console.log(name?.toString(), email?.toString(), password?.toString(), confPassword?.toString())
    }

    return (
        <>
            <form onSubmit={onSubmit} className="flex flex-col gap-2">
                <Input
                id="name"
                name="name"
                label="Nome Completo"
                required
                placeholder="Ex: João Nascimento da Silva" 
                />
                <Input
                    id="email"
                    name="email"
                    label="E-mail"
                    required
                    placeholder="Ex: joao.nascimento@seudominio.com"
                />
                <Input
                    id="password"
                    name="password"
                    type="password"
                    label="Senha"
                    required
                    placeholder="Ex: ••••••••"
                />
                <Input
                id="conf-password"
                    name="conf-password"
                    type="password"
                    label="Confirmar Senha"
                    required
                    placeholder="Ex: ••••••••"
                />
                <Button type="submit">Cadastrar</Button>
            </form>
            <p className="mt-4 text-sm font-light">Já possui uma conta? <Link href={"/login"} className="text-[#1C4694] font-semibold">Entrar!</Link></p>
        </>
    )
}