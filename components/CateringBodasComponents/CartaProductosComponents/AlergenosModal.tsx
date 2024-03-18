import { FC } from "react"
import ClickAwayListener from "react-click-away-listener"

interface PropsAlergenosModal {
    DataAlergenos: any
    setOpenModal: any
    openModal: any
}
export const AlergenosModal: FC<PropsAlergenosModal> = ({ DataAlergenos, setOpenModal, openModal }) => {

    return (
        <ClickAwayListener onClickAway={() => openModal && setOpenModal(false)}>
            <div className="grid grid-cols-5 bg-grayInformativo items-center justify-items-center py-5 px-5  rounded-xl gap-2 shadow-lg ">
                {
                    DataAlergenos.map((item: any, idx: any) => {
                        return (
                            <div key={idx} className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-400 w-[80px] py-1 rounded-lg" >
                                <div>
                                    {item.icon}
                                </div>
                                <label className="text-[10px] select-none cursor-pointer ">
                                    {item.title}
                                </label>
                            </div>
                        )
                    })
                }
            </div>
        </ClickAwayListener>
    )
}