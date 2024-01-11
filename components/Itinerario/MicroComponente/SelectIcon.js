import { useField } from "formik";
import { AddIcon } from "../../Icons/index"

export const SelectIcon = ({ resultadoIcon, setOpenIcon, openIcon, ...props }) => {
    const [field, meta, helpers] = useField({ name: props?.name });
    return (
        <div className="flex justify-center items-center">
            {resultadoIcon?.icon
                ? <div className='w-10 md:w-12 lg:w-14 h-10 md:h-12 lg:h-14 cursor-pointer flex items-center justify-center ' onClick={() => setOpenIcon(!openIcon)}>
                    {resultadoIcon?.icon}
                </div>
                : <div className='w-10 md:w-12 lg:w-14 h-10 md:h-12 lg:h-14 cursor-pointer flex items-center justify-center text-gray-600 hover:text-gray-800' onClick={() => setOpenIcon(!openIcon)}>
                    <AddIcon />
                </div>
            }
        </div>
    )
}