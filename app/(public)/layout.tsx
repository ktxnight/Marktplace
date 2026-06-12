import { ReactNode } from "react";
import { Header } from "./components/header";

interface IProps {
    children: ReactNode
}

export default function Layout({ children }: Readonly<IProps>) {
    return (
        <>
            <Header/>
            { children }
        </>
    )
}