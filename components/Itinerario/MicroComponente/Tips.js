import { InputFieldGlobal } from "../../formularios/Inputs/InputFieldGlobal"

export const Tips = () => {
    return (
        <div className="flex flex-col w-[25%]">
            {/* <span className="text-rosa text-[13px]">
                Tips
            </span> */}
            <div >
                <InputFieldGlobal
                    name="tips"
                    className="focus:outline-none border border-gray-300 rounded-lg py-1 px-3  w-[100%] truncate text-base "
                    placeholder="agrega tips para esta tarea "
                />
            </div>

        </div>
    )
}