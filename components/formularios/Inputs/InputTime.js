
import { useField } from "formik";
import { memo } from "react";
import { Popup } from "../../Popup";

export const InputTime = ({ ...props }) => {
    const [field, meta, helpers] = useField({ name:"time" });
    return (
        <>
            <input  type="time" className="text-[25px] block w-[119.5%] bg-transparent py-[0.32rem] outline-none transition-all duration-200 truncate  " {...field} {...props} />
        </>
    )
}