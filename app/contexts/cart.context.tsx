"use client"

import { createContext, ReactNode, useContext, useState } from "react"

interface ICartContext {
    cart: ICart,
    add: (product: IProductCart) => void,
    remove: (product: IProductCart) => void
}

const CartContext = createContext<ICartContext>(null!);

export function CartProvider({ children }: Readonly<{ children: ReactNode }>) {
    const [cart, setCart] = useState<ICart>({
        products: [], total: 0
    })

    const add = (product: IProductCart) => {
        const oldProduct = cart.products.find(prd => prd.id === product.id);

        if (!oldProduct) {
            const products = [...cart.products, product]
            const total = products.reduce((prev, curr) => {
                return prev + (curr.amount * curr.price)
            }, 0)

            setCart({
                products,
                total
            })
        } else {
            const newProduct: IProductCart = {
                ...oldProduct,
                amount: oldProduct.amount + product.amount
            }

            const products = cart.products.map(prd => {
                if (prd.id === newProduct.id) return newProduct
                return prd
            })

            setCart({
                products,
                total: products.reduce((prev, curr) => {
                    return prev + (curr.amount * curr.price)
                }, 0)
            })
        }
    }

    const remove = (product: IProductCart) => {
        const oldProduct = cart.products.find(prd => prd.id === product.id);

        if (oldProduct) {
            if (product.amount >= oldProduct.amount) {
                // Quantidade maior ou igual
                const products = cart.products.filter(prd => prd.id !== oldProduct.id)
                const total = products.reduce((prev, curr) => prev + (curr.amount * curr.price), 0)
                setCart({
                    products,
                    total
                })
            } else {
                // Quantidade menor
                const products = cart.products.map(prd => {
                    if (prd.id === oldProduct.id) {
                        return {
                            ...prd,
                            amount: prd.amount - product.amount
                        }
                    }
                    return prd
                })
                const total = products.reduce((prev, curr) => prev + (curr.amount * curr.price), 0)
                setCart({
                    products,
                    total
                })
            }
        }
    }

    return (
        <CartContext.Provider value={{ cart, add, remove }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) throw new Error("O 'useCart' deve ser utilizado dentro do 'CartProvider'")
    return context
}