import { FC } from "react"
import ClickAwayListener from "react-click-away-listener"

interface PropsAlergenosModal {
    DataAlergenos?: any
    setOpenModal?: any
    openModal?: any
    setAddAlergenos?: any
    addAlergenos?: any
    value?: any
}
export const AlergenosModal: FC<PropsAlergenosModal> = ({ DataAlergenos, setOpenModal, openModal, setAddAlergenos, addAlergenos, value }) => {

    const handleClick = (item: any) => {
        setAddAlergenos((old: any) => {
            const f1 = old.findIndex(elem => elem.title === item.title)
            if (f1 < 0) {
                old.push(item)
                return [...old]
            }
            if (f1 > -1) {
                old.splice(f1, 1)
                return [...old]
            }
        })
    }

    return (
        <ClickAwayListener onClickAway={() => openModal && setOpenModal(false)}>
            <div className="grid grid-cols-5 bg-grayInformativo items-center justify-items-center py-5 px-5  rounded-xl gap-2 shadow-lg ">
                {
                    DataAlergenos.map((item: any, idx: any) => {
                        return (
                            <div
                                key={idx}
                                className={`flex flex-col items-center justify-center cursor-pointer hover:bg-gray-400 w-[80px] py-1 rounded-lg ${value.includes(item.title) ? "bg-slate-300" : "bg-none"} `}
                                onClick={() => { handleClick(item) }}
                            >
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