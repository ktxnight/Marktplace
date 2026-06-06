import { DetailedHTMLProps, SelectHTMLAttributes } from "react"

interface IProps extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    label?: string
}

export function Select({ label, ...props }: IProps) {
    return (
        <div className="flex flex-col gap-px">
            {label && <label htmlFor={props?.id} className="text-sm select-none font-semibold text-gray-800">{label}{props.required && <span className="text-sm text-red-600">{" "}*</span>}</label>}
            <select className={`h-11 outline-none border-2 border-gray-300 p-2 rounded-md `.concat(props?.className || "")} {...props} />
        </div>
    )
}