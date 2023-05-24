import { CamaraIcon } from "../../Icons/index"
export const AddPerfilImg = () => {
    return (
        <div className="cursor-pointer rounded-full border-dashed border w-[100%] h-[100%] bg-gray-400 flex justify-center items-center">
            <div className="text-white flex flex-col items-center justify-center">
                <CamaraIcon />
                <span className="text-xs md:text-sm">
                    Subir foto
                </span>
            </div>
        </div>
    )
}