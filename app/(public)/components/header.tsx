"use client"

import { Button } from "@/app/components/button"
import { useCart } from "@/app/contexts/cart.context"
import { CATEGORIES } from "@/app/mocks/categories"
import Link from "next/link"
import { ReactNode, useState } from "react"
import { FaAngleRight, FaMinus, FaPlus, FaUserCircle } from "react-icons/fa"
import { HiMenu } from "react-icons/hi"
import { IoCart, IoClose, IoTrash } from "react-icons/io5"
import { MdFavorite, MdHideImage } from "react-icons/md"

function HeaderButton({ children, onClick, notification }: {
    children: ReactNode,
    onClick?: () => void,
    notification?: number
}) {
    return (
        <Button onClick={onClick} className="relative h-6 w-6 hover:bg-[#03738C22] hover:text-[#00BC99] cursor-pointer rounded-md flex items-center justify-center">
            {
                notification !== undefined &&
                notification > 0 &&
                (
                    <div className="absolute h-3 w-3 flex items-center justify-center -top-px -right-px bg-[#00BC99] text-[6px] text-white rounded-full p-px">
                        {notification}
                    </div>
                )
            }
            {children}
        </Button>
    )
}

function SidebarItem({ href, label }: { href: string, label: string }) {
    return (
        <Link href={href}>
            <li className="flex flex-row items-center gap-2 justify-between hover:bg-gray-50 hover:text-[#00BC99] cursor-pointer px-2 py-1.5 border-b border-slate-200">
                {label}
                <FaAngleRight />
            </li>
        </Link>
    )
}

function SidebarList({
    keyItem,
    label,
    data
}: {
    keyItem: string,
    label: string,
    data: Array<{ id: number, label: string, href: string }>
}) {
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

function CartItem({ data, add, remove }: {
    data: IProductCart,
    remove: (product: IProductCart) => void,
    add: (product: IProductCart) => void
}) {

    return (
        <div className="flex flex-row gap-1.5">
            <div className="text-slate-300 h-8 w-8 rounded-md overflow-hidden flex items-center justify-center">
                <MdHideImage size={25} />
            </div>
            <div className="flex-1">
                <div className="flex flex-row items-center justify-between">
                    <div>
                        <div className="text-xs font-bold">{data.name}</div>
                        <div className="text-[8px] text-slate-500">
                            {
                                CATEGORIES
                                    .find(ct => ct.id === data.categoryID)?.name || "Não identificada"
                            }
                        </div>
                    </div>
                    <button onClick={() => remove(data)} className="cursor-pointer bg-red-200 text-red-600 h-5 w-5 rounded-md flex items-center justify-center">
                        <IoTrash size={12} />
                    </button>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center gap-2">
                        <div className="flex flex-row items-center">
                            <button onClick={() => remove({ ...data, amount: 1 })} className="flex items-center justify-center w-4 h-4 rounded-l-md bg-[#012E40] text-white cursor-pointer hover:bg-[#03738C22] hover:text-[#00BC99]">
                                <FaMinus size={6} />
                            </button>
                            <div className="border-y border-slate-500 text-slate-600 w-6 h-4 flex items-center justify-center text-[8px]">{data.amount}</div>
                            <button onClick={() => add({ ...data, amount: 1 })} className="flex items-center justify-center w-4 h-4 rounded-r-md bg-[#012E40] text-white cursor-pointer hover:bg-[#03738C22] hover:text-[#00BC99]">
                                <FaPlus size={6} />
                            </button>
                        </div>
                    </div>
                    <div className="text-[12px] flex flex-row gap-px font-bold text-[#012E40]">
                        <div className="text-[8px]">R$</div>
                        {(data.price * data.amount).toLocaleString("pt-br", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export function Header() {
    const [show, setShow] = useState<boolean>(false);
    const [showCart, setShowCart] = useState<boolean>(false);
    const { cart, add, remove } = useCart();

    return (
        <>
            {/* CABEÇALHO */}
            <header className="w-full">
                <div className="h-10 bg-[#012E40] text-white flex flex-row items-center gap-2 px-2">
                    <div className="h-full flex-1 flex flex-row items-center gap-2">
                        <HeaderButton onClick={() => setShow(true)}>
                            <HiMenu />
                        </HeaderButton>
                        <Link href={"/"}>
                            <h1>Marketplace</h1>
                        </Link>
                    </div>
                    <div className="h-full flex-1 flex flex-row justify-end items-center gap-2 p-2">
                        {/* FAVORITOS */}
                        <HeaderButton>
                            <MdFavorite />
                        </HeaderButton>
                        {/* CARRINHO */}
                        <HeaderButton onClick={() => setShowCart(true)} notification={cart.products.reduce((prev, curr) => prev + curr.amount, 0)}>
                            <IoCart />
                        </HeaderButton>
                        {/* LOGIN */}
                        <Link href="/login" className="bg-[#00BC99] hover:bg-[#03738C88] text-[10px] font-semibold rounded-lg px-4 py-1">Login</Link>
                    </div>
                </div>
                <div className="bg-[#03738c] text-white w-full">
                    <ul className="flex flex-row justify-center flex-wrap items-center text-[10px] text-center">
                        {
                            CATEGORIES
                                .filter(vl => vl.highlights)
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map(vl => (
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

            {/* MENU LATERAL */}
            <section className={`absolute h-svh bg-white shadow-lg rounded-tr-md rounded-br-md transition-all duration-700 ease-in-out ${show ? "w-50" : "w-0"}`}>
                <div className="relative h-full">
                    {show && (<button onClick={() => setShow(false)} className="absolute -right-3 top-2 bg-[#00BC99] flex items-center justify-center text-white h-6 w-6 rounded-md cursor-pointer hover:text-[#012E40] shadow-lg">
                        <IoClose />
                    </button>)}

                    <div className="bg-[#012E40] overflow-hidden h-15 w-full text-white">
                        <div className="h-full p-2 flex flex-row gap-2 items-center">
                            <div className="h-8 w-8 flex items-center justify-center">
                                <FaUserCircle size={26} />
                            </div>
                            <div className="h-8 flex-1">
                                <Link href={"/login"} className="flex flex-col hover:text-[#00BC99]">
                                    <span className="text-[10px]">Olá,</span>
                                    <span className="text-xs font-bold">Entre com sua conta</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="h-[calc(100%-60px)] w-full py-2 overflow-y-scroll flex flex-col gap-2">
                        <SidebarList keyItem="seller-lat" label="Top 5 Lojistas" data={
                            CATEGORIES
                                .slice(0, 5)
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map((vl) => ({
                                    id: vl.id,
                                    label: vl.name,
                                    href: vl.path
                                }))
                        } />
                        <SidebarList keyItem="category-lat" label="Categorias" data={
                            CATEGORIES
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map((vl) => ({
                                    id: vl.id,
                                    label: vl.name,
                                    href: vl.path
                                }))
                        } />
                    </div>
                </div>
            </section>

            {/* CARRINHO */}
            <section className={`z-40 absolute inset-y-0 right-0 bg-white shadow-lg rounded-tr-md rounded-br-md transition-all duration-700 ease-in-out ${showCart ? "w-50" : "w-0 overflow-hidden"}`}>
                <div className="relative h-full">
                    {showCart && (<button onClick={() => setShowCart(false)} className="absolute -left-3 top-2 bg-[#00BC99] flex items-center justify-center text-white h-6 w-6 rounded-md cursor-pointer hover:text-[#012E40] shadow-lg">
                        <IoClose />
                    </button>)}

                    <div className="h-[calc(100%-72px)] w-full py-2 overflow-y-auto flex flex-col gap-2">
                        <ul className="p-2 pt-6 flex flex-col gap-2">
                            <label className="text-xs font-bold">Carrinho</label>
                            {
                                cart.products
                                    .map((product) => (
                                        <li key={`cart-${product.id}`}>
                                            <CartItem data={product} add={add} remove={remove} />
                                        </li>
                                    ))
                            }
                        </ul>
                    </div>

                    <div className="bg-[#012E40] overflow-hidden h-18 w-full text-white p-2">
                        <div className="text-right text-lg font-bold flex flex-row justify-end gap-2">
                            <div className="text-[10px]">R$</div>
                            {cart.total.toLocaleString("pt-br", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}
                        </div>
                        {(cart.total > 0 || cart.products.length > 0) && (
                            <Link href={"/checkout"} className="bg-[#00BC99] p-2 rounded-lg text-[10px] w-full">Finalizar</Link>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}