/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { createContext, ReactNode, useContext, useState } from "react"

interface ICartContext {
    cart: ICart
    add: (product: IProductCart) => void,
    remove: (product: IProductCart) => void
}

const CartContext = createContext<ICartContext>(null!)

export function CartProvider({ children }: Readonly<{ children: ReactNode }>) {
    const [cart, setCart] = useState<ICart>({
        products: [
            {
                id: 0,
                name: "desktops",
                categoryID: 1,
                description: "gfshfgdfgds",
                sellerID: 1,
                amount: 1,
                price: 10,
            }
        ], total: 0 })

    const add = (product: IProductCart) => { }

    const remove = (product: IProductCart) => { }

    return (
        <CartContext.Provider value={{ cart, add, remove }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) throw new Error("O 'useCart' deve ser utilizado dentro de 'CartProvider'")
    return context
}