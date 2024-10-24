import { useField } from "formik"
import { FC } from "react"
import { number } from "yup"

interface propsSelectField {
    label?: any
    options: any
    colSpan?: any
    className: any
    icon: any
    iconClassName: any
    name: any
}

export const SelectFieldTSX: FC<propsSelectField> = ({ label, options, colSpan, className, icon, iconClassName, ...props }) => {
    const [field, meta] = useField({ name: props.name })
    return (
        <>
            <div className={`relative w-full h-full *col-span${colSpan && `-${colSpan}`} *content-between`}>
                <label className="font-display text-sm text-primary w-full">{label}</label>
                <div className="relative ">
                    <select className={className} {...field} {...props} >
                        <option disabled value="" >
                            Seleccionar
                        </option>
                        {options?.map((option, idx) => (
                            <option key={idx} value={option}>{option && `${!option.match("(nombre)") ? option : option.replace("(nombre)")}`}</option>
                        ))}
                    </select>
                    <div className={` absolute z-10  ${iconClassName}`}>
                        {icon}
                    </div>
                </div>
                {meta.touched && meta.error && <p className=" font-display absolute* rounded-xl text-xs *left-0 *bottom-0 transform *translate-y-full text-red flex gap-1">{meta.error}</p>}
            </div>
            <style jsx>
                {`
            select {
                -webkit-appearance: none;
                -moz-appearance: none;
                text-indent: 1px;
                text-overflow: '';
            }
            `}
            </style>
        </>
    )
}
