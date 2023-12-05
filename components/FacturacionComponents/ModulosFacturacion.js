import { useState } from "react"
import { ExclamacionIcon, VideoIcon } from "../Icons/index"
import { InfoModuloFacturacion } from "./InfoModuloFacturacion"
import { InfoModulos } from "./InfoModulos"
import { DetalladoCompra } from "./DetalladoCompra"
import { DatosFacturacion } from "./DatosFacturacion"

export const ModulosFacturacion = () => {
    const urlProps = window.location.search
    const params = new URLSearchParams(urlProps);
    const state = params.get('state');
    const producto = params.get('producto')
    const plan = params.get('plan');
    const [optionSelect, setOptionSelect] = useState(state !== null ? state : 0)

    const dataArry = [
        {
            id: "12",
            icon: "/Facturacion/ubicacionCuadro.png",
            iconPremium: "/Facturacion/lugaresPremium.png",
            title: "Módulo Lugares para Bodas",
            text: "Controla desde la distribución de los salones hasta la lista de invitados de cada evento que organizas.",
            textPremium: "Especial para restaurantes, lugares para bodas y/o organizadores. Ordena tus eventos, distribuye el plano del salón, lleva el control de la lista de invitados y más. ",
            button: "Ver oferta",
            idBasco: "1234",
            infoBasico: [
                {
                    id: "13",
                    icon: <ExclamacionIcon />,
                    title: "Visor de eventos ",
                    texto: "Visualiza tus eventos o crea nuevos para empezar a organizar. "
                },
                {
                    id: "24",
                    icon: <ExclamacionIcon />,
                    title: "Planos del evento",
                    texto: "Asigna a cada uno de tus eventos un plano y diseña la distribución del salón, mobiliario, proveedores e invitados."
                },
                {
                    id: "35",
                    icon: <ExclamacionIcon />,
                    title: "Lista de invitados",
                    texto: "Lleva el control de la lista de invitados de tus eventos, la mesa asignada y confirmación de asistencia."
                },
                {
                    id: "46",
                    icon: <ExclamacionIcon />,
                    title: "Visor de intinerario ",
                    texto: "Visualiza el intinerario de cada evento para conocer las horas y tareas de cada responsable.  "
                },
                {
                    id: "58",
                    icon: <ExclamacionIcon />,
                    title: "Chat en línea",
                    texto: "Ten contacto en tiempo real con invitados, organizadores y profesionales de cada evento."
                },
                {
                    id: "79",
                    icon: <ExclamacionIcon />,
                    title: "Contactos",
                    texto: "Crea tu lista de contactos de personas/empresas y centralizalas en un sólo lugar. "
                },
            ],
            idPremium: "5678",
            infoPremium: [
                {
                    id: "79",

                    icon: <ExclamacionIcon />,
                    title: "Visor de eventos ",
                    texto: "Visualiza tus eventos o crea nuevos para empezar a organizar. "
                },
                {
                    id: "468",
                    icon: <ExclamacionIcon />,
                    title: "Planos del evento",
                    texto: "Asigna a cada uno de tus eventos un plano y diseña la distribución del salón, mobiliario, proveedores e invitados."
                },
                {
                    id: "13",
                    icon: <ExclamacionIcon />,
                    title: "Plantilla del salón",
                    texto: "Crea plantillas de los planos de tus salones para reutilizar en tus eventos y añadir a la versión novios."
                },
                {
                    id: "73",
                    icon: <ExclamacionIcon />,
                    title: "Lista de invitados",
                    texto: "Lleva el control de la lista de invitados de tus eventos, la mesa asignada y confirmación de asistencia."
                },
                {
                    id: "19",
                    icon: <ExclamacionIcon />,
                    title: "Visor de intinerario ",
                    texto: "Visualiza el intinerario de cada evento para conocer las horas y tareas de cada responsable.  "
                },
                {
                    id: "28",
                    icon: <ExclamacionIcon />,
                    title: "Contactos",
                    texto: "Crea tu lista de contactos de personas/empresas y centralizalas en un sólo lugar. "
                },
                {
                    id: "46",
                    icon: <ExclamacionIcon />,
                    title: "Chat en línea",
                    texto: "Ten contacto en tiempo real con invitados, organizadores y profesionales de cada evento."
                },
                {
                    id: "82",
                    icon: <ExclamacionIcon />,
                    title: "Calendario",
                    texto: "Agenda tus citas, eventos, programa tus reuniones  en tu calendario sincronizado."
                },
            ],
            pagoBasico: "https://buy.stripe.com/test_9AQ9Bkb1e6S617G6oo",
            pagoPremium: "https://buy.stripe.com/test_3cs5l4d9m90e4jS28c",
            estatus: "basico",
            tituloEstatus: "Gratis durante el período de prueba",
            precio: "$ 49 al mes ",
            precioPremium: "$ 157 al mes ",
            buttonAdd: "+ Añadir complemento ",
            buttonDelete: "- Eliminar complemento",
            iconoVideo: <VideoIcon />,
            video: "Ver video (00:30)"
        },
        {
            id: "34",
            icon: "/Facturacion/copasCuadro.png",
            iconPremium: "/Facturacion/CateringPremium.png",
            title: "Módulo Catering para Bodas",
            text: "Garantiza el servicio y lleva el control de cada parte del catering de tus eventos.",
            textPremium: "Especial para restaurantes. Garantiza el servicio profesional de todo lo que incluye y lleva el control de cada parte del catering de tu evento en nuestro planificador digital. ",
            button: "Ver oferta",
            idBasco: "1235",
            infoBasico: [
                {
                    id: "341",
                    icon: <ExclamacionIcon />,
                    title: "Visor de eventos ",
                    texto: "Visualiza tus eventos o crea nuevos para empezar a organizar. "
                },
                {
                    id: "342",
                    icon: <ExclamacionIcon />,
                    title: "Carta de productos",
                    texto: "Añade tus platos y bebidas para crear tu carta de productos y utilizarlos en tus menús.  "
                },
                {
                    id: "343",
                    icon: <ExclamacionIcon />,
                    title: "Menú del evento",
                    texto: "Asigna a cada uno de tus eventos un menú y organizalo según las necesidades de tus clientes. "
                },
                {
                    id: "344",
                    icon: <ExclamacionIcon />,
                    title: "Lista de invitados",
                    texto: "Lleva el control de la lista de invitados de tus eventos, la mesa asignada y confirmación de asistencia."
                },
                {
                    id: "345",
                    icon: <ExclamacionIcon />,
                    title: "Visor de intinerario ",
                    texto: "Visualiza el intinerario de cada evento para conocer las horas y tareas de cada responsable.  "
                },
                {
                    id: "346",
                    icon: <ExclamacionIcon />,
                    title: "Chat en línea",
                    texto: "Ten contacto en tiempo real con invitados, organizadores y profesionales de cada evento."
                },
                {
                    id: "347",
                    icon: <ExclamacionIcon />,
                    title: "Contactos",
                    texto: "Crea tu lista de contactos de personas/empresas y centralizalas en un sólo lugar. "
                },
            ],
            idPremium: "5679",
            infoPremium: [
                {
                    id: "348",
                    icon: <ExclamacionIcon />,
                    title: "Visor de eventos ",
                    texto: "Visualiza tus eventos o crea nuevos para empezar a organizar. "
                },
                {
                    id: "349",
                    icon: <ExclamacionIcon />,
                    title: "Carta de productos",
                    texto: "Añade tus platos y bebidas para crear tu carta de productos y utilizarlos en tus menús.  "
                },
                {
                    id: "3410",
                    icon: <ExclamacionIcon />,
                    title: "Plantilla del menú",
                    texto: "Crea tus propias plantillas de menú y genera tu propia base adaptable para todos tus eventos."
                },
                {
                    id: "3411",
                    icon: <ExclamacionIcon />,
                    title: "Menú del evento",
                    texto: "Asigna a cada uno de tus eventos un menú y organizalo según las necesidades de tus clientes. "
                },
                {
                    id: "3412",
                    icon: <ExclamacionIcon />,
                    title: "Confirmación",
                    texto: "Envia a la lista de invitados un mensaje de reconfirmación de asistencia, alérgenos y plato seleccionado. "
                },
                {
                    id: "3413",
                    icon: <ExclamacionIcon />,
                    title: "Lista de invitados",
                    texto: "Lleva el control de la lista de invitados de tus eventos, la mesa asignada y confirmación de asistencia."
                },
                {
                    id: "3414",
                    icon: <ExclamacionIcon />,
                    title: "Visor de intinerario ",
                    texto: "Visualiza el intinerario de cada evento para conocer las horas y tareas de cada responsable.  "
                },
                {
                    id: "3415",
                    icon: <ExclamacionIcon />,
                    title: "Chat en línea",
                    texto: "Ten contacto en tiempo real con invitados, organizadores y profesionales de cada evento."
                },
                {
                    id: "3416",
                    icon: <ExclamacionIcon />,
                    title: "Contactos",
                    texto: "Crea tu lista de contactos de personas/empresas y centralizalas en un sólo lugar. "
                },
                {
                    id: "3417",
                    icon: <ExclamacionIcon />,
                    title: "Calendario",
                    texto: "Agenda tus citas, eventos, programa tus reuniones  en tu calendario sincronizado."
                },
            ],
            pagoBasico: "https://buy.stripe.com/test_aEU8xg8T60tIg2AbIJ",
            pagoPremium: "https://buy.stripe.com/test_7sI28S6KYfoC2bK7sx",
            estatus: "basico",
            tituloEstatus: "Gratis durante el período de prueba",
            precio: "$ 49 al mes ",
            precioPremium: "$ 157 al mes ",
            buttonAdd: "+ Añadir complemento ",
            buttonDelete: "- Eliminar complemento",
            iconoVideo: <VideoIcon />,
            video: "Ver video (00:30)"
        },
        {
            id: "56",
            icon: "/Facturacion/2corazonesCuadro.png",
            iconPremium: "/Facturacion/weddingPremium2.png",
            title: "Módulo Wedding Planner",
            text: "Automatiza tareas de gestión en lista de invitados, presupuestos e invitaciones.",
            textPremium: "Especial para organizadores de eventos. Gestiona las listas de invitados,  presupuestos, invitaciones, coordina las actividades entre los distintos proveedores y más.",
            button: "Ver oferta",
            idBasco: "1236",
            infoBasico: [
                {
                    id: "3418",
                    icon: <ExclamacionIcon />,
                    title: "Visor de eventos",
                    texto: "Visualiza tus eventos o crea nuevos para empezar a organizar."
                },
                {
                    id: "3419",
                    icon: <ExclamacionIcon />,
                    title: "Lista de invitados",
                    texto: "Lleva el control de la lista de invitados de tus eventos, la mesa asignada y confirmación de asistencia."
                },
                {
                    id: "3420",
                    icon: <ExclamacionIcon />,
                    title: "Enviar invitaciones ",
                    texto: "Envia las invitaciones del evento por email. SMS o whatsapp en forma simultanea y confirma la asistencia al evento"
                },
                {
                    id: "3421",
                    icon: <ExclamacionIcon />,
                    title: "Presupuesto",
                    texto: "Gestiona el presupuesto según evento y lleva el control del costo y pagos realizados."
                },
                {
                    id: "3422",
                    icon: <ExclamacionIcon />,
                    title: "Crea intinerarios",
                    texto: "Crea el itinerario, ordenando tareas y asignado responsables según el evento. "
                },
                {
                    id: "3423",
                    icon: <ExclamacionIcon />,
                    title: "Chat en línea",
                    texto: "Ten contacto en tiempo real con invitados, organizadores y profesionales de cada evento."
                },
                {
                    id: "3424",
                    icon: <ExclamacionIcon />,
                    title: "Contactos",
                    texto: "Crea tu lista de contactos de personas/empresas y centralizalas en un sólo lugar. "
                },
            ],
            idPremium: "56710",
            infoPremium: [
                {
                    id: "3425",
                    icon: <ExclamacionIcon />,
                    title: "Visor de eventos",
                    texto: "Visualiza tus eventos o crea nuevos para empezar a organizar."
                },
                {
                    id: "3426",
                    icon: <ExclamacionIcon />,
                    title: "Lista de invitados",
                    texto: "Lleva el control de la lista de invitados de tus eventos, la mesa asignada y confirmación de asistencia."
                },
                {
                    id: "3427",
                    icon: <ExclamacionIcon />,
                    title: "Diseño de invitaciones",
                    texto: "Obtén un diseño de invitacion personalizado de nuestro marketplace "
                },
                {
                    id: "3428",
                    icon: <ExclamacionIcon />,
                    title: "Enviar invitaciones ",
                    texto: "Envia las invitaciones del evento por email. SMS o whatsapp en forma simultanea y confirma la asistencia al evento"
                },
                {
                    id: "3429",
                    icon: <ExclamacionIcon />,
                    title: "Crea intinerarios",
                    texto: "Crea los itinerarios según evento, anexando consejos listado de horas y tareas para compartir con tus clientes."
                },
                {
                    id: "3430",
                    icon: <ExclamacionIcon />,
                    title: "Presupuesto",
                    texto: "Gestiona el presupuesto según evento y lleva el control del costo y pagos realizados."
                },
                {
                    id: "3431",
                    icon: <ExclamacionIcon />,
                    title: "Crea intinerarios",
                    texto: "Crea el itinerario, ordenando tareas y asignado responsables según el evento. "
                },
                {
                    id: "3432",
                    icon: <ExclamacionIcon />,
                    title: "Chat en línea",
                    texto: "Ten contacto en tiempo real con invitados, organizadores y profesionales de cada evento."
                },
                {
                    id: "3433",
                    icon: <ExclamacionIcon />,
                    title: "Contactos",
                    texto: "Crea tu lista de contactos de personas/empresas y centralizalas en un sólo lugar. "
                },
                {
                    id: "3434",
                    icon: <ExclamacionIcon />,
                    title: "Calendario",
                    texto: "Agenda tus citas, eventos, programa tus reuniones  en tu calendario sincronizado. "
                },
            ],
            pagoBasico: "https://buy.stripe.com/test_fZeeVE4CQ1xM03C3ck",
            pagoPremium: "https://buy.stripe.com/test_dR66p86KYfoCaIg5kq",
            estatus: "basico",
            tituloEstatus: "Gratis durante el período de prueba",
            precio: "$ 49 al mes ",
            precioPremium: "$ 157 al mes ",
            buttonAdd: "+ Añadir complemento ",
            buttonDelete: "- Eliminar complemento",
            iconoVideo: <VideoIcon />,
            video: "Ver video (00:30)"
        },
        {
            id: "78",
            icon: "/Facturacion/fotografoCuadro.png",
            iconPremium: "/Facturacion/FotografoPremium.png",
            title: "Módulo Fotográfos",
            text: "Gestiona la descarga de fotográfias de tus eventos además  automatiza tus presupuestos y contratos. ",
            textPremium: "Especial para fotográfos. Brinda a tus clientes una plataforma óptima e intuitiva para descargar las fotografías de su eventos además de organizar tus proyectos, facturas y contratos. ",
            button: "Ver oferta",
            idBasco: "1237",
            infoBasico: [
                {
                    id: "3435",
                    icon: <ExclamacionIcon />,
                    title: "Chat en línea",
                    texto: "Ten contacto en tiempo real con invitados, organizadores y profesionales de cada evento. "
                },
                {
                    id: "3436",
                    icon: <ExclamacionIcon />,
                    title: "Contactos",
                    texto: "Crea tu lista de contactos de personas/empresas y centralizalas en un sólo lugar. "
                },
            ],
            idPremium: "56711",
            infoPremium: [
                {
                    id: "3437",
                    icon: <ExclamacionIcon />,
                    title: "Chat en línea",
                    texto: "Ten contacto en tiempo real con invitados, organizadores y profesionales de cada evento. "
                },
                {
                    id: "3438",
                    icon: <ExclamacionIcon />,
                    title: "Contactos",
                    texto: "Crea tu lista de contactos de personas/empresas y centralizalas en un sólo lugar. "
                },
                {
                    id: "3439",
                    icon: <ExclamacionIcon />,
                    title: "Colecciones",
                    texto: "Publica las colecciones de fotos y videos de tus eventos con link de descarga."
                },
                {
                    id: "3440",
                    icon: <ExclamacionIcon />,
                    title: "Proyectos",
                    texto: "Organiza tus proyectos según evento y ordena en un sólo lugar contrato, cuestionarios y facturas."
                },
                {
                    id: "3441",
                    icon: <ExclamacionIcon />,
                    title: "Calendario",
                    texto: "Agenda tus citas, eventos, programa tus reuniones  en tu calendario sincronizado."
                },
            ],
            pagoBasico: "https://buy.stripe.com/test_7sI8xg2uI5O27w43cl",
            pagoPremium: "https://buy.stripe.com/test_aEUcNwgly0tIaIg14b",
            estatus: "basico",
            tituloEstatus: "Gratis durante el período de prueba",
            precio: "$ 49 al mes ",
            precioPremium: "$ 157 al mes ",
            buttonAdd: "+ Añadir complemento ",
            buttonDelete: "- Eliminar complemento",
            iconoVideo: <VideoIcon />,
            video: "Ver video (00:30)"
        },
    ]
    
    const dataComponents = [
        {
            component: <InfoModulos dataArry={dataArry} setOptionSelect={setOptionSelect} />
        },
        {
            component: <InfoModuloFacturacion dataArry={dataArry} actionButtton={setOptionSelect} producto={producto} plan={plan}  />
        },
        {
            component: <DetalladoCompra actionButtton={setOptionSelect} />
        },
        {
            component: <DatosFacturacion actionButtton={setOptionSelect} />
        }
    ]

    return (
        <div>
            {dataComponents[optionSelect].component}
        </div>
    )
}

