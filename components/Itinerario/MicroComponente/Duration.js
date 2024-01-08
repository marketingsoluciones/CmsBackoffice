import { InputFieldGlobal } from "../../formularios/Inputs/InputFieldGlobal"
import { useField } from "formik";
import { memo } from "react";
import { Popup } from "../../Popup";

export const Duration = ({...props}) => {
    const [field, meta, helpers] = useField({ name: "duration" });
    return (
        <>
            <div className=" text-[13px] absolute -bottom-3  flex justify-center items-center">
                <span>
                    Duración
                </span>

                <input className="focus:outline-none py-0.5 px-1 w-[40px] truncate text-[15px] text-center bg-transparent " type="number" {...field} {...props} />

                <span>
                    min
                </span>

            </div>
        </>

    )
}