import { useEffect, useState } from "react";
import { AuthContextProvider } from "../../context";
import { useRouter } from "next/router";
import { HomeScreen } from "../../components/Events/HomeScreen";
import EventosCreados from "../../components/NuevoEvento/EventosCreados/EventosCreados"
import ConfigurarEvento from "../../components/NuevoEvento/CrearEvento/ConfigurarEvento";
import Asistencia from "../../components/NuevoEvento/CrearEvento/Asistencia";
import DatoEvento from "../../components/NuevoEvento/CrearEvento/DatosEvento";
import InicioCE from "../../components/NuevoEvento/CrearEvento/InicioCE"
import { IframeApp } from "../../layouts/IframeApp"

const Slug = ({ props }) => {
  console.log(100410)
  const router = useRouter()
  const [optionSelect, setOptionSelect] = useState(0);
  const { user, development, dispatch } = AuthContextProvider();

  useEffect(() => {
    console.log(optionSelect)
  }, [optionSelect])

  useEffect(() => {
    const pathNames = window.location.pathname.split("/").filter(item => item !== '')
    console.log(100420, pathNames)
    console.log(1004, router.query.slug)
    const f1 = dataComponents.findIndex(elem => elem.slug === `/${router.query.slug[0]}`)
    if (f1 > -1) {
      setOptionSelect(f1)
    } else {
      router.push(`/${router.route.split("/")[1]}/${dataComponents[0].slug}`)
    }
  }, [router])

  const dataComponents = [
    {
      icon: "",
      title: "Eventos",
      slug: "/events",
      component: <HomeScreen componentState={optionSelect} />
    },
    {
      icon: "",
      title: "Eventos Tiketing",
      slug: "/tiketing",
      component: <EventosCreados componentState={optionSelect} />
    },
    {
      icon: "",
      title: "Crear Evento",
      slug: "/create-event",
      component: <InicioCE componentState={optionSelect} />
    },
    {
      icon: "",
      title: "Configurar Evento",
      slug: "/configure-event",
      component: <ConfigurarEvento componentState={optionSelect} />
    },
    {
      icon: "",
      title: "Datos Evento",
      slug: "/data-event",
      component: <DatoEvento componentState={optionSelect} />
    },
    {
      icon: "",
      title: "Asistencia",
      slug: "/attendance",
      component: <Asistencia componentState={optionSelect} />
    },
    // {
    //   icon: "",
    //   title: "",
    //   slug: "",
    //   component: <Permisos componentState={optionSelect} setComponentState={setOptionSelect} />
    // },
    // {
    //   icon: "",
    //   title: "",
    //   slug: "",
    //   component: <DescripcionEvento componentState={optionSelect} setComponentState={setOptionSelect} />
    // },
    // {
    //   icon: "",
    //   title: "",
    //   slug: "",
    //   component: <DescuentosEvento componentState={optionSelect} setComponentState={setOptionSelect} />
    // },
    // {
    //   icon: "",
    //   title: "",
    //   slug: "",
    //   component: <CartaQrEvento componentState={optionSelect} setComponentState={setOptionSelect} />
    // },
    // {
    //   icon: "",
    //   title: "",
    //   slug: "",
    //   component: <TarifaListas componentState={optionSelect} setComponentState={setOptionSelect} />
    // },
    // {
    //   icon: "",
    //   title: "",
    //   slug: "",
    //   component: <CrearTarifaListas componentState={optionSelect} setComponentState={setOptionSelect} />
    // },
    // {
    //   icon: "",
    //   title: "",
    //   slug: "",
    //   component: <DatosLimiteTL componentState={optionSelect} setComponentState={setOptionSelect} />
    // },
    // {
    //   icon: "",
    //   title: "",
    //   slug: "",
    //   component: <EntradasTarifa componentState={optionSelect} setComponentState={setOptionSelect} />
    // },
    // {
    //   icon: "",
    //   title: "",
    //   slug: "",
    //   component: <EntradasOpciones componentState={optionSelect} setComponentState={setOptionSelect} />
    // },
    // {
    //   icon: "",
    //   title: "",
    //   slug: "",
    //   component: <ModalPrecio componentState={optionSelect} setComponentState={setOptionSelect} />
    // },
    {
      icon: "",
      title: "Eventos Sociales",
      slug: "/social",
      component: <IframeApp route={"/"} />
    },
    // {
    //   icon: "",
    //   title: "",
    //   slug: "",
    //   component: <InformesPage componentState={optionSelect} setComponentState={setOptionSelect} />
    // },
    // {
    //   icon: "",
    //   title: "",
    //   slug: "",
    //   component: <Comision1 componentState={optionSelect} setComponentState={setOptionSelect} />
    // },
    // {
    //   icon: "",
    //   title: "",
    //   slug: "",
    //   component: <Comision2 componentState={optionSelect} setComponentState={setOptionSelect} />
    // },
    // {
    //   icon: "",
    //   title: "",
    //   slug: "",
    //   component: <Liquidaciones componentState={optionSelect} setComponentState={setOptionSelect} />
    // },
    // {
    //   icon: "",
    //   title: "",
    //   slug: "",
    //   component: <DatosNegocios componentState={optionSelect} setComponentState={setOptionSelect} />
    // },

    // {
    //   icon: "",
    //   title: "",
    //   slug: "",
    //   component: <AjustesGenePrin componentState={optionSelect} setComponentState={setOptionSelect} />
    // },
    // {
    //   icon: "",
    //   title: "",
    //   slug: "",
    //   component: <Usuarios componentState={optionSelect} setComponentState={setOptionSelect} />
    // },
    /*     {
          component: <DataGeneral componentState={optionSelect} setComponentState={setOptionSelect} />
        }, */

  ]

  return (
    <div >
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

export default Slug;

export async function getServerSideProps({ params }) {
  return {
    props: params,
  };
}
