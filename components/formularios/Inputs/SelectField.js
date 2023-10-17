import { useField } from "formik"
import { number } from "yup"


export const SelectField = ({ label, children, options, colSpan, className, ...props }) => {
    const [field, meta] = useField({ name: props.name })
    return (
        <>
            <div className={`relative* w-full h-full *col-span${colSpan && `-${colSpan}`} *content-between`}>
                <label className="font-display text-sm text-primary w-full">{label}</label>
                <div>
                    <select className={className} {...field} {...props} >
                        <option disabled value="" >
                            Seleccionar
                        </option>
                        {options?.map((option, idx) => (
                            <option key={idx} value={option}>{option && `${!option.match("(nombre)") ? option : option.replace("(nombre)")}`}</option>
                        ))}
                    </select>
                </div>
                {/* {meta.touched && meta.error && <p className=" font-display absolute* rounded-xl text-xs *left-0 *bottom-0 transform *translate-y-full text-red flex gap-1">{meta.error}</p>} */}
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

