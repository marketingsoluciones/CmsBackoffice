
import { useField } from "formik";
import { useEffect, useState } from "react";

const optionsFormatTime = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    //timeZone: "America/Los_Angeles",
};

export const InputTime = ({ ...props }) => {
    const [field] = useField({ name: props?.name });
   
 

    return (
        <>
            <input type="time" className="text-[15px] md:text-[20px] lg:text-[25px] block bg-transparent outline-none truncate md:-mb-[6px]  " {...field} {...props} />
        </>
    )
}