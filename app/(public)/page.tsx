"use client"

import { FaCartPlus } from "react-icons/fa";
import { Card } from "../components/card";
import { CATEGORIES } from "../mocks/categories";
import { PRODUCTS } from "../mocks/products";
import { MdHideImage } from "react-icons/md";
import { useCart } from "../contexts/cart.context";
import Link from "next/link";
import Image from "next/image"
import toast from "react-hot-toast";

function Item({ data }: { data: IProduct }) {
  const { add } = useCart()

  
  const category = CATEGORIES
    .find(ct => ct.id === data.categoryID);

  const onClick = () => {
        add({
    ...data,
    amount: 1
  })

  toast.success("Adicionado com sucesso!")
  } 


  const href = category ? category.path.concat(`/${data.id}`) : `/${data.id}`

  return (
    <Card>
      <Link href={href} className="group transition-all duration-300">
        <div className="mb-2 relative text-slate-200 w-26 h-26 rounded-lg overflow-hidden flex items-center justify-center">
          {
            data.photo ? <Image 
            alt={data.name}
            src={data.photo}
            fill
           /> : <MdHideImage size={60} />
          }
        </div>
        <div>
          <div className="text-[12px] font-bold group-hover-text-[#03738C]">{data.name}</div>
          <div className="text-[10px] text-slate-400 group-hover:text-[#03738C]">
            {

              category?.name || "Não Identificado"
            }
          </div>
          <div className="text-md font-bold text-[#03738C] group-hover-text-[#00BC99]">
            {
              data.price
                .toLocaleString("pt-br", {
                  style: "currency", currency: "BRL"
                })
            }
          </div>
        </div>
      </Link>
      <div>
        <button onClick={onClick} title="Adicionar" className="hhover:bg-[#00BC99] h-8 w-8 bg-[#03738C] text-white flex items-center justify-center rounded-md p-2 cursor-pointer">
          <FaCartPlus size={16} />
        </button>
      </div>
    </Card >
  )
}
export default function Page() {
  return (
    <>
      <section>
        <h2 className="font-bold text-lg text-[#012E40]">Mais Vendidos</h2>
        <ul className="p-2 flex flex-row gap-2 items-center overflow-x-auto">
          {
            PRODUCTS.map((prd) => (
              <li key={`best-sellers-prd-${prd.id}`}>
                <Item data={prd} />
              </li>
            ))
          }
        </ul>
      </section>
    </>
  );
}