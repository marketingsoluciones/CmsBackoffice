import { useEffect, useState } from "react";
import { AuthContextProvider } from "../../context";
import { useRouter } from "next/router";
import { HomeScreen } from "../../components/Events/HomeScreen";
import EventosCreados from "../../components/NuevoEvento/EventosCreados/EventosCreados"
import ConfigurarEvento from "../../components/NuevoEvento/CrearEvento/ConfigurarEvento";
import Asistencia from "../../components/NuevoEvento/CrearEvento/Asistencia";
import Permisos from "../../components/NuevoEvento/CrearEvento/Permisos";
import DatoEvento from "../../components/NuevoEvento/CrearEvento/DatosEvento";
import InicioCE from "../../components/NuevoEvento/CrearEvento/InicioCE"
import DescuentosEvento from "../../components/NuevoEvento/CrearEvento/DescuentosEvento";
import CartaQrEvento from "../../components/NuevoEvento/CrearEvento/CartaQrEvento";
import { IframeApp } from "../../layouts/IframeApp"
import TarifaListas from "../../components/NuevoEvento/CrearEvento/TarifaListas";
import CrearTarifaListas from "../../components/NuevoEvento/CrearEvento/CrearTarifaListas";
import DatosLimiteTL from "../../components/NuevoEvento/CrearEvento/DatosLimitesTL";
import EntradasTarifa from "../../components/NuevoEvento/CrearEvento/EntradasTarifa/EntradasTarifas";
import EntradasOpciones from "../../components/NuevoEvento/CrearEvento/EntradasTarifa/EntradasOpciones";
import ModalPrecio from "../../components/NuevoEvento/CrearEvento/EntradasTarifa/Sub-Componentes/ModalPrecio";
import DescripcionEvento from "../../components/NuevoEvento/EventosCreados/PanelEventCreado";
import InformesPage from "../../components/NuevoEvento/EventosCreados/InformesPage";
import DatosNegocios from "../../components/NuevoEvento/EventosCreados/AjustesComponents/DatosNegocio";
import AjustesGenePrin from "../../components/NuevoEvento/EventosCreados/AjustesComponents/AjustesGenePrin";
import Usuarios from "../../components/NuevoEvento/EventosCreados/AjustesComponents/Usuarios";

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
    {
      icon: "",
      title: "Permisos del Evento",
      slug: "/permissions",
      component: <Permisos componentState={optionSelect}/>
    },
    {
      icon: "",
      title: "Descripcion de Evento",
      slug: "/events-description",
      component: <DescripcionEvento componentState={optionSelect}/>
    },
    {
      icon: "",
      title: "Descuentos",
      slug: "/discounts",
      component: <DescuentosEvento componentState={optionSelect}/>
    },
    {
      icon: "",
      title: "Carta QR",
      slug: "/letter-qr",
      component: <CartaQrEvento componentState={optionSelect}/>
    },
    {
      icon: "",
      title: "Listas",
      slug: "/list",
      component: <TarifaListas componentState={optionSelect}/>
    },
    {
      icon: "",
      title: "Crear Lista",
      slug: "/create-list",
      component: <CrearTarifaListas componentState={optionSelect}/>
    },
    {
      icon: "",
      title: "Datos Lista",
      slug: "/date-list",
      component: <DatosLimiteTL componentState={optionSelect} />
    },
    {
      icon: "",
      title: "Entradas",
      slug: "/entrance-fees",
      component: <EntradasTarifa componentState={optionSelect}/>
    },
    {
      icon: "",
      title: "Entradas Opciones",
      slug: "/ticket-options",
      component: <EntradasOpciones componentState={optionSelect}/>
    },
    {
      icon: "",
      title: "",
      slug: "",
      component: <ModalPrecio componentState={optionSelect}/>
    },
    {
      icon: "",
      title: "Eventos Sociales",
      slug: "/social",
      component: <IframeApp route={"/"} />
    },
    {
      icon: "",
      title: "Informes",
      slug: "/reports-tap",
      component: <InformesPage componentState={optionSelect}/>
    },
    {
      icon: "",
      title: "Datos del Negocio",
      slug: "/date-bussines",
      component: <DatosNegocios componentState={optionSelect}/>
    },    
    {
      icon: "",
      title: "Ajuste Generales",
      slug: "/general-settings",
      component: <AjustesGenePrin componentState={optionSelect}/>
    },
    {
      icon: "",
      title: "Usuarios",
      slug: "/users",
      component: <Usuarios componentState={optionSelect}/>
    },

  ]

  return (
    <div >
      <div
        className={`w-[100%] flex z-10`}>
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
