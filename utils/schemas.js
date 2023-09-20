import { FetchGraphQL } from "../utils/Fetching";
import { formatTime } from "../utils/formatTime";
import { PermisosIcon, CampañasIcon, MetricasSociales, MarcasEmIcon, InicioIcon, PreguntasFrecuentes, ChatIcon, CategoriasIcon, SubCategoriaIcon, CaracteristicasIcon, PostIcon, Secciones2Icon, CorazonIcon, Calendario, LugaresBodas, Catering, WeddingPlanner, FotografoMenu, Contactos, MaletaIcon } from "../components/Icons/index";

// componentes que definen la estructura del menu, fetchs,columnas visibles en la tabla y los inputs que componen el formulario

// Para agregar otro componente para definir una nueva estructura: 
//  1- Crea el componente que define la estructura 
//  2- Sigue los pasos en el componente ./components/Datatable/Columns.js

export const visibleColumns = [
  { accessor: "_id", show: false },
  { accessor: "businessName", show: true },
  { accessor: "createdAt", show: true },
  { accessor: "imgMiniatura", show: false },
  { accessor: "slug", show: false },
  { accessor: "status", show: false },
  { accessor: "title", show: true },
  { accessor: "updatedAt", show: false },
  { accessor: "userUid", show: false },
]

export const BodyStaticAPP = [
  {
    title: "",
    roles: ["all"],
    children: [
      {
        icon: <CorazonIcon className="" />,
        title: "Inicio",
        roles: ["all"],
        route: "/",
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
        route: "business",
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
            typeFile: "image",
            typeFile: "svg",
            required: true,
          },
          {
            Header: "Sub Categorias",
            accessor: "subCategories",
            type: "relationship",
            tabList: FetchGraphQL.subCatBusiness.getSubCategoryBusiness,
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
            typeFile: "image",
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
            tabList: FetchGraphQL.characteristics.getAllCharacteristics,
            required: true,
          },
          {
            Header: "Preguntas Frecuentes",
            accessor: "questions",
            type: "relationship",
            tabList: FetchGraphQL.questions.getAllQuestions,
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
        route: "page404",
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
        route: "",
        getData: "",
        getByID: "",
        createEntry: "",
        updateEntry: "",
        deleteEntry: "",
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

    ],
  },
  {
    title: "Módulos",
    roles: ["empresa"],
    children: [
      {
        icon: <LugaresBodas/>,
        title: "Lugares para bodas",
        roles: ["admin", "empresa"],
        route: "",
        getData: "",
        getByID: "",
        createEntry: "",
        updateEntry: "",
        deleteEntry: "",
        schema: [],
      },
      {
        icon: <Catering />,
        title: "Catering de bodas",
        roles: ["empresa"],
        route: "",
        getData: "",
        getByID: "",
        createEntry: "",
        deleteEntry: "",
        updateEntry: "",
        schema: [],
      },
      {
        icon: <WeddingPlanner className="h-6 w-6" />,
        title: "Wedding Planner",
        roles: ["empresa"],
        route: "",
        getData: "",
        getByID: "",
        createEntry: "",
        deleteEntry: "",
        updateEntry: "",
        schema: [],
      },
      {
        icon: <FotografoMenu className="h-6 w-6" />,
        title: "Fotografos",
        roles: ["empresa"],
        route: "",
        getData: "",
        getByID: "",
        createEntry: "",
        deleteEntry: "",
        updateEntry: "",
        schema: [],
      },
    ],
  },
  {
    title: "Chat en línea",
    roles: ["empresa"],
    children: [
      {
        icon: <ChatIcon/>,
        title: "Chat",
        roles: ["admin", "empresa"],
        route: "",
        getData: "",
        getByID: "",
        createEntry: "",
        updateEntry: "",
        deleteEntry: "",
        schema: [],
      },
      {
        icon: <Contactos />,
        title: "Contactos",
        roles: ["empresa"],
        route: "categoryBusiness",
        getData: "",
        getByID: "",
        createEntry: "",
        deleteEntry: "",
        updateEntry: "",
        schema: [],
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
 
  {
    title: "Blog",
    roles: ["all"],
    children: [
      {
        icon: <PostIcon />,
        title: "Publicaciones",
        roles: ["all"],
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
            tabList: FetchGraphQL.subCategoryPost.getAllSubCategoryPost,
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
            tabList: FetchGraphQL.subCategoryPost.getAllSubCategoryPost,
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
    title: "Marketplace",
    roles: ["empresa"],
    children: [
      {
        icon: <MarcasEmIcon className="" />,
        title: "tienda",
        roles: ["all"],
        route: "",
        getData: "",
        getByID: "",
        createEntry: "",
        updateEntry: "",
        deleteEntry: "",
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
