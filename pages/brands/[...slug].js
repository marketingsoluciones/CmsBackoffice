import { useEffect, useState } from "react";
import { SubmenuComponent } from "../../components/CateringBodasComponents/SubmenuComponent";
import { MarcasControl } from "../../components/ModuloMarcas/Marcas";
import { CustomWebsTable } from "../../components/ModuloMarcas/WeddingCustomWebs";
import { PiCertificate } from "react-icons/pi";
import { IframeMetricool } from "../../components/MarcaBlancaMetricool";
import { IoAnalytics } from "react-icons/io5";
import { CiViewTable } from "react-icons/ci";
import { AuthContextProvider } from "../../context";
import { IframeWorkFlow } from "../../components/ModuloMarcas/IframeWorkFlow";
import { GoWorkflow } from "react-icons/go";
import { IoLinkOutline } from "react-icons/io5";
import { GoProjectSymlink } from "react-icons/go";
import { Configuracion } from "../../components/ModuloMarcas/MarcasBlancas";
import { useRouter } from "next/router";
import { LinksControl } from "../../components/ModuloMarcas/Links";

const BusinessSlug = ({ props }) => {
  const router = useRouter()
  const [optionSelect, setOptionSelect] = useState(0);
  const { user, development, dispatch } = AuthContextProvider();
  const dataMetricool = user?.authDevelopments.find(
    (element) => element.title === development
  );
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
  const dataComponents = [
    {
      icon: <PiCertificate className="h-6 w-auto" />,
      title: "Marcas",
      slug: "/brands",
      component: <MarcasControl optionSelect={optionSelect} />,
    },
    {
      icon: <CiViewTable className="h-6 w-auto" />,
      title: "Mis Webs",
      slug: "/mywebsites",
      component: <CustomWebsTable setComponentState={setOptionSelect} />,
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
      component: <LinksControl setComponentState={setOptionSelect} optionSelect={optionSelect} />,
    },
    {
      icon: <GoProjectSymlink className="h-6 w-auto" />,
      title: "Marca Blanca",
      slug: "/whitelabel",
      component: <Configuracion setComponentState={setOptionSelect} optionSelect={optionSelect} />,
    },
  ];
  const handleClickOption = (idx) => {
   /*  console.log(1003, `/${router.route.split("/")[1]}${dataComponents[idx].slug}`) */
    dispatch({ type: "VIEW", payload: `/${router.route.split("/")[1]}${dataComponents[idx].slug}` });
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
