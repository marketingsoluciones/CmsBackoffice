import { useField } from "formik"
import { number } from "yup"
import { LuAlertCircle } from "react-icons/lu";
import { useToast } from "../../../hooks/useToast";


export const SelectField = ({ label, options, colSpan, className, titleClassName, divClassName, icon, iconClassName, availableInput, ...props }) => {
    const [field, meta] = useField({ name: props.name })
    const toast = useToast();
    return (
        <>
            <div className={`${divClassName != null & titleClassName != undefined ? divClassName : ""}  w-full h-full ${colSpan && `-${colSpan}`}`}>
                <div className=" flex items-center space-x-1 h-max mt-2 ">
                    <label className={` ${titleClassName != null & titleClassName != undefined ? titleClassName : "font-display text-sm text-primary w-full"}`}>{label}</label>
                    <label onClick={() => toast("error", "Este campo no esta disponible en tu plan")} className="cursor-pointer"> {!availableInput && <LuAlertCircle />}</label>
                </div>
                <div className="relative">
                    <select disabled={!availableInput} className={`${className} ${!availableInput ? "cursor-not-allowed" : "cursor-pointer"}`} {...field} {...props} >
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

