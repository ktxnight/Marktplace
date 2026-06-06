import { ReactNode } from "react";
import { Card } from "../components/card";

interface IProps {
    children: ReactNode
}

export default function Layout({ children }: Readonly<IProps>) {
    return (
        <>
            <header className="h-14 bg-[#1c4694] w-full flex items-center px-4">
                <h1 className="text-xl text-white font-semibold">Marketplace</h1>
            </header>
            <main className="flex items-center justify-center flex-1">
                <Card>
                    {children}
                </Card>
            </main>
        </>
    )
}