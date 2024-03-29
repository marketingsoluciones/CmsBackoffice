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

const Business = () => {
  const [optionSelect, setOptionSelect] = useState(0);
  const { user, development, dispatch } = AuthContextProvider();
  const dataMetricool = user?.authDevelopments.find(
    (element) => element.title === development
  );

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
      title: "Pages list",
      component: <TablePegesList setComponentState={setOptionSelect} />,
    },
    {
      icon: <IoAnalytics className="h-6 w-auto" />,
      title: "Métricas",
      component: <IframeMetricool dataMetricool={dataMetricool?.metricol} />,
    },
    {
      icon: <IoAnalytics className="h-6 w-auto" />,
      title: "WorkFlow",
      component: <GoWorkflow />,
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
        className={`flex-1 flex z-10 px-5 py-2`}>
        {dataComponents[optionSelect].component}
      </div>
    </div>
  );
};

export default Business;
