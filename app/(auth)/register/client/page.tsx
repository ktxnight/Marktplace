/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { custumerRegisterStep02, custumerRegisterStep03, custumerRegisterStep04, CustumerRegistrationStep01Error, CustumerRegistrationStep02Error, CustumerRegistrationStep03Error, CustumerRegistrationStep04Error, validateEmail } from "@/app/actions/register_client";
import { Button } from "@/app/components/button";
import { Input } from "@/app/components/input";
import { Select } from "@/app/components/select";
import { ECustomerRegistrationSteps, TCustomerRegister } from "@/app/interfaces/client";
import { STATES } from "@/app/mocks/states";
import Link from "next/link";
import { ChangeEvent, ChangeEventHandler, Dispatch, SetStateAction, useActionState, useEffect, useRef, useState } from "react"
import toast from "react-hot-toast";

interface IProps {
    client: Partial<TCustomerRegister>,
    setClient: Dispatch<SetStateAction<Partial<TCustomerRegister>>>
    setStep: Dispatch<SetStateAction<ECustomerRegistrationSteps>>
}

const initialStateStep01: FormState<CustumerRegistrationStep01Error> = { success: false }

function Step01({ setStep, setClient, client }: IProps) {
    const [state, formAction, isPending] = useActionState(validateEmail, initialStateStep01)
    const [email, setEmail] = useState<string>(client?.email || "");

    useEffect(() => {
        if (!state.success && email !== "") {
            let message: string = "Ocorreu um erro desconhecido"

            if (state.errors && state.errors.email) {
                message = state.errors.email[0]
            } else if (state.message) {
                message = state.message
            }

            toast.error(message)
        } else if (state.success) {
            setClient(prev => ({
                ...prev,
                email: email
            }))
            setStep(ECustomerRegistrationSteps.STEP02)
        }
    }, [state])

    return (
        <form action={formAction} className="flex flex-col gap-2 mt-2">
            <Input
                id="email"
                name="email"
                label="E-mail"
                required
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                placeholder="Ex: joao.nascimento@seudominio.com"
            />
            <Button type="submit" disabled={isPending}>{isPending ? "Carregando" : "Avançar"}</Button>
        </form>
    )
}

const initialStateStep02: FormState<CustumerRegistrationStep02Error> = { success: false }

function Step02({ setStep, setClient, client }: IProps) {
    const [state, formAction, isPending] = useActionState(custumerRegisterStep02, initialStateStep02)
    const [name, setName] = useState<string>(client?.name || "")
    const [document, setDocument] = useState<string>(client?.document || "")
    const [dateOfBirth, setDateOfBirth] = useState<string>(client.dateOfBirth?.toDateString() || "")
    const [phone, setPhone] = useState<string>(client?.phone || "")

    useEffect(() => {
        if (!state.success && (name !== "" || document !== "" || dateOfBirth !== "" || phone !== "")) {
            let message: string = "Ocorreu um erro desconhecido"

            if (state.errors && state.errors) {
                if (state.errors.name) message = state.errors.name[0]
                if (state.errors.document) message = state.errors.document[0]
                if (state.errors.dateOfBirth) message = state.errors.dateOfBirth[0]
                if (state.errors.phone) message = state.errors.phone[0]
            } else if (state.message) {
                message = state.message
            }

            toast.error(message)
        } else if (state.success) {
            setClient(prev => ({
                ...prev,
                name,
                document,
                dateOfBirth: dateOfBirth !== "" ? new Date(dateOfBirth) : undefined,
                phone
            }))
            setStep(ECustomerRegistrationSteps.STEP03)
        }
    }, [state])

    return (
        <form action={formAction} className="flex flex-col gap-2 mt-2">
            <Input id="name" name="name" value={name} onChange={e => setName(e.currentTarget.value)} required label="Nome Completo" maxLength={150} />
            <Input id="document" name="document" value={document} onChange={e => setDocument(e.currentTarget.value)} required label="CPF" maxLength={11} />
            <Input id="dateOfBirth" name="dateOfBirth" value={dateOfBirth} onChange={e => setDateOfBirth(e.currentTarget.value)} type="date" label="Data de Nascimento" />
            <Input id="phone" name="phone" value={phone} onChange={e => setPhone(e.currentTarget.value)} type="tel" required label="Telefone" />
            <div className="flex flex-row items-center gap-2">
                <Button type="button" onClick={() => setStep(ECustomerRegistrationSteps.STEP01)}>Voltar</Button>
                <Button type="submit" disabled={isPending}>{isPending ? "Carregando" : "Avançar"}</Button>
            </div>
        </form>
    )
}

const initialStateStep03: FormState<CustumerRegistrationStep03Error> = { success: false }

function Step03({ setStep, setClient, client }: IProps) {
    const [formState, formAction, isPending] = useActionState(custumerRegisterStep03, initialStateStep03)
    
    const [loading, setLoading] = useState<boolean>(false)

    const address = client?.address ? client.address[0] : undefined
    const [zipcode, setZipcode] = useState<string>(address?.zipcode || "")
    const [publicPlace, setPublicPlace] = useState<string>(address?.publicPlace || "")
    const [number, setNumber] = useState<string>(address?.number || "")
    const [neighborhood, setNeighborhood] = useState<string>(address?.neighborhood || "")
    const [complement, setComplement] = useState<string>(address?.complement || "")
    const [city, setCity] = useState<string>(address?.city || "")
    const [state, setState] = useState<string>(address?.state || "")

    const searchZipCode = async (value: string) => {
        setLoading(true)
        const response = await fetch(`https://viacep.com.br/ws/${value}/json/`)
            .then(data => data.json())
            .then(data => {
                if (data["erro"]) throw new Error()
                return {
                    publicPlace: data["logradouro"] || "",
                    complement: data["complemento"] || "",
                    neighborhood: data["bairro"] || "",
                    city: data["localidade"] || "",
                    state: data["uf"] || ""
                }
            })
            .catch(err => {
                console.log(err)
                toast.error("Não foi possível obter as informações do CEP");
                return null
            })
            .finally(() => setLoading(false))

        if (!response) return;

        setPublicPlace(response.publicPlace)
        setComplement(response.complement)
        setNeighborhood(response.neighborhood)
        setCity(response.city)
        setState(response.state)
    }

    const handleZipCode = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setZipcode(value)

        if (value.length === 8) searchZipCode(value)
    }

    useEffect(() => {
        if (!formState.success && (
            zipcode !== "" ||
            publicPlace !== "" ||
            number !== "" ||
            neighborhood !== "" ||
            city !== "" ||
            state !== ""
        )) {
            let message: string = "Ocorreu um erro desconhecido"

            if (formState.errors && formState.errors) {
                if (formState.errors.zipcode) message = formState.errors.zipcode[0]
                if (formState.errors.publicPlace) message = formState.errors.publicPlace[0]
                if (formState.errors.number) message = formState.errors.number[0]
                if (formState.errors.neighborhood) message = formState.errors.neighborhood[0]
                if (formState.errors.complement) message = formState.errors.complement[0]
                if (formState.errors.city) message = formState.errors.city[0]
                if (formState.errors.state) message = formState.errors.state[0]

            } else if (formState.message) {
                message = formState.message
            }

            toast.error(message)
        } else if (formState.success) {
            setClient(prev => ({
                ...prev,
                address: [{
                    zipcode,
                    publicPlace,
                    number,
                    neighborhood,
                    complement,
                    city,
                    state
                }]
            }))
            setStep(ECustomerRegistrationSteps.STEP04)
        }
    }, [formState])

    return (
        <form action={formAction} className="mt-2 grid grid-cols-4 gap-2 max-w-md">
            <Input id="zipcode" name="zipcode" value={zipcode} onChange={handleZipCode} disabled={loading} required label="CEP" />
            <div className="col-span-2">
                <Input id="publicPlace" name="publicPlace" value={publicPlace} onChange={(e) => setPublicPlace(e.currentTarget.value)} disabled={loading} required label="Endereço" />
            </div>
            <Input id="number" name="number" value={number} onChange={(e) => setNumber(e.currentTarget.value)} required label="Número" />

            <div className="col-span-2">
                <Input id="complement" name="complement" value={complement} onChange={(e) => setComplement(e.currentTarget.value)} disabled={loading} label="Complemento" />
            </div>
            <div className="col-span-2">
                <Input id="neighborhood" name="neighborhood" value={neighborhood} onChange={(e) => setNeighborhood(e.currentTarget.value)} disabled={loading} required label="Bairro" />
            </div>

            <div className="col-span-3">
                <Input id="city" name="city" value={city} onChange={(e) => setCity(e.currentTarget.value)} disabled={loading} required label="Cidade" />
            </div>
            <Select id="state" name="state" value={state} onChange={e => setState(e.currentTarget.value)} disabled={loading} required label="Estado">
                {
                    STATES
                        .sort((a, b) => a.acronym.localeCompare(b.acronym))
                        .map(stt => (
                            <option key={`stt-${stt.acronym}`} value={stt.acronym}>{stt.acronym}</option>
                        ))
                }
            </Select>

            <div className="col-span-4 flex flex-row items-center gap-2">
                <Button disabled={loading} type="button" onClick={() => setStep(ECustomerRegistrationSteps.STEP02)}>Voltar</Button>
                <Button disabled={loading || isPending} type="submit">
                    {isPending ? "Carregando" : "Avançar"}
                </Button>
            </div>
        </form>
    )
}

const initialStateStep04: FormState<CustumerRegistrationStep04Error> = { success: false }

function Step04({ setStep, setClient, client }: IProps) {
    const [state, formAction, isPending] = useActionState(custumerRegisterStep04, initialStateStep04)
    const [password, setPassword] = useState<string>(client?.password ||"")
    const [confPassword, setConfPassword] = useState<string>(client?.password ||"")

    useEffect(() => {
        if (!state.success && (password !== "" && confPassword !== "")) {
            let message: string = "Ocorreu um erro desconhecido"

            if (state.errors) {
               if (state.errors.password) message = state.errors.password[0]
               if (state.errors.confPassword) message = state.errors.confPassword[0]
            } else if (state.message) {
                message = state.message
            }

            toast.error(message)
        } else if (state.success) {
            setClient(prev => ({
                ...prev,
                password
            }))
            setStep(ECustomerRegistrationSteps.OVERVIEW)
        }
    })

    return (
        <form className="flex flex-col gap-2 mt-2" action={formAction}>
            <Input value={password} onChange={e => setPassword(e.currentTarget.value)} id="password" name="password" type="password" label="Senha" required />
            <Input value={confPassword} onChange={e => setConfPassword(e.currentTarget.value)} id="confPassword" name="confPassword" type="password" label="Confirmar Senha" required />
            <div className="flex flex-row gap-2 items-center">
                <Button type="button" onClick={() => setStep(ECustomerRegistrationSteps.STEP03)} >Voltar</Button>
                <Button type="submit" disabled={isPending}>{isPending ? "Carregando" : "Avançar"}</Button>
            </div>
        </form>
    )
}

function Overview({ setStep, client }: Omit<IProps, "setClient">) {
    const address = client.address ? client.address[0] : undefined
    return(
        <div className="grid grid-cols-4">
            <div className="col-span-4">
            <Input label="Nome Completo"value={client.name} disabled onChange={() => { }}/>
            </div>
            <div className="col-span-2">
            <Input label="E-mail"value={client.email} disabled onChange={() => { }}/>
            </div>
            <div className="col-span-2">
            <Input label="CPF" value={client.document} disabled onChange={() => { }}/>
            </div>
            <div className="col-span-2">
             <Input label="Data de Nascimento" type="date" value={client.dateOfBirth?.toDateString()} disabled onChange={() => { }}/>
            </div>
            <div className="col-span-2">
            <Input label="Telefone" value={client.phone} disabled onChange={() => { }}/>
            </div>
            <Input label="CEP"value={address?.zipcode} disabled onChange={() => { }}/>
            <div className="col-span-2">
            <Input label="Endereço"value={address?.publicPlace} disabled onChange={() => { }}/>
            </div>
            <Input label="Numero"value={address?.number} disabled onChange={() => { }}/>
            <div className="col-span-2">
            <Input label="Complemento"value={address?.complement} disabled onChange={() => { }}/>
            </div>
            <div className="col-span-2">
            <Input label="Bairro"value={address?.neighborhood} disabled onChange={() => { }}/>
            </div>
            <div className="col-span-2">
            <Input label="Cidade"value={address?.city} disabled onChange={() => { }}/>
            </div>
            <Input label="UF"value={address?.state} disabled onChange={() => { }}/>
            <div className="col-span-2">

            
            <Input 
                label="Senha"
                value={
                    Array.from({ length: client.password?.length || 8 })
                    .map(() => "*")
                    .join("")
                }
                disabled
                onChange={() => { }}
            />
            </div>
                <div className="col-span-4 flex flex-row gap-2 items-center">
                    <Button onClick={() => setStep(ECustomerRegistrationSteps.STEP04)}>Voltar</Button>
                    <Button>Cadastrar</Button>
                </div>
        </div>
    )
}
 
export default function Page() {
    const [step, setStep] = useState<ECustomerRegistrationSteps>(ECustomerRegistrationSteps.STEP01)
    const [client, setClient] = useState<TCustomerRegister>({})

    const render = () => {
        switch (step) {
            case ECustomerRegistrationSteps.STEP01:
                return <Step01 client={client} setClient={setClient} setStep={setStep} />
            case ECustomerRegistrationSteps.STEP02:
                return <Step02 client={client} setClient={setClient} setStep={setStep} />
            case ECustomerRegistrationSteps.STEP03:
                return <Step03 client={client} setClient={setClient} setStep={setStep} />
            case ECustomerRegistrationSteps.STEP04:
                return <Step04 client={client} setClient={setClient} setStep={setStep} />
            case ECustomerRegistrationSteps.OVERVIEW:
                return <Overview client={client} setStep={setStep} />
        }
    }

    useEffect(() => console.log(client), [client])

    return (
        <>
            <div>
                <ul className="flex flex-row items-center gap-1.5">
                    {
                        Array.from({ length: 5 })
                            .map((_, i) => (
                                <li key={`step-${i}`} className={`h-2 w-2 ${i <= step ? "bg-[#1c4694]" : "bg-gray-200"} rounded-full`} />
                            ))
                    }
                </ul>
            </div>
            {render()}
            <p className="mt-4 text-sm font-light">Já possui uma conta? <Link href={"/login"} className="text-[#1C4694] font-semibold">Entrar</Link></p>
        </>
    )
}