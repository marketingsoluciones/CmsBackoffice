import { useEffect, useState } from "react";
import { SubmenuComponent } from "../../components/CateringBodasComponents/SubmenuComponent";
import { MarcasControl } from "../../components/ModuloMarcas/Marcas";
import { TablePegesList } from "../../components/ModuloMarcas/WeddingCustomWebs";
import { PiCertificate } from "react-icons/pi";
import { IframeMetricool } from "../../components/MarcaBlancaMetricool";
import { IoAnalytics } from "react-icons/io5";
import { CiViewTable } from "react-icons/ci";
import { AuthContextProvider } from "../../context";
import { IframeWorkFlow } from "../../components/ModuloMarcas/IframeWorkFlow";
import { GoWorkflow } from "react-icons/go";
import { TableLinkList } from "../../components/ModuloMarcas/Links/TableLinkList";
import { IoLinkOutline } from "react-icons/io5";
import { GoProjectSymlink } from "react-icons/go";
import { MarcaBlanca } from "../../components/ModuloMarcas/MarcasBlancas/index";
import { useRouter } from "next/router";

const BusinessSlug = ({ props }) => {
  const router = useRouter()
  const [optionSelect, setOptionSelect] = useState(0);
  const { user, development, dispatch, state } = AuthContextProvider();
  const dataMetricool = user?.authDevelopments.find(
    (element) => element.title === development
  );

  useEffect(() => {
    const f1 = dataComponents.findIndex(elem => elem.slug === `/${router.query.slug[0]}`)
    if (f1 > -1) {
      setOptionSelect(f1)
    } else {
      router.push(`/${router.route.split("/")[1]}/${dataComponents[0].slug}`)
    }
  }, [router])

  const dataComponents = [
    {
      icon: <PiCertificate className="h-6 w-auto" />,
      title: "Marcas",
      slug: "/brands",
      component: <MarcasControl optionSelect={optionSelect} />,
    },
    {
      icon: <CiViewTable className="h-6 w-auto" />,
      title: "MisWebs",
      slug: "/mywebsites",
      component: <TablePegesList setComponentState={setOptionSelect} />,
    },
    {
      icon: <IoAnalytics className="h-6 w-auto" />,
      title: "Métricas",
      slug: "/metrics",
      component: <IframeMetricool dataMetricool={dataMetricool?.metricol} />,
    },
    {
      icon: <GoWorkflow className="h-6 w-auto" />,
      title: "WorkFlow",
      slug: "/workflow",
      component: <IframeWorkFlow />,
    },
    {
      icon: <IoLinkOutline className="h-6 w-auto" />,
      title: "Links",
      slug: "/links",
      component: <TableLinkList setComponentState={setOptionSelect} />,
    },
    {
      icon: <GoProjectSymlink className="h-6 w-auto" />,
      title: "MarcaBlanca",
      slug: "/whitelabel",
      component: <MarcaBlanca setComponentState={setOptionSelect} optionSelect={optionSelect} />,
    },
  ];
  const handleClickOption = (idx) => {

    dispatch({ type: "VIEW", payload: {} });
    router.push(`/${router.route.split("/")[1]}${dataComponents[idx].slug}`)
    // setOptionSelect(idx);
  };
  return (
    <div className="w-full h-full flex">
      <SubmenuComponent
        dataComponents={dataComponents}
        onClick={handleClickOption}
        optionSelect={optionSelect}
      />
      <div
        className={`flex-1 flex z-10`}>
        {
          dataComponents[optionSelect].component != undefined
            ? dataComponents[optionSelect].component
            : null
        }
      </div>
    </div>
  );
};

export default BusinessSlug;

export async function getServerSideProps({ params }) {
  return {
    props: params,
  };
}
