import { FC } from "react"

interface propsModal {
    children: any
    setOpenIcon: any
    openIcon: any
}

export const Modal: FC<propsModal> = ({ children, setOpenIcon, openIcon }) => {
    return (
        <>
            <div className="z-50 fixed top-0 left-0 w-screen h-screen overflow-hidden" />
            <div className="backdrop-blur backdrop-filter bg-gray-919EAB opacity-10 z-50 fixed top-0 left-0 w-screen h-screen overflow-hidden " />
            <div className="space-y-4 bg-white w-max h-fit shadow-lg fixed m-auto inset-0 z-50 rounded-xl px-10 py-5 ">
                {children}
            </div>

        </>
    )
}