 import {CamaraIcon} from "../../Icons/index"
export const AddPerfilImg = () => {
    return (
        <div className="rounded-[100px] border-dashed border shrink-0 w-[120px] h-[120px] relative bg-gray-400">
            <div className="text-white flex flex-col gap-1 items-center justify-center absolute left-[32.42px] top-[37px] overflow-hidden">
                <CamaraIcon />
                <span
                    style={{
                        font: "var(--caption, 400 12px/18px 'Public Sans', sans-serif)",
                    }}
                >
                    Subir foto
                </span>
            </div>
        </div>
    )
}