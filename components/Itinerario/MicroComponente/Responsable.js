import { AddUser } from "../../Icons/index"
export const Responsable = ({ openModal, setOpenModal }) => {
    return (
        <div className="flex justify-center items-center">
            {/* <span className="text-[13px] text-rosa">Responsable</span> */}
            <div onClick={() => setOpenModal(!openModal)} className="w-10 md:w-12 lg:w-14 h-10 md:h-12 lg:h-14 rounded-full flex items-center justify-center cursor-pointer text-gray-600 hover:text-gray-800">
                <AddUser className="w-6 md:w-8 lg:w-10 h-6 md:h-8 lg:h-10" />
            </div>
        </div>
    )
}