import { useField } from "formik";

export const Duration = ({ ...props }) => {
    const [field, meta, helpers] = useField({ name: props?.name });
    return (
        <>
            <div className="text-[10px] md:text-[11px] lg:text-[13px]">
                <span> Duración</span>
                <input className="focus:outline-none w-[20px] md:w-[40px] truncate text-center bg-transparent" type="number" {...field} {...props} />
                <span>min</span>
            </div>
        </>

    )
}