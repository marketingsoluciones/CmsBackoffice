import { useEffect, useState } from "react"
import { BuzonProsIcon, ChatBotIcon, ChatEnVivoIcon, FormulariosWebIcon, Invitados1Icon, Leads1Icon, Mensajes1Icon, VisitasWebIcon } from "../../components/Icons/index";
import { useRouter } from "next/router";
import { SlideBar1 } from "../../components/NuevoEvento/ClusterMod/utilidades/SlideBar1";
import { BuzonProspectos, ClusterInfo1, CompMensajes, CompVisitasWebs, InfoGeneral1, InvitadosCloster, Leads } from "../../components/NuevoEvento/ClusterMod/indx";

const ClusterSlug = ({ props }) => {
    const router = useRouter()
    const [optionSelect, setOptionSelect] = useState(0)
    useEffect(() => {
        /* console.log(optionSelect) */
    }, [optionSelect])

    useEffect(() => {
        const f1 = dataComponents.findIndex(elem => elem.slug === `/${router.query.slug[0]}`)
        if (f1 > -1) {
            setOptionSelect(f1)
        } else {
            router.push(`/${router.route.split("/")[1]}/${dataComponents[0].slug}`)
        }
    }, [router])

    const handleClickOption = (idx) => {
        //dispatch({ type: "VIEW", payload: `/${router.route.split("/")[1]}${dataComponents[idx].slug}` });
        router.push(`/${router.route.split("/")[1]}${dataComponents[idx].slug}`)
        // setOptionSelect(idx);
    };

    const dataComponents = [
        {
            icon: <BuzonProsIcon />,
            title: "Buzon de Prospectos",
            slug: "/buzonProspectos",
            component: <BuzonProspectos />
        },
        {
            icon: <ChatEnVivoIcon />,
            title: "Chat en vivo",
            slug: "/chatVivo",
            component: <InfoGeneral1 />
        },
        {
            icon: <ChatBotIcon />,
            title: "Chatbot",
            slug: "/chatbot",
            component: <InfoGeneral1 />
        },

        {
            icon: <FormulariosWebIcon />,
            title: "Formularios Web",
            slug: "/formulariosWeb",
            component: <InfoGeneral1 />
        },
        {
            icon: <Leads1Icon />,
            title: "Leads",
            slug: "/leads",
            component: <BuzonProspectos />
        },
        {
            icon: <Invitados1Icon />,
            title: "Invitados",
            slug: "/invitados",
            component: <BuzonProspectos />
        },
        {
            icon: <VisitasWebIcon />,
            title: "Visitas Web",
            slug: "/visitasWeb",
            component: <CompVisitasWebs />
        },
        {
            icon: <Mensajes1Icon />,
            title: "Mensajes",
            slug: "/mensajes",
            component: <CompMensajes componentState={optionSelect} setComponentState={setOptionSelect} />
        },
        {
            component: <ClusterInfo1 />
        },

    ]

    const newArryDataComponents = dataComponents.slice()
    newArryDataComponents.splice(8, 1)


    return (
        <div className={`md:flex h-full w-full`}>
            <SlideBar1
                dataComponents={newArryDataComponents}
                onClick={handleClickOption}
                optionSelect={optionSelect}
            />
            <div className="md:flex-1 items-center justify-center px-5 py-5">
                {
                    dataComponents[optionSelect].component != undefined
                        ? dataComponents[optionSelect].component
                        : null
                }
            </div>
        </div>
    );
};

export default ClusterSlug;
export async function getServerSideProps({ params }) {
    return {
        props: params,
    };
}
