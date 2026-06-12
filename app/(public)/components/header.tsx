"use client"

/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode, useState } from "react";
import { CATEGORIES } from "@/app/mocks/categories";
import Link from "next/link";
import { IoCart, IoClose, IoTrash } from "react-icons/io5";
import { Button } from "@/app/components/button";
import { MdFavorite } from "react-icons/md";
import { HiMenu } from "react-icons/hi";
import { FaAngleRight, FaMinus, FaPlus, FaUserCircle } from "react-icons/fa";
import { useCart } from "@/app/contexts/cart.context";

function HeaderButton({ children, onClick }: { children: ReactNode, onClick?: () => void }) {
    return (
        <Button onClick={onClick} className="h-6 w-6 hover:bg-[#03738C22] hover:text-[#00BC99] cursor-pointer rounded-md flex items-center justify-center">
            {children}
        </Button>
    )
}

function SidebarItem({ href, label }: { href: string, label: string }) {
    return (
        <Link href={href}>
            <li className="px-2 hover:bg-[#00BC99] h-6 flex items-center justify-center">
                {label}
                <FaAngleRight />
            </li>
        </Link>
    )
}

function SidebarList({ keyItem, label, data }: { keyItem: string, label: string, data: Array<{ id: number, label: string, href: string }> }) {
    return (
        <ul className="text-[10px] text-slate-600 px-2">
            <label className="font-bold text-[11px] mb-2">{label}</label>
            {
                data
                    .map(vl => <SidebarItem key={`${keyItem}-${vl.id}`} href={vl.href} label={vl.label} />)
            }
        </ul>
    )
}

export function Header() {
    const [show, setShow] = useState<boolean>(false)
    const [showCart, setShowCart] = useState<boolean>(true);
    const { cart } = useCart();
    return (
        <>
            <header className="w-full">
                <div className="h-10 bg-[#012E40] text-white flex flex-row items-center gap-2 px-2">
                    <div className="h-full flex-1 flex flex-row items-center">
                        <HeaderButton onClick={() => setShow(true)}>
                            <HiMenu />
                        </HeaderButton>
                        <h1>Marktplace</h1>
                    </div>
                    <div className="h-full flex-1 flex flex-row justify-end items-center gap-2 p-2">
                        {/* FAVORITOS */}
                        <HeaderButton>
                            <MdFavorite />
                        </HeaderButton>
                        {/* CARRINHO */}
                        <HeaderButton onClick={() => setShowCart(true)}>
                            <IoCart />
                        </HeaderButton>
                        {/* LOGIN */}
                        <Link href="/login" className="bg-[#03738C] text-[10px] font-semibold rounded-lg px-4 py-1">Login</Link>
                    </div>
                </div>
                <div className="bg-[#03738c] text-white w-full">
                    <ul className="flex flex-row justify-center flex-wrap items-center text-[10px] text-center">
                        {
                            CATEGORIES
                                .filter(vl => vl.highlights)
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map((vl, i) => (
                                    <Link key={`category-${vl.id}`} href={vl.path}>
                                        <li className="px-2 hover:bg-[#00BC99] h-6 flex items-center justify-center">
                                            {vl.name}
                                        </li>
                                    </Link>
                                ))
                        }
                    </ul>
                </div>
            </header>

            <section className={`absolute h-svh bg-white border-slate-100 border-r-2 shadow-lg rounded-tr-md rounded-br-md transition-all duration-700 ease-in-out ${show ? "w-50" : "w-0"}`}>
                <div className="relative h-full">
                    {show && (<button onClick={() => setShow(false)} className="absolute -right-3 top-2 bg-[#00BC99] flex items-center justify-center text-white h-6 w-6 rounded-md cursor-pointer hover:text-[#012E40] shadow-lg"><IoClose />
                    </button>)}

                    <div className="bg-[#012E40] overflow-hidden h-15 w-full text-white">
                        <div className="h-full p-2 flex felx-row gap-2 items-center">
                            <div className="h-8 w-8 p-2">
                                <FaUserCircle size={26} />
                            </div>
                            <div className="h-8 flex-1 flex ">
                                <Link href={"/login"} className="flex flex-col hover:text-[#00BC99]">
                                    <span className="text-[10px]">Olá</span>
                                    <span className="text-xs font-vold"> Entre com sua conta</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="h-[calc(100%-60px)] w-full overflow-y-scroll flex flex-col gap-2">
                        <SidebarList keyItem="category-lat" label="Top 5 Lojistas" data={
                            CATEGORIES
                                .slice(0, 5)
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map(vl => ({
                                    id: vl.id,
                                    label: vl.name,
                                    href: vl.path
                                }))
                        } />
                        <SidebarList keyItem="category-lat" label="Categorias" data={
                            CATEGORIES
                                .slice(0, 5)
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map(vl => ({
                                    id: vl.id,
                                    label: vl.name,
                                    href: vl.path
                                }))

                        } />
                    </div>
                </div>
            </section>

            <section className={`absolute inset-y-0 right-0 bg-white shadow-lg rounded-tr-md rounded-br-md transition-all duration-700 ease-in-out ${showCart ? "w-50" : "w-0"}`}>
                <div className="relative h-full">
                    {showCart && (<button onClick={() => setShowCart(false)} className="absolute -left-3 top-2 bg-[#00BC99] flex items-center justify-center text-white h-6 w-6 rounded-md cursor-pointer hover:text-[#012E40] shadow-lg">
                        <IoClose />
                    </button>)}

                    <div className="h-[calc(100%-60px)] w-full py-2 overflow-y-scroll flex flex-col gap-2">
                        <ul>
                            <label>Carrinho</label>
                            {
                                cart.products
                                    .map((product) => (
                                        <li key={`cart-${product.id}`}>
                                            <div className="flex flex row gap-1.5">
                                                <div className="bg-red-600 h-8 w-8 rounded-md overflow-hidden"></div>
                                                <div className="flex-1">
                                                    <div className="flex flex-row items-center justify-between">
                                                        <div>
                                                            <div className="text-xs font-bold">{product.name}</div>
                                                            <div className="text-[8px] text-slate-500">
                                                                {
                                                                    CATEGORIES
                                                                        .find(ct => ct.id === product.categoryID)?.name || "Não identificada"
                                                                }
                                                            </div>
                                                        </div>
                                                        <button className="bg-red-200 text-red-600 h-5 w-5 rounded-md flex items-center justify-center">
                                                            <IoTrash size={12} />
                                                        </button>
                                                    </div>
                                                    <div className="flex flex-row items-center justify-between">
                                                        <div>
                                                            <div className="flex flex-row items-center">
                                                                <button className="flex items-center justify-center w-5 h-5 rounded-l-md bg-[#012E40] text-white cursor-pointer hover:text-[#00BC99]">
                                                                    <FaMinus size={6} />
                                                                </button>
                                                                <div className="border-y border-slate-500 text-slate-600 w-8 h-5 flex items-center justify-center text-[10px]">{product.amount}</div>
                                                                <button className="flex items-center justify-center w-5 h-5 rounded-r-md bg-[#012E40] text-white cursor-pointer hover:text-[#00BC99]">
                                                                    <FaPlus size={6} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            {product.amount * product.price}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                            }
                        </ul>
                    </div>

                    <div className="bg-[#012E40] overflow-hidden h-15 w-full text-white">

                    </div>
                </div>
            </section>
        </>
    )
}