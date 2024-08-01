import { useEffect, useState } from "react"
import { BuzonProsIcon, ChatBotIcon, ChatEnVivoIcon, FormulariosWebIcon, Invitados1Icon, Leads1Icon, Mensajes1Icon, VisitasWebIcon } from "../components/Icons/index";
import { useRouter } from "next/router";
import { SlideBar1 } from "../components/NuevoEvento/ClusterMod/utilidades/SlideBar1";
import { BuzonProspectos, ClusterInfo1, CompMensajes, CompVisitasWebs, InfoGeneral1 } from "../components/NuevoEvento/ClusterMod/indx";
import { SubmenuComponent } from "../components/CateringBodasComponents/SubmenuComponent"

const Cluster = () => {
  const [optionSelect, setOptionSelect] = useState(8)
  const [modalContacto, setModalContacto] = useState(false)
  const router = useRouter()
  /* const { stateOriginPath } = router?.query

  useEffect(() => {
    if (stateOriginPath) {
      setOptionSelect(stateOriginPath)
    }
  }, []) */

  const handleClickOption = (idx) => {
    setOptionSelect(idx);
  };

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
      component: <InfoGeneral1 componentState={optionSelect} setComponentState={setOptionSelect} />
    },
    {
      icon: <Leads1Icon />,
      title: "Leads",
      component: <InfoGeneral1 componentState={optionSelect} setComponentState={setOptionSelect} />
    },
    {
      icon: <Invitados1Icon />,
      title: "Invitados",
      component: <InfoGeneral1 componentState={optionSelect} setComponentState={setOptionSelect} />
    },
    {
      icon: <VisitasWebIcon />,
      title: "Visitas Web",
      component: <CompVisitasWebs  />
    },
    {
      icon: <Mensajes1Icon />,
      title: "Mensajes",
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
      <SlideBar1 dataComponents={newArryDataComponents} optionSelect={optionSelect} onClick={handleClickOption} />
      <div className="md:flex-1 items-center justify-center px-5 py-5">
        {dataComponents[optionSelect].component}
      </div>
    </div>
  );
};

export default Cluster;
