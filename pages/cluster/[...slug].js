import { useEffect, useState } from "react"
import { BuzonProsIcon, ChatBotIcon, ChatEnVivoIcon, FormulariosWebIcon, Invitados1Icon, Leads1Icon, Mensajes1Icon, VisitasWebIcon } from "../../components/Icons/index";
import { useRouter } from "next/router";
import { SlideBar1 } from "../../components/NuevoEvento/ClusterMod/utilidades/SlideBar1";
import { ColumnsDefTable, ClusterInfo1, CompMensajes, CompVisitasWebs, InfoGeneral1 } from "../../components/NuevoEvento/ClusterMod";
import { BodyStaticAPP } from "../../utils/schemas";

const Slug = ({ props }) => {
    const router = useRouter()
    const [optionSelect, setOptionSelect] = useState(0)
    const [dataComponents, setDataComponents] = useState([])
    const schemaChildren = BodyStaticAPP.find(elem => elem.title === "Formacion Enterprice")?.children.filter(elem => elem.hidden)

    useEffect(() => {
        setDataComponents([...schemaChildren])
    }, [])

    useEffect(() => {
        const f1 = dataComponents?.findIndex(elem => elem.route === `${router.asPath.split("/")[1]}/${router.query.slug[0]}`)
        console.log(10003, f1, `${router.asPath.split("/")[1]}/${router.query.slug[0]}`)
        if (f1 > -1) {
            setOptionSelect(f1)
        }
    }, [router])

    const handleClickOption = (idx) => {
        //dispatch({ type: "VIEW", payload: `/${dataComponents[idx].route}` });
        router.push(`/${dataComponents[idx].route}`)
    };

    // const dataComponents = [
    //     {
    //         icon: <BuzonProsIcon />,
    //         title: "Buzon de Prospectos",
    //         slug: "/buzonProspectos",
    //         component: <ColumnsDefTable schemaChildren={schemaChildren} />
    //     },
    //     {
    //         icon: <ChatEnVivoIcon />,
    //         title: "Chat en vivo",
    //         slug: "/chatVivo",
    //         component: <InfoGeneral1 />
    //     },
    //     {
    //         icon: <ChatBotIcon />,
    //         title: "Chatbot",
    //         slug: "/chatbot",
    //         component: <InfoGeneral1 />
    //     },

    //     {
    //         icon: <FormulariosWebIcon />,
    //         title: "Formularios Web",
    //         slug: "/formulariosWeb",
    //         component: <InfoGeneral1 />
    //     },
    //     {
    //         icon: <Leads1Icon />,
    //         title: "Leads",
    //         slug: "/leads",
    //         component: <ColumnsDefTable schemaChildren={schemaChildren} />
    //     },
    //     {
    //         icon: <Invitados1Icon />,
    //         title: "Invitados",
    //         slug: "/invitados",
    //         component: <ColumnsDefTable schemaChildren={schemaChildren} />
    //     },
    //     {
    //         icon: <VisitasWebIcon />,
    //         title: "Visitas Web",
    //         slug: "/visitasWeb",
    //         component: <CompVisitasWebs />
    //     },
    //     {
    //         icon: <Mensajes1Icon />,
    //         title: "Mensajes",
    //         slug: "/mensajes",
    //         component: <CompMensajes componentState={optionSelect} setComponentState={setOptionSelect} />
    //     },
    //     {
    //         component: <ClusterInfo1 />
    //     },

    // ]

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
                    dataComponents[optionSelect]?.component != undefined
                        ? dataComponents[optionSelect]?.component
                        : dataComponents[optionSelect]
                            ? <ColumnsDefTable schemaChildren={schemaChildren} />
                            : null
                }
            </div>
        </div>
    );
};

export default Slug;
export async function getServerSideProps({ params }) {
    return {
        props: params,
    };
}
