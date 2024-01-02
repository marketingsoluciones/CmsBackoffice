import { LiaUserPlusSolid } from "react-icons/lia";
import { AddUser } from "../../Icons/index"
export const Responsable = ({ openModal, setOpenModal }) => {
    return (
        <div className="w-[10%] flex items-center justify-center">
            {/* <span className="text-[13px] text-rosa">Responsable</span> */}
            <div onClick={() => setOpenModal(!openModal)} className=" h-12* w-12  rounded-full flex items-center justify-center cursor-pointer text-gray-600 hover:text-gray-800">
                <AddUser />
            </div>
        </div>
    )
}