import { FC, useEffect } from "react";
import Component1 from "./Component1";
import ModoDemo from "../Principal/ModoDemo";
import TabGeneral from "./TabsGeneral";
import CalendarioTabs from "./Canlendariotabs";
import CrmComponent from "./CrmComponent";
import InformesTabs from "./InformesTabs";
import AjustesTabs from "./AjustesTabs";
import { DataComponents } from "../../../utils/Interfaces";

interface propsEventosCreados {
  componentState: any;
  setComponentState: any;
}

const EventosCreados: FC<propsEventosCreados> = ({ componentState, setComponentState }) => {

  const dataComponents: DataComponents[] = [
    {
      title: 'Calendario',
      slug: "/calendary",
      icon: <img className="w-8 h-8" alt="" src="/ModuloEvento/icon-15.svg" />,
      component: <CalendarioTabs componentState={componentState} setComponentState={setComponentState} />
    },
    {
      title: 'CRM',
      slug: "/crm",
      icon: <img className="w-8 h-8" alt="" src="/ModuloEvento/crm.svg" />,
      component: <CrmComponent componentState={componentState} setComponentState={setComponentState} />
    },
    {
      title: 'Informes',
      slug: "/reports",
      icon: <img className="w-8 h-8" alt="" src="/ModuloEvento/icon-22.svg" />,
      component: <InformesTabs componentState={componentState} setComponentState={setComponentState} />
    },
    {
      title: 'Ajustes',
      slug: "/setup",
      icon: <img className="w-8 h-8" alt="" src="/ModuloEvento/Icon123.svg" />,
      component: <AjustesTabs componentState={componentState} setComponentState={setComponentState} />
    },
  ]


  return (
    <div className="w-[100%] h-full bg-whitesmoke flex flex-col items-start justify-start overflow-auto py-[30px] px-[20px] box-border gap-[30px]">
      <div className="flex items-center justify-center">
        <ModoDemo />
      </div>
      <Component1 componentState={componentState} setComponentState={setComponentState} />


      <TabGeneral componentState={componentState} setComponentState={setComponentState} dataComponents={dataComponents} />

    </div>
  );
};

export default EventosCreados;