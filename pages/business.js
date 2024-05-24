import { useEffect, useState } from "react";
import { SubmenuComponent } from "../components/CateringBodasComponents/SubmenuComponent";
import { MarcasControl } from "../components/ModuloMarcas/Marcas";
import { TablePegesList } from "../components/ModuloMarcas/WeddingCustomWebs";
import { PiCertificate } from "react-icons/pi";
import { IframeMetricool } from "../components/MarcaBlancaMetricool";
import { IoAnalytics } from "react-icons/io5";
import { CiViewTable } from "react-icons/ci";
import { AuthContextProvider } from "../context";
import { IframeWorkFlow } from "../components/ModuloMarcas/IframeWorkFlow";
import { GoWorkflow } from "react-icons/go";
import Link from "next/link";
import { TableLinkList } from "../components/ModuloMarcas/Links/TableLinkList";
import { useResizeObserver } from "../hooks/useResize"
import { IoLinkOutline } from "react-icons/io5";

const Business = () => {
  const [optionSelect, setOptionSelect] = useState(0);
  const { user, development, dispatch } = AuthContextProvider();
  const dataMetricool = user?.authDevelopments.find(
    (element) => element.title === development
  );
  const [ref, dimensions] = useResizeObserver();

  useEffect(() => {
    dispatch({ type: "VIEW", payload: {} });
  }, [optionSelect])

  const dataComponents = [
    {
      icon: <PiCertificate className="h-6 w-auto" />,
      title: "Marcas",
      component: <MarcasControl optionSelect={optionSelect} />,
    },
    {
      icon: <CiViewTable className="h-6 w-auto" />,
      title: "MisWebs",
      component: <TablePegesList setComponentState={setOptionSelect} />,
    },
    {
      icon: <IoAnalytics className="h-6 w-auto" />,
      title: "Métricas",
      component: <IframeMetricool dataMetricool={dataMetricool?.metricol} />,
    },
    {
      icon: <GoWorkflow className="h-6 w-auto" />,
      title: "WorkFlow",
      component: <IframeWorkFlow />,
    },
    {
      icon: <IoLinkOutline className="h-6 w-auto" />,
      title: "Links",
      component: <TableLinkList setComponentState={setOptionSelect} dimensions={dimensions} />,
    },
  ];
  const handleClickOption = (idx) => {
    setOptionSelect(idx);
  };
  return (
    <div className="w-full h-full flex">
      <SubmenuComponent
        dataComponents={dataComponents}
        onClick={handleClickOption}
        optionSelect={optionSelect}
      />
      <div
        ref={ref}
        className={`flex-1 flex z-10`}>
        {
          dataComponents[optionSelect].component != undefined ?
            dataComponents[optionSelect].component :
            null
        }
      </div>
    </div>
  );
};

export default Business;
