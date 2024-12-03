import { useState } from "react";
import { GoTriangleDown } from "react-icons/go";
import { IoLinkOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { FaSms } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { SiXstate } from "react-icons/si";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";

export const CreateLink = () => {
    const [modalOption, setModalOption] = useState({ state: false, type: "link" })
    return (
        <div>
            <InputURL modalOption={modalOption} setModalOption={setModalOption} />
        </div>
    )
}


const InputURL = ({ modalOption, setModalOption }) => {
    const dataOptionType = [
        {
            icon: <IoLinkOutline />,
            title: "link"
        },
        {
            icon: <MdOutlineMail />,
            title: "email"
        },
        {
            icon: <FaWhatsapp />,
            title: "whatsapp"
        },
        {
            icon: <FaFacebookMessenger />,
            title: "messenger"
        },
        {
            icon: <IoIosCall />,
            title: "call"
        },
        {
            icon: <FaSms />,
            title: "sms"
        },
        {
            icon: <FaTelegramPlane />,
            title: "telegram"
        },
        {
            icon: <FaFacebook />,
            title: "facebook"
        },
        {
            icon: <SiXstate />,
            title: "x"
        },
        {
            icon: <FaYoutube />,
            title: "youtube"
        },
        {
            icon: <FaInstagram />,
            title: "instagram"
        },
        {
            icon: <FaTiktok />,
            title: "tiktok"
        },
    ]

    const optionSelected = dataOptionType.find(({ title }) => title === modalOption.type)

    return (
        <>
            <div className="h-16 w-full bg-white flex items-center rounded-md px-4 relative ">
                <div onClick={() => setModalOption({ state: !modalOption.state, type:modalOption.type })} className="flex items-center justify-center cursor-pointer text-gray-600 gap-3">
                    {optionSelected?.icon}
                    {optionSelected?.title}
                    <GoTriangleDown />
                </div>
                <div>
                    <input></input>
                </div>
            </div>
            {
                modalOption.state &&
                <div className="bg-white grid grid-cols-2 w-max gap-5 p-4 rounded-md absolute top-36  shadow-md">
                    <div className="col-span-2 border-b text-center pb-1 text-gray-600 text-[18px]">
                        Options
                    </div>
                    {dataOptionType.map((item, idx) => {
                        return (
                            <div onClick={() => setModalOption({ type: item.title })} key={idx} className="flex items-center gap-2 cursor-pointer text-gray-600 capitalize w-[150px] hover:bg-slate-100 px-3 py-1 rounded-md">
                                {item.icon}
                                {item.title}
                            </div>
                        )
                    })}
                </div>
            }
        </>
    )
}