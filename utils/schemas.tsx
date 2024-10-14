import { FetchGraphQL, queries } from "./Fetching";
import { formatTime } from "./formatTime";
import { PermisosIcon, CampañasIcon, MetricasSociales, MarcasEmIcon, InicioIcon, PreguntasFrecuentes, ChatIcon, CategoriasIcon, SubCategoriaIcon, CaracteristicasIcon, PostIcon, Secciones2Icon, CorazonIcon, Calendario, LugaresBodas, Catering, WeddingPlanner, FotografoMenu, Contactos, MaletaIcon, DemoEnterprice, RpIcon, ClusterIcon, BuzonProsIcon, Leads1Icon, Invitados1Icon, ChatEnVivoIcon, FormulariosWebIcon, ChatBotIcon, VisitasWebIcon, Mensajes1Icon } from "../components/Icons/index";
import { ClubIcon } from "lucide-react";
import { IoSettingsOutline } from "react-icons/io5";
import { ComponentProps, FC } from "react";
import { AccessorFn, FilterFn, FilterFnOption, SortingFnOption } from "@tanstack/react-table";
import { fuzzySort } from "../components/TableJF";
import { ClusterInfo1, CompVisitasWebs, InfoGeneral1 } from "../components/NuevoEvento/ClusterMod";



// componentes que definen la estructura del menu, fetchs,columnas visibles en la tabla y los inputs que componen el formulario

// Para agregar otro componente para definir una nueva estructura: 
//  1- Crea el componente que define la estructura 
//  2- Sigue los pasos en el componente ./components/Datatable/Columns.js

export const visibleColumns = [
  { accessor: "_id", show: false },
  { accessor: "businessName", show: true },
  { accessor: "createdAt", show: true },
  { accessor: "imgMiniatura", show: true },
  { accessor: "slug", show: true },
  { accessor: "status", show: false },
  { accessor: "title", show: true },
  { accessor: "updatedAt", show: false },
  { accessor: "socialMedia", show: false },
  { accessor: "link", show: false },
]

interface Query {
  query: string
}

interface Schema {
  title: string
  roles: string[]
  children?: SchemaChildren[]
  icon?: JSX.Element
  hidden?: boolean
}

export interface childrenSchema {
  Header?: string
  accessor?: string
  type?: string
  required?: boolean
  roles?: string[]
  enableHiding?: boolean
  typeFile?: string
  filterFn?: FilterFnOption<any>
  sortingFn?: SortingFnOption<any>
  Cell?: any
  CellComponent?: JSX.Element
  api?: string
  getData?: Query
  getByID?: Query
  createEntry?: Query
  updateEntry?: Query
  deleteEntry?: Query
  schema?: string //revisar
}

export interface SchemaChildren extends Schema {
  route?: string
  subTitle?: string
  resumenRout?: string
  getData?: Query
  getByID?: Query
  createEntry?: Query
  updateEntry?: Query
  deleteEntry?: Query
  schema?: childrenSchema[]
  api?: string
  component?: JSX.Element
}

export const BodyStaticAPP: Schema[] = [
  {
    title: "",
    roles: ["all"],
    children: [
      {
        icon: <CorazonIcon className="" />,
        title: "Inicio",
        roles: ["all"],
        route: "",
      },
    ]
  },
  {
    title: "Mis Empresas",
    roles: ["empresa"],
    children: [
      {
        icon: <MaletaIcon className="h-6 w-6" />,
        title: "Marcas",
        roles: ["admin", "empresa"],
        route: "brands"
      },
      {
        title: null,
        hidden: true,
        subTitle: "Gestiona, crea y publica tus marcas para promocionar tus servicios a la comunidad de novios de Bodas de Hoy. ",
        resumenRout: "InfoPage/marcas",
        roles: ["admin", "empresa"],
        route: "brands/brands",
        getData: FetchGraphQL.business.getBusinessAll,
        getByID: FetchGraphQL.business.getOneBusiness,
        createEntry: FetchGraphQL.business.createBusiness,
        updateEntry: FetchGraphQL.business.updateBusiness,
        deleteEntry: FetchGraphQL.business.deleteBusiness,
        schema: [
          {
            Header: "ID",
            accessor: "_id",
          },
          {
            Header: "Nombre de empresa",
            accessor: "businessName",
            type: "textareaSizable",
            required: true,
          },
          {
            Header: "Slug",
            accessor: "slug",
            type: "slug",

          },
          {
            Header: "¿Publicar?",
            accessor: "status",
            type: "switch",
            roles: ["admin", "editor"]
          },
          {
            Header: "Pagina web",
            accessor: "webPage",
            type: "urlLg",
          },
          {
            Header: "Imagen Miniatura",
            accessor: "imgMiniatura",
            type: "image",
            typeFile: "image",
            required: true,
          },
          {
            Header: "Logotipo",
            accessor: "imgLogo",
            type: "image",
            typeFile: "image",
            required: true,
          },
          {
            Header: "Carrusel de imagenes",
            accessor: "imgCarrusel",
            type: "imageMultiple",
          },
          {
            Header: "Contenido",
            accessor: "content",
            type: "ckeditor",
            required: true,
          },
          {
            Header: "Usuario UID",
            accessor: "userUid",
          },
          {
            Header: "Elegir categorias",
            accessor: "subCategories",
            type: "questions",
            required: true,
          },
          {
            Header: "Nombre de contacto",
            accessor: "contactName",
            type: "string",
            required: true,
          },
          {
            Header: "Email de contacto",
            accessor: "contactEmail",
            type: "email-4",
            required: true,
          },
          {
            Header: "Telefono fijo",
            accessor: "landline",
            type: "string",
          },
          {
            Header: "Telefono movil",
            accessor: "mobilePhone",
            type: "string",
          },
          {
            Header: "Whatsapp",
            accessor: "whatsapp",
            type: "string",
          },
          {
            Header: "Twitter",
            accessor: "twitter",
            type: "url",
          },
          {
            Header: "Facebook",
            accessor: "facebook",
            type: "url",
          },
          {
            Header: "Linkedin",
            accessor: "linkedin",
            type: "url",
          },
          {
            Header: "Youtube",
            accessor: "youtube",
            type: "url",
          },
          {
            Header: "Instagram",
            accessor: "instagram",
            type: "url",
          },
          {
            Header: "SEO",
            type: "desarrollo"
          },
          {
            type: "br-2",
          },
          {
            Header: "País",//
            accessor: "country",
            type: "country",
            required: true,
          },
          {
            Header: "Ciudad",//
            accessor: "city",
            type: "string",
            required: true,
          },
          {
            Header: "Codigo Postal",
            accessor: "zip",
            type: "number-2",
          },
          {
            Header: "Direccion",//
            accessor: "address",
            type: "stringL",
            required: true,

          },
          {
            Header: "Fase",
            accessor: "fase",
          },
          {
            Header: "Creado el",
            accessor: "createdAt",
            Cell: (props) => formatTime(props.value, "es"),
          },
          {
            Header: "Actualizado el",
            accessor: "updatedAt",
            Cell: (props) => formatTime(props.value, "es"),
          },
          {
            Header: "Ubicacion exacta",
            accessor: "coordinates",
            type: "maps",
            required: true,
          },

        ],
      },
      {
        title: null,
        hidden: true,
        roles: ["admin", "empresa"],
        route: "brands/mywebsites",
        getData: { query: queries.getCodePage },
        getByID: { query: queries.getCodePage },
        createEntry: { query: queries.createCodePage },
        schema: [
          {
            Header: "ID",
            accessor: "_id",
          },
          {
            Header: "Titulo",
            accessor: "title",
          },
          {
            Header: "Creado el",
            accessor: "createdAt",
            Cell: (props) => formatTime(props.value, "es"),
          },
          {
            Header: "Actualizado el",
            accessor: "updatedAt",
            Cell: (props) => formatTime(props.value, "es"),
          },
        ]
      },
      {
        title: null,
        hidden: true,
        roles: ["admin", "empresa"],
        route: "brands/links",
        api: "eventos",
        getData: { query: queries.getLinks },
        getByID: { query: queries.getOneLink },
        createEntry: { query: queries.createLink },
        updateEntry: null,
        deleteEntry: null,
        schema: [
          {
            Header: "ID",
            accessor: "_id",
          },
          {
            Header: "Titulo",
            accessor: "title",
            type: "stringL",
            required: true,
          },
          {
            Header: "Red social",
            accessor: "socialMedia",
            type: "string",
            CellComponent: <></>,
            required: true,
          },
          {
            Header: "Link",
            accessor: "link",
          },
          {
            Header: "Creado el",
            accessor: "createdAt",
            Cell: (props) => formatTime(props.value, "es"),
          },
          {
            Header: "Actualizado el",
            accessor: "updatedAt",
            Cell: (props) => formatTime(props.value, "es"),
          },
        ]
      },
      {
        icon: <CategoriasIcon />,
        title: "Categorias",
        roles: ["admin"],
        route: "categoryBusiness",
        getData: FetchGraphQL.catBusiness.getCategoryBusiness,
        getByID: FetchGraphQL.catBusiness.getOneCategoryBusiness,
        createEntry: FetchGraphQL.catBusiness.createCategoryBusiness,
        deleteEntry: FetchGraphQL.catBusiness.deleteCategoryBusiness,
        updateEntry: FetchGraphQL.catBusiness.updateCategoryBusiness,
        schema: [
          {
            Header: "ID",
            accessor: "_id",
          },
          {
            Header: "Titulo",
            accessor: "title",
            type: "textareaSizable",
            required: true,
          },
          {
            Header: "Slug",
            accessor: "slug",
            type: "textareaSizable",
            required: true,
          },
          {
            Header: "Descripcion",
            accessor: "description",
            type: "textareaSizable",
            required: true,
          },
          {
            Header: "Imagen Banner",
            accessor: "imgBanner",
            type: "image",
            typeFile: "image",
            required: true,
          },
          {
            Header: "Imagen Miniatura",
            accessor: "imgMiniatura",
            type: "image",
            typeFile: "image",
            required: true,
          },
          {
            Header: "Icono",
            accessor: "icon",
            type: "image",
            typeFile: "svg",
            required: true,
          },
          {
            Header: "Sub Categorias",
            accessor: "subCategories",
            type: "relationship",
            getData: FetchGraphQL.subCatBusiness.getSubCategoryBusiness,
            required: true,
          },
          {
            Header: "Creado el",
            accessor: "createdAt",
            Cell: (props) => formatTime(props.value, "es"),
          },
          {
            Header: "Actualizado el",
            accessor: "updatedAt",
            Cell: (props) => formatTime(props.value, "es"),
          },
        ],
      },
      {
        icon: <SubCategoriaIcon className="h-6 w-6" />,
        title: "Sub Categorias",
        roles: ["admin"],
        route: "subcategoriesBusiness",
        getData: FetchGraphQL.subCatBusiness.getSubCategoryBusiness,
        getByID: FetchGraphQL.subCatBusiness.getOneSubCategoryBusiness,
        createEntry: FetchGraphQL.subCatBusiness.createSubCategoryBusiness,
        deleteEntry: FetchGraphQL.subCatBusiness.deleteSubCategoryBusiness,
        updateEntry: FetchGraphQL.subCatBusiness.updateSubCategoryBusiness,
        schema: [
          {
            Header: "ID",
            accessor: "_id",
          },
          {
            Header: "Titulo",
            accessor: "title",
            type: "textareaSizable",
            required: true,
          },
          {
            Header: "Encabezado H1",
            accessor: "heading",
            type: "textareaSizable",
          },
          {
            Header: "Slug",
            accessor: "slug",
            type: "textareaSizable",
            required: true,
          },
          {
            Header: "Creado el",
            accessor: "createdAt",
            Cell: (props) => formatTime(props.value, "es"),
          },
          {
            Header: "Actualizado el",
            accessor: "updatedAt",
            Cell: (props) => formatTime(props.value, "es"),
          },
          {
            Header: "Imagen Miniatura",
            accessor: "imgMiniatura",
            type: "image",
            typeFile: "image",
            required: true,
          },
          {
            Header: "Imagen Banner",
            accessor: "imgBanner",
            type: "image",
            typeFile: "image",
            required: true,

          },
          {
            Header: "Icono",
            accessor: "icon",
            type: "image",
            typeFile: "svg",
            required: true,
          },
          {
            Header: "Descripcion",
            accessor: "description",
            type: "textareaSizable",
            required: true,
          },
          {
            Header: "Caracteristicas",
            accessor: "characteristics",
            type: "relationship",
            getData: FetchGraphQL.characteristics.getAllCharacteristics,
            required: true,
          },
          {
            Header: "Preguntas Frecuentes",
            accessor: "questions",
            type: "relationship",
            getData: FetchGraphQL.questions.getAllQuestions,
            required: true,
          },
        ],
      },
      {
        icon: <CaracteristicasIcon />,
        title: "Caracteristicas",
        roles: ["admin"],
        route: "characteristics",
        getData: FetchGraphQL.characteristics.getAllCharacteristics,
        getByID: FetchGraphQL.characteristics.getOneCharacteristics,
        createEntry: FetchGraphQL.characteristics.createCharacteristics,
        deleteEntry: FetchGraphQL.characteristics.deleteCharacteristics,
        updateEntry: FetchGraphQL.characteristics.updateCharacteristics,
        schema: [
          {
            Header: "ID",
            accessor: "_id",
          },
          {
            Header: "Titulo",
            accessor: "title",
            type: "textareaSizable",
            required: true,
          },
          {
            Header: "Icono",
            accessor: "icon",
            type: "image",
            typeFile: "image",
          },
          {
            Header: "Elementos",
            accessor: "items",
            type: "fieldArray",
            schema: "object",
          },
          {
            Header: "Creado el",
            accessor: "createdAt",
            Cell: (props) => formatTime(props.value, "es"),
          },
          {
            Header: "Actualizado el",
            accessor: "updatedAt",
            Cell: (props) => formatTime(props.value, "es"),
          },
        ],
      },
      {
        icon: <CampañasIcon className="" />,
        title: "Eventos",
        roles: ["empresa"],
        route: "events",
        getData: FetchGraphQL.questions.getAllQuestions,
        getByID: FetchGraphQL.questions.getOneQuestion,
        createEntry: FetchGraphQL.questions.createQuestions,
        deleteEntry: FetchGraphQL.questions.deleteQuestions,
        updateEntry: FetchGraphQL.questions.updateQuestions,
        schema: [
          {
            Header: "ID",
            accessor: "_id",
          },
          {
            Header: "Titulo",
            accessor: "title",
            type: "textareaSizable",
            required: true,
          },
          {
            Header: "Slug",
            accessor: "slug",
            type: "textareaSizable",
            required: true,
          },
          {
            Header: "Creado el",
            accessor: "createdAt",
            Cell: (props) => formatTime(props.value, "es"),
          },
          {
            Header: "Actualizado el",
            accessor: "updatedAt",
            Cell: (props) => formatTime(props.value, "es"),
          },
        ],
      },
      {
        icon: <Calendario className="h-6 w-6" />,
        title: "Calendario",
        roles: ["admin", "empresa"],
        route: "calendario",
        schema: [],
      },
      {
        icon: <PreguntasFrecuentes />,
        title: "Preguntas frecuentes",
        roles: ["admin"],
        route: "questions",
        getData: FetchGraphQL.questions.getAllQuestions,
        getByID: FetchGraphQL.questions.getOneQuestion,
        createEntry: FetchGraphQL.questions.createQuestions,
        deleteEntry: FetchGraphQL.questions.deleteQuestions,
        updateEntry: FetchGraphQL.questions.updateQuestions,
        schema: [
          {
            Header: "ID",
            accessor: "_id",
          },
          {
            Header: "Titulo",
            accessor: "title",
            type: "textareaSizable",
            required: true,
          },
          {
            Header: "Creado el",
            accessor: "createdAt",
            Cell: (props) => formatTime(props.value, "es"),
          },
          {
            Header: "Actualizado el",
            accessor: "updatedAt",
            Cell: (props) => formatTime(props.value, "es"),
          },
        ],
      },
      {
        title: null,
        hidden: true,
        roles: ["all"],
        route: "whitelabel/setup",
        api: "eventos",
        getData: { query: queries.getWhiteLabel },
        createEntry: { query: queries.createWhiteLabel },
        updateEntry: { query: queries.updateWhiteLabels },
        schema: [
          {
            Header: "ID",
            accessor: "_id",
          },
          {
            Header: "Nombre",
            accessor: "name",
            type: "stringM",
          },
          {
            Header: "Dominio",
            accessor: "whiteLabelDomain",
            type: "stringM",
          },
          {
            Header: "Página web",
            accessor: "pathDirectory",
            type: "urlLg",
          },
          {
            Header: "Titulo del navegador",
            accessor: "headTitle",
            type: "stringL",
          },
          {
            Header: "Favicon",
            accessor: "logoDirectory",
            type: "urlLg",
          },
          {
            Header: "Logotipo",
            accessor: "logoDirectory",
            type: "urlLg",
          },
          {
            Header: "Color principal",
            accessor: "primaryColor",
            type: "color",
          },
          {
            Header: "Color secundario",
            accessor: "secondaryColor",
            type: "color",
          },
          {
            Header: "Color terciario",
            accessor: "tertiaryColor",
            type: "color",
          },
          {
            Header: "Color para fondos y rellenos",
            accessor: "baseColor",
            type: "color",
          },

        ],
      }

    ],
  },
  {
    title: "Módulos",
    roles: ["empresa"],
    children: [
      {
        icon: <LugaresBodas />,
        title: "Lugares para bodas",
        roles: ["admin", "empresa"],
        route: "lugaresBodas",
        schema: [],
      },
      {
        title: null,
        hidden: true,
        roles: ["admin", "empresa"],
        route: "itinerario",
        getData: { query: queries.getItinerario },
        getByID: { query: queries.getItinerario },
        createEntry: FetchGraphQL.business.createBusiness,
        deleteEntry: FetchGraphQL.business.deleteBusiness,
        schema: [
          {
            Header: "ID",
            accessor: "_id",
          },
          {
            Header: "Titulo",
            accessor: "title",
          },
          {
            Header: "Creado el",
            accessor: "createdAt",
            Cell: (props) => formatTime(props.value, "es"),
          },
          {
            Header: "Actualizado el",
            accessor: "updatedAt",
            Cell: (props) => formatTime(props.value, "es"),
          },
        ]
      },
      {
        title: null,
        hidden: true,
        roles: ["admin", "empresa"],
        route: "CartaProducto",
        getData: null,//sda{query: queries.getItinerario},
        getByID: null, // {query: queries.getItinerario},
        createEntry: null,// FetchGraphQL.business.createBusiness,
        updateEntry: null, // queries.updateCodePage,
        deleteEntry: null, // FetchGraphQL.business.deleteBusiness,
        schema: [
          {
            Header: "ID",
            accessor: "_id",
          },
          {
            Header: "Titulo",
            accessor: "title",
          },
          {
            Header: "Creado el",
            accessor: "createdAt",
            Cell: (props) => formatTime(props.value, "es"),
          },
          {
            Header: "Actualizado el",
            accessor: "updatedAt",
            Cell: (props) => formatTime(props.value, "es"),
          },
        ]
      },
      {
        icon: <Catering />,
        title: "Catering de bodas",
        roles: ["empresa"],
        route: "cateringBodas",
        schema: [],
      },
      {
        icon: <WeddingPlanner className="h-6 w-6" />,
        title: "Wedding Planner",
        roles: ["empresa"],
        route: "weddingPlanner",
        schema: [],
      },
      {
        icon: <FotografoMenu className="h-6 w-6" />,
        title: "Fotografos",
        roles: ["empresa"],
        route: "fotografo",
        schema: [],
      },
    ],
  },
  {
    title: "Chat en línea",
    roles: ["empresa"],
    children: [
      {
        icon: <ChatIcon />,
        title: "Chat",
        roles: ["admin", "empresa"],
        route: "chat",
        schema: [],
      },
      {
        icon: <Contactos />,
        title: "Contactos",
        roles: ["empresa"],
        route: "contactos",
        getData: null,
        getByID: null,
        createEntry: null,
        deleteEntry: null,
        updateEntry: null,
        schema: [],
      },
      {
        title: null,
        hidden: true,
        roles: ["admin", "empresa"],
        route: "contactosPersonas",
        getData: null,
        getByID: null,
        createEntry: null,
        updateEntry: null,
        deleteEntry: null,
        schema: [
          {
            Header: "ID",
            accessor: "_id",
          },
          {
            Header: "Titulo",
            accessor: "title",
          },
          {
            Header: "Creado el",
            accessor: "createdAt",
            Cell: (props) => formatTime(props.value, "es"),
          },
          {
            Header: "Actualizado el",
            accessor: "updatedAt",
            Cell: (props) => formatTime(props.value, "es"),
          },
        ]
      },
      {
        title: null,
        hidden: true,
        roles: ["admin", "empresa"],
        route: "contactosEmpresas",
        getData: null,
        getByID: null,
        createEntry: null,
        updateEntry: null,
        deleteEntry: null,
        schema: [
          {
            Header: "ID",
            accessor: "_id",
          },
          {
            Header: "Titulo",
            accessor: "title",
          },
          {
            Header: "Creado el",
            accessor: "createdAt",
            Cell: (props) => formatTime(props.value, "es"),
          },
          {
            Header: "Actualizado el",
            accessor: "updatedAt",
            Cell: (props) => formatTime(props.value, "es"),
          },
        ]
      },
    ],
  },
  {
    title: "Redes Sociales",
    roles: ["dev"],
    children: [
      {
        icon: <MetricasSociales className="" />,
        title: "Metricas Sociales",
        roles: ["all"],
        route: "page404",
      },
    ]
  },

  /*  Para realizar pruebas esta este menu aparte */

  {
    title: "Formacion Enterprice",
    roles: ["all"],
    children: [
      {
        icon: <RpIcon />,
        title: "RRPP",
        roles: ["all"],
        route: "RelacionesPublicas",
      },
      {
        icon: <CampañasIcon />,
        title: "Ticketing New",
        roles: ["all"],
        route: "events",
      },
      {
        icon: <ClusterIcon />,
        title: "Cluster",
        roles: ["all"],
        route: "cluster",
      },
      {
        icon: <BuzonProsIcon />,
        title: "Buzon de Prospectos",
        hidden: true,
        roles: ["all"],
        route: "cluster/buzonProspectos",
        getData: { query: queries.getAllUsers },
        getByID: null,
        createEntry: null,
        updateEntry: null,
        deleteEntry: null,
        schema: [
          // {
          //   Header: "ID",
          //   accessor: "_id",
          //   enableHiding: false,
          //   filterFn: 'fuzzy',
          //   sortingFn: fuzzySort,
          // },
          {
            Header: "Prospecto",
            accessor: "displayName",
            enableHiding: false,
            CellComponent: <></>,
            filterFn: 'fuzzy',
          },
          {
            Header: "Correo",
            accessor: "email",
            enableHiding: false,
            filterFn: 'fuzzy',
          },
          {
            Header: "Creado el",
            accessor: "createdAt",
            Cell: (props) => formatTime(props.value, "es"),
            enableHiding: false,
            filterFn: 'fuzzy',
          },
          {
            Header: "Actualizado el",
            accessor: "updatedAt",
            Cell: (props) => formatTime(props.value, "es"),
            enableHiding: false,
            filterFn: 'fuzzy',
          },
          {
            Header: "otro",
            accessor: "otro",
            Cell: (props) => formatTime(props.value, "es"),
            enableHiding: false,
            filterFn: 'fuzzy',
          },
        ]
      },
      {
        icon: <ChatEnVivoIcon />,
        title: "Chat en vivo",
        hidden: true,
        roles: ["all"],
        route: "cluster/chatVivo",
        component: <InfoGeneral1 />
      },
      {
        icon: <ChatBotIcon />,
        title: "Chatbot",
        hidden: true,
        roles: ["all"],
        route: "cluster/chatbot",
        component: <InfoGeneral1 />
      },
      {
        icon: <FormulariosWebIcon />,
        title: "Formularios Web",
        hidden: true,
        roles: ["all"],
        route: "cluster/formulariosWeb",
        component: <InfoGeneral1 />
      },
      {
        icon: <Leads1Icon />,
        title: "Leads",
        hidden: true,
        roles: ["all"],
        route: "cluster/leads",
        schema: [
          {
            Header: "ID",
            accessor: "_id",
            enableHiding: false,
            filterFn: 'fuzzy',
          },
          {
            Header: "Nombre",
            accessor: "nombre",
            enableHiding: false,
            filterFn: 'fuzzy',
          },
          {
            Header: "Evento",
            accessor: "Evento",
            enableHiding: false,
            filterFn: 'fuzzy',
          },
          {
            Header: "Tipo",
            accessor: "tipo",
            enableHiding: false,
            filterFn: 'fuzzy',
          },
          {
            Header: "Fecha",
            accessor: "fecha",
            enableHiding: false,
            filterFn: 'fuzzy',
          },
          {
            Header: "Creado el",
            accessor: "createdAt",
            Cell: (props) => formatTime(props.value, "es"),
            enableHiding: false,
            filterFn: 'fuzzy',
          },
          {
            Header: "Actualizado el",
            accessor: "updatedAt",
            Cell: (props) => formatTime(props.value, "es"),
            enableHiding: false,
            filterFn: 'fuzzy',
          },
        ]
      },
      {
        icon: <Invitados1Icon />,
        title: "Invitados",
        hidden: true,
        roles: ["all"],
        route: "cluster/invitados",
        schema: [
          {
            Header: "ID",
            accessor: "_id",
            enableHiding: false,
            filterFn: 'fuzzy',
          },
          {
            Header: "Nombre",
            accessor: "nombre",
            enableHiding: false,
            filterFn: 'fuzzy',
          },
          {
            Header: "Evento",
            accessor: "Evento",
            enableHiding: false,
            filterFn: 'fuzzy',
          },
          {
            Header: "Tipo",
            accessor: "tipo",
            enableHiding: false,
            filterFn: 'fuzzy',
          },
          {
            Header: "Fecha",
            accessor: "fecha",
            enableHiding: false,
            filterFn: 'fuzzy',
          },
          {
            Header: "Creado el",
            accessor: "createdAt",
            Cell: (props) => formatTime(props.value, "es"),
            enableHiding: false,
            filterFn: 'fuzzy',
          },
          {
            Header: "Actualizado el",
            accessor: "updatedAt",
            Cell: (props) => formatTime(props.value, "es"),
            enableHiding: false,
            filterFn: 'fuzzy',
          },
        ]
      },
      {
        icon: <VisitasWebIcon />,
        title: "Visitas Web",
        hidden: true,
        roles: ["all"],
        route: "cluster/visitasWeb",
        component: <CompVisitasWebs />
      },
      {
        icon: <Mensajes1Icon />,
        title: "Mensajes",
        hidden: true,
        roles: ["all"],
        route: "cluster/mensajes",
        component: <ClusterInfo1 />
      },
    ]
  },

  {
    title: "Blog",
    roles: ["all"],
    children: [
      {
        icon: <PostIcon />,
        title: "Publicaciones",
        roles: ["all"],
        subTitle: "Escribe y publica tus articulos en el magazine de Bodas de Hoy ",
        resumenRout: "InfoPage/publicaciones",
        route: "posts",
        getData: FetchGraphQL.posts.getAllPost,
        getByID: FetchGraphQL.posts.getOnePost,
        createEntry: FetchGraphQL.posts.createPost,
        deleteEntry: FetchGraphQL.posts.deletePost,
        updateEntry: FetchGraphQL.posts.updatePost,
        schema: [
          {
            Header: "seudonimo",
            type: "Seudonimo"
          },
          {
            Header: "ID",
            accessor: "_id",
          },
          {
            Header: "Titulo",
            accessor: "title",
            type: "textareaSizable",
            required: true,
          },
          {
            Header: "Subtitulo",
            accessor: "subTitle",
            type: "textareaSizable",
          },
          {
            Header: "Slug",
            accessor: "slug",
            type: "slug",
          },
          {
            Header: "Contenido",
            accessor: "content",
            type: "ckeditor",
            required: true,
          },
          {
            Header: "¿Publicar?",
            accessor: "status",
            type: "switch",
            roles: ["admin", "editor"]
          },
          {
            Header: "SEO Descripción",
            accessor: "seoDescription",
            type: "textareaSizable",
            required: true,
          },

          {
            Header: "Categorias",
            accessor: "subCategories",
            type: "relationship",
            getData: FetchGraphQL.subCategoryPost.getAllSubCategoryPost,
          },
          {
            Header: "Etiquetas",
            accessor: "tags",
            type: "fieldArray",
            schema: "string"
          },
          {
            Header: "Imagen o Video Principal",
            accessor: "imgMiniatura",
            type: "image",
            typeFile: "all",
            required: true,
          },
          {
            Header: "Carrusel de imagenes",
            accessor: "imgCarrusel",
            type: "imageMultiple",
            required: true,
          },

          // {
          //   Header: "Status",
          //   accessor: "status",
          // },
          {
            Header: "Vistas",
            accessor: "views",
          },
          {
            Header: "Creado el",
            accessor: "createdAt",
            Cell: (props) => formatTime(props.value, "es"),
          },
          {
            Header: "Actualizado el",
            accessor: "updatedAt",
            Cell: (props) => formatTime(props.value, "es"),
          },
          {
            Header: "SEO",
            type: "desarrollo"
          },


        ],
      },
      {
        icon: <CategoriasIcon />,
        title: "Categorias",
        roles: ["admin"],
        route: "categoriesPosts",
        getData: FetchGraphQL.categoryPost.getAllCategoryPost,
        getByID: FetchGraphQL.categoryPost.getOneCategoryPost,
        createEntry: FetchGraphQL.categoryPost.createCategoryPost,
        updateEntry: FetchGraphQL.categoryPost.updateCategoryPost,
        deleteEntry: FetchGraphQL.categoryPost.deleteCategoryPost,
        schema: [
          {
            Header: "Identificador",
            accessor: "_id",
          },
          {
            Header: "Titulo",
            accessor: "title",
            type: "textareaSizable",
            required: true,
          },
          {
            Header: "Encabezado",
            accessor: "heading",
            type: "textareaSizable",
          },
          {
            Header: "Slug",
            accessor: "slug",
            type: "textareaSizable",
            required: true,
          },
          {
            Header: "Imagen Miniatura",
            accessor: "imgMiniatura",
            type: "image",
            typeFile: "image",
          },
          {
            Header: "Imagen Banner",
            accessor: "imgBanner",
            type: "image",
            typeFile: "image",
          },
          {
            Header: "Icon",
            accessor: "icon",
            type: "image",
            typeFile: "image",
          },
          {
            Header: "Sub Categorias",
            accessor: "subCategories",
            type: "relationship",
            getData: FetchGraphQL.subCategoryPost.getAllSubCategoryPost,
          },
          {
            Header: "Creado el",
            accessor: "createdAt",
            Cell: (props) => formatTime(props.value, "es"),
          },
          {
            Header: "Actualizado el",
            accessor: "updatedAt",
            Cell: (props) => formatTime(props.value, "es"),
          },
        ],
      },
      {
        icon: <SubCategoriaIcon />,
        title: "Sub Categorias",
        roles: ["admin"],
        route: "subcategoriesPost",
        getData: FetchGraphQL.subCategoryPost.getAllSubCategoryPost,
        getByID: FetchGraphQL.subCategoryPost.getOneSubCategoryPost,
        createEntry: FetchGraphQL.subCategoryPost.createSubCategoryPost,
        updateEntry: FetchGraphQL.subCategoryPost.updateSubCategoryPost,
        deleteEntry: FetchGraphQL.subCategoryPost.deleteSubCategoryPost,
        schema: [
          {
            Header: "Identificador",
            accessor: "_id",
          },
          {
            Header: "Titulo",
            accessor: "title",
            type: "textareaSizable",
            required: true,
          },
          {
            Header: "Encabezado",
            accessor: "heading",
            type: "textareaSizable",
          },
          {
            Header: "Slug",
            accessor: "slug",
            type: "textareaSizable",
            required: true,
          },
          {
            Header: "Imagen Miniatura",
            accessor: "imgMiniatura",
            type: "image",
            typeFile: "image",
          },
          {
            Header: "Imagen Banner",
            accessor: "imgBanner",
            type: "image",
            typeFile: "image",
          },
          {
            Header: "Icon",
            accessor: "icon",
            type: "image",
            typeFile: "image",
          },
          {
            Header: "Creado el",
            accessor: "createdAt",
            Cell: (props) => formatTime(props.value, "es"),
          },
          {
            Header: "Actualizado el",
            accessor: "updatedAt",
            Cell: (props) => formatTime(props.value, "es"),
          },
        ],
      },
    ],
  },
  {
    title: "Editor Web",
    roles: ["empresa"],
    children: [
      {
        icon: <MarcasEmIcon className="" />,
        title: "Web builder",
        roles: ["all"],
        route: "webbuilder",
        schema: [],
      },
    ]
  },
  /* {
    title: "Marca Blanca",
    roles: ["empresa"],
    children: [
      {
        icon: <IoSettingsOutline className="w-5 h-5" />,
        title: "Configuración",
        roles: ["all"],
        route: "whitelabel/setup",
        getData: "",
        getByID: "",
        createEntry: "",
        updateEntry: "",
        deleteEntry: "",
        schema: [
          {
            Header: "ID",
            accessor: "_id",
          },
          {
            Header: "Nombre",
            accessor: "name",
            type: "stringM",
          },
          {
            Header: "Dominio",
            accessor: "domain",
            type: "stringM",
          },
          {
            Header: "Página web",
            accessor: "pathDirectory",
            type: "urlLg",
          },
          {
            Header: "Titulo del navegador",
            accessor: "headTitle",
            type: "stringL",
          },
          {
            Header: "Favicon",
            accessor: "logoDirectory",
            type: "urlLg",
          },
          {
            Header: "Logotipo",
            accessor: "logoDirectory",
            type: "urlLg",
          },
          {
            Header: "Color pirncipal",
            accessor: "primaryColor",
            type: "color",
          },
          {
            Header: "Color secundario",
            accessor: "secondaryColor",
            type: "color",
          },
          {
            Header: "Color terciario",
            accessor: "tertiaryColor",
            type: "color",
          },
          {
            Header: "Color para fondos y rellenos",
            accessor: "baseColor",
            type: "color",
          },

        ],
      },
    ]
  },
 */
  {
    title: "Marketplace",
    roles: ["empresa"],
    children: [
      {
        icon: <MarcasEmIcon className="" />,
        title: "Tienda",
        roles: ["all"],
        route: "marketplace",
        schema: [],
      },
    ]
  },
  {
    title: "Páginas",
    roles: ["admin"],
    children: [
      {
        icon: <Secciones2Icon />,
        title: "Secciones",
        roles: ["admin"],
        route: "sections",
        getData: FetchGraphQL.sections.getAllPage,
        getByID: FetchGraphQL.sections.getOnePage,
        createEntry: FetchGraphQL.sections.createPage,
        deleteEntry: FetchGraphQL.sections.deletePage,
        updateEntry: FetchGraphQL.sections.updatePage,
        schema: [
          {
            Header: "ID",
            accessor: "_id",
          },
          {
            Header: "Titulo",
            accessor: "title",
            type: "textareaSizable",
          },
          {
            Header: "Subtitulo",
            accessor: "subTitle",
            type: "textareaSizable",
          },
          {
            Header: "Slug",
            accessor: "slug",
            type: "textareaSizable",
          },
          {
            Header: "estatus",
            accessor: "status",
            type: "switch",
          },
          {
            Header: "Contenido",
            accessor: "content",
            type: "ckeditor",
          },
        ],
      },
    ]
  },

  {
    title: "Configuracion",
    roles: ["dev"],
    children: [
      {
        icon: <PermisosIcon />,
        title: "Permisos",
        roles: ["all"],
        route: "page404"
      }
    ]
  }
];


export const InfoItemsFacturation = [
  {
    title: "Visor de eventos",
    texto: "Visualiza tus eventos o crea nuevos para empezar a organizar."
  },
  {
    title: "Carta de productos",
    texto: "Añade tus platos y bebidas para crear tu carta de productos y utilizarlos en tus menús."
  },
  {
    title: "Plantilla del menú",
    texto: "Crea tus propias plantillas de menú y genera tu propia base adaptable para todos tus eventos."
  },
  {
    title: "Menú del evento",
    texto: "Asigna a cada uno de tus eventos un menú y organizalo según las necesidades de tus clientes. "
  },
  {
    title: "Confirmación",
    texto: "Envia a la lista de invitados un mensaje de reconfirmación de asistencia, alérgenos y plato seleccionado. "
  },
  {
    title: "Lista de invitados",
    texto: "Lleva el control de la lista de invitados de tus eventos, la mesa asignada y confirmación de asistencia."
  },
  {
    title: "Visor de itinerario",
    texto: "Visualiza el intinerario de cada evento para conocer las horas y tareas de cada responsable.  "
  },
  {
    title: "Chat en línea",
    texto: "Ten contacto en tiempo real con invitados, organizadores y profesionales de cada evento."
  },
  {
    title: "Contactos",
    texto: "Crea tu lista de contactos de personas/empresas y centralizalas en un sólo lugar. "
  },
  {
    title: "Calendario",
    texto: "Agenda tus citas, eventos, programa tus reuniones  en tu calendario sincronizado."
  },
  {
    title: "Enviar invitaciones",
    texto: "Envia las invitaciones del evento por email. SMS o whatsapp en forma simultanea y confirma la asistencia al evento."
  },
  {
    title: "Presupuesto",
    texto: "Gestiona el presupuesto según evento y lleva el control del costo y pagos realizados."
  },
  {
    title: "Crea itinerarios",
    texto: "Crea el itinerario, ordenando tareas y asignado responsables según el evento."
  },
  {
    title: "Planos del evento",
    texto: "Asigna a cada uno de tus eventos un plano y diseña la distribución del salón, mobiliario, proveedores e invitados."
  },
  {
    title: "Colecciones",
    texto: "Publica las colecciones de fotos y videos de tus eventos con link de descarga."
  },
  {
    title: "Proyectos",
    texto: "Organiza tus proyectos según evento y ordena en un sólo lugar contrato, cuestionarios y facturas."
  },
  {
    title: "Diseño de invitaciones",
    texto: "Obtén un diseño de invitacion personalizado de nuestro marketplace."
  },
  {
    title: "Plantilla del salón",
    texto: "Crea plantillas de los planos de tus salones para reutilizar en tus eventos y añadir a la versión novios."
  }
]