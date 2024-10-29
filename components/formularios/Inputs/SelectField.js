import { useField } from "formik"
import { number } from "yup"


export const SelectField = ({ label, options, colSpan, className, titleClassName,divClassName , icon, iconClassName, ...props }) => {
    const [field, meta] = useField({ name: props.name })
    return (
        <>
            <div className={`${divClassName != null & titleClassName != undefined ? divClassName :""}  w-full h-full ${colSpan && `-${colSpan}`}`}>
                <label className={` ${titleClassName != null & titleClassName != undefined ? titleClassName : "font-display text-sm text-primary w-full"}`}>{label}</label>
                <div className="relative">
                    <select className={className} {...field} {...props} >
                        <option disabled value="" >
                            Seleccionar
                        </option>
                        {options?.map((option, idx) => (
                            <option key={idx} value={option}>{option && `${!option.match("(nombre)") ? option : option.replace("(nombre)")}`}</option>
                        ))}
                    </select>
                    <div className={` absolute ${iconClassName}`}>
                        {icon}
                    </div>
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

