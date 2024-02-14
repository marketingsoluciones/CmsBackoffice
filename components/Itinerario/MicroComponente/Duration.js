import { useField } from "formik";

export const Duration = ({ ...props }) => {
    const [field, meta, helpers] = useField({ name: props?.name });
    return (
        <>
            <div className="text-[10px] md:text-[11px] lg:text-[13px] w-32">
                <span> Duración</span>
                <input className="focus:outline-none w-[20px] md:w-[40px] truncate text-center bg-transparent" type="number" placeholder="12" {...field} {...props} />
                <span>min</span>
            </div>
        </>

    )
}