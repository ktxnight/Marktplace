"use client"

import { Card } from "@/app/components/card";
import { PRODUCTS } from "@/app/mocks/products";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { MdHideImage } from "react-icons/md";
import Image from "next/image"

export default function Page() {
    const { id } = useParams<{id: string}>()

    if(isNaN(Number(id))) {
        toast.error("ID inválido!")
        return
    }

    const product = PRODUCTS.find(prd => prd.id === Number(id))

    if (!product) {
        toast.error("Produto Não Encontrado")

        return
    }
    return (
        <>
        {/* INFO BREVE DO VENDEDOR */}
        <Card></Card>

        {/* INFO PRODUTO */}
        <Card>
                     <div className="border h-100 w-100 rounded-lg relative flex items-center justify-center text-slate-200">
                       {
                            product.photo ? <Image 
                            alt={product.name}
                            src={product.photo}
                            fill
                           /> : <MdHideImage size={160} />
                          }
            </div>
        </Card>
        </>
    );
}