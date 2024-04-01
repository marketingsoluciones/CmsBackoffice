import { useRouter } from "next/router"
import { BuzonProsIcon, ChatBotIcon, ChatEnVivoIcon, FormulariosWebIcon, Invitados1Icon, Leads1Icon, Mensajes1Icon, VisitasWebIcon } from "../../Icons/index"
import { useEffect, useState } from "react"
import { ClusterInfo1 }  from "./ClusterInfo1"
import InfoGeneral1 from "./InfoGeneral1"
import { SlideBar1 } from "./utilidades/SlideBar1"
import CompVisitasWebs from "./CompVisitasWeb"
import CompMensajes from "./CompMensajes"
import { BuzonProspectos }  from "./BuzonProspectos"

const ClusterComp = ({componentState, setComponentState}) => {

    const [optionSelect, setOptionSelect] = useState(8)
    const [modalContacto, setModalContacto] = useState(false)
    const router = useRouter()
    const { stateOriginPath } = router?.query
    useEffect(() => {
        if (stateOriginPath) {
            setOptionSelect(stateOriginPath)
        }
    }, [])
    const dataComponents = [

        {
            icon: <BuzonProsIcon />,
            title: "Buzon de Prospectos",
            component: <BuzonProspectos componentState={optionSelect} setComponentState={setOptionSelect} />
        },
        {
            icon: <ChatEnVivoIcon />,
            title: "Chat en vivo",
            component: <InfoGeneral1 componentState={optionSelect} setComponentState={setOptionSelect} />
        },
        {
            icon: <ChatBotIcon />,
            title: "Chatbot",
            component: <InfoGeneral1 componentState={optionSelect} setComponentState={setOptionSelect} />
        },

        {
            icon: <FormulariosWebIcon />,
            title: "Formularios Web",
            component: <InfoGeneral1 componentState={optionSelect} setComponentState={setOptionSelect}/>
        },
        {
            icon: <Leads1Icon />,
            title: "Leads",
            component: <InfoGeneral1 componentState={optionSelect} setComponentState={setOptionSelect}/>
        },
        {
            icon: <Invitados1Icon />,
            title: "Invitados",
            component: <InfoGeneral1 componentState={optionSelect} setComponentState={setOptionSelect}/>
        },
        {
            icon: <VisitasWebIcon />,
            title: "Visitas Web",
            component: <CompVisitasWebs componentState={optionSelect} setComponentState={setOptionSelect}/>
        },
        {
            icon: <Mensajes1Icon />,
            title: "Mensajes",
            component: <CompMensajes componentState={optionSelect} setComponentState={setOptionSelect}/>
        },
        {
            component: <ClusterInfo1 setOptionSelect={setOptionSelect} modalContacto={modalContacto} setModalContacto={setModalContacto} />
        },

    ]
    const handleClickOption = (idx) => {
        setOptionSelect(idx);
    };

    const newArryDataComponents = dataComponents.slice()
    newArryDataComponents.splice(9, 9)

    return (
        <>
            <div className={`md:flex h-full ${dataComponents[optionSelect].type !== "" && "w-full"}`}>
                <SlideBar1 dataComponents={newArryDataComponents} optionSelect={optionSelect} onClick={handleClickOption} />
                <div className="md:flex-1 items-center justify-center">
                {dataComponents[optionSelect].component}
                </div>
            </div>


        </>
    )
}

export default ClusterComp


