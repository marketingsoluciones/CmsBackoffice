import { InputFieldGlobal } from "../../formularios/Inputs/InputFieldGlobal"

export const Duration = () => {
    return (
        <>
            <div className="bg-red-400* text-[13px] absolute -bottom-3  flex justify-center items-center">
                <span>
                    Duración
                </span>

                <InputFieldGlobal
                    name="Duration"
                    className="focus:outline-none border* border-gray-300 rounded-lg py-0.5 px-1  w-[40px] truncate text-[15px] text-center "
                    placeholder="30 "
                />

                <span>
                    min
                </span>

            </div>
        </>

    )
}