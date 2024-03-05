import grapesjs from "grapesjs/dist/grapes.min.js";
import "grapesjs/dist/css/grapes.min.css";
import { useEffect, useState } from "react";
import websitePlugin from "grapesjs-preset-webpage";
import basicBlockPlugin from "grapesjs-blocks-basic";
import flexbox from "grapesjs-blocks-flexbox"
import navbar from "grapesjs-navbar"
import customCode from "grapesjs-custom-code"
import formPlugin from "grapesjs-plugin-forms";
import { fetchApi, queries} from "../../../utils/Fetching";
import { AuthContextProvider } from "../../../context/AuthContext";
import { Tooltip, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { transformBase64 } from "../../../utils/trasformBase64";
import * as localEs from "grapesjs/locale/es.js";
import { ArrowLeft } from "../../Icons/index";

export const WebBuilder = ({ setCommponent, id }) => {
  const { user, dispatch } = AuthContextProvider();
  const toast = useToast();
  const [dataPage, setDataPage] = useState();
  const [pm, setPm] = useState({});
  const [pages, setPages] = useState([]);
  const [isMounted, setIsMounted ] = useState(false);
  const [pageHtml, setPageHtml] = useState({
    html: undefined,
    css: undefined,
    js: undefined,
  });
  const [handle, setHandle] = useState({ payload: {}, date: new Date() });
  const [showWebBuilder, setShowWebBuilder] = useState(false);
  const router = useRouter();

  /* useEffect para montar y desmontar el componente  */
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
    return () => {
      setIsMounted(false);
    };
  }, []);

  /* opciones de almacenado de la interfaz */
  const storageManager = {
    id: "gjs-",
    type: "local",
    autosave: true,
    autoload: true,
    storeComponents: true,
    storeStyles: true,
    storeHtml: true,
    storeCss: true,
  };

  /* botones responsives de la interfaz */
  const deviceManager = {
    devices: [
      {
        id: "desktop",
        name: "Desktop",
        width: "",
      },
      {
        id: "tablet",
        name: "Tablet",
        width: "768px",
        widthMedia: "992px",
      },
      {
        id: "mobilePortrait",
        name: "Mobile portrait",
        width: "320px",
        widthMedia: "575px",
      },
    ],
  };

  /* useEffect donde se ejecuta la query para pedir la plantilla por id */
  useEffect(() => {
    if (isMounted) {
      try {
        fetchApi({
          query: queries.getCodePage,
          variables: {
            args: { _id: id },
          },
          development: "bodasdehoy",
        }).then((result) => {
          setDataPage(result.results[0]);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [isMounted]);

  /* handle para crear la plantilla */
  useEffect(() => {
    try {
      if (handle?.payload?.code) {
        transformBase64(handle.payload).then((payload) => {
          const strCode = JSON.stringify(payload?.code);
          if (payload?.type) {
            fetchApi({
              query: queries.createCodePage,
              variables: {
                args: [
                  {
                    author: user?.uid,
                    title: payload.title,
                    htmlPage: {
                      html: payload.page?.html,
                      css: payload.page?.css,
                      js: payload.page?.js,
                    },
                    code: strCode,
                    type: payload?.type,
                  },
                ],
              },
              development: "bodasdehoy",
            }).then((result) => {
              setDataPage(result.results[0]);
            });
            toast({
              status: "success",
              title: "Plantilla Creada Correctamente",
              isClosable: true,
            });
          }

          if (dataPage?.type === "template" && !payload?.type) {
            if (payload?.title !== null) {
              fetchApi({
                query: queries.createCodePage,
                variables: {
                  args: [
                    {
                      author: user?.uid,
                      title: payload.title,
                      htmlPage: {
                        html: payload.page?.html,
                        css: payload.page?.css,
                        js: payload.page?.js,
                      },
                      code: strCode,
                      type: "page",
                    },
                  ],
                },
                development: "bodasdehoy",
              }).then((result) => {
                setDataPage(result.results[0]);
              });
              toast({
                status: "success",
                title: "Guardada correctamente",
                isClosable: true,
              });
            }
          }
          if (dataPage?.type === "page" && !payload?.type) {
            fetchApi({
              query: queries.updateCodePage,
              variables: {
                args: {
                  _id: dataPage?._id,
                  htmlPage: {
                    html: payload.page?.html,
                    css: payload.page?.css,
                    js: payload.page?.js,
                  },
                  code: strCode,
                },
              },
              development: "bodasdehoy",
            }).then((result) => {
              setDataPage(result);
            });
            toast({
              status: "success",
              title: "Guardada correctamente",
              isClosable: true,
            });
          }
        });
      }
    } catch (error) {
      toast({
        status: "error",
        title: "a ocurrido un error",
        isClosable: true,
      });
      console.log(error);
    }
  }, [handle, isMounted]);

  /* useEffect que ejecuta la interfaz del grapes */
  let editor = {};
  useEffect(() => {
    const editor = grapesjs.init({
      autorender: false,
      container: "#gjs",
      plugins: [websitePlugin, basicBlockPlugin, formPlugin, flexbox, navbar, customCode],
      deviceManager,
      storageManager,
      pageManager: {
        pages: [
          {
            id: "page-1",
            name: "home",
            component: "",
            styles: "#comp1 { color: red }",
          },
          {
            id: "page-2",
            name: "about",
            component: "",
            styles: "#comp1 { color: red }",
          },
          {
            id: "page-3",
            name: "contact",
            component: "",
            styles: "#comp1 { color: red }",
          },
        ],
      },
      pluginsOpts: {
        "grapesjs-preset-webpage": {
          blocksBasicOpts: {
            blocks: [
              "column1",
              "column2",
              "column3",
              "column3-7",
              "text",
              "link",
              "image",
              "video",
            ],
            flexGrid: 1,
          },
          blocks: ["link-block", "quote", "text-basic"],
        },
      },
    });

    setPm(editor.Pages);
    editor.on("load", (editor) => {
      dataPage && editor?.loadProjectData(JSON.parse(dataPage.code));
      setTimeout(() => {
        setShowWebBuilder(true);
      }, 1000);
    });

    editor.render();

    editor.on("update", () => {
      console.log("update");
      const code = editor.getProjectData();
      const html = editor.getHtml();
      const css = editor.getCss();
      const js = editor.getJs();
      const page = { html, css, js };
      setPageHtml(page);
    });

    editor.on("undo", () => {});

    editor.on("redo", () => {});

    editor.Panels.addButton("devices-c", {
      id: "save-button",
      className: "save-button",
      command: function (editor) {
        if (dataPage?.type === "template") {
          let title;
          while (true) {
            var valor = prompt(
              "Antes de guardar la plantilla, indica el titulo: "
            );
            if (valor === "") {
              alert("Por favor, ingrese un nick válido");
            } else {
              title = valor;
              break;
            }
            if (valor === null) {
              return;
            }
          }
          setHandle({
            payload: {
              title: title,
              code: editor.getProjectData(),
            },
            date: new Date(),
          });
        }
        if (dataPage?.type === "page") {
          setHandle({
            payload: {
              title: dataPage.title,
              code: editor.getProjectData(),
            },
            date: new Date(),
          });
        }
      },
      attributes: { title: "Guardar" },
    });

    if (user.role.includes("admin")) {
      editor.Panels.addButton("devices-c", {
        id: "create-button",
        className: "create-button",
        command: function (editor) {
          let title = "";
          title = prompt(
            "Antes de guardar la plantilla, indica el titulo:",
            "plantilla"
          );
          setHandle({
            payload: {
              type: "template",
              title: title,
              code: editor.getProjectData(),
            },
            date: new Date(),
          });
        },
        attributes: { title: "Crear nuevo" },
      });
    }

    /*  editor.Panels.addButton("devices-c", {
      id: "back-button",
      className: "ArrowBack",
      command: function (editor) {
        if (router.pathname == "/business") {
          dispatch({ type: "VIEW", payload: {} });
        }

        if (router.pathname == "/marketplace") {
          setCommponent("principal");
        }
      },
      attributes: { title: "Salir" },
    }); */
    editor.I18n.addMessages({
      en: {
        // indicate the locale to update
        ...localEs?.default,
      },
    });
  }, [dataPage]);

  /* constante donde se guardan las funciones del manejador de paginas */
  const app = {
    el: ".pages-wrp",
    data: { pages: [] },
    mounted() {
      this.setPages(pm.getAll());
      editor.on("page", () => {
        this.pages = [...pm.getAll()];
      });
    },
    methods: {
      getAll() {
        return pm.getAll();
      },
      setPages(pages) {
        this.pages = [...pages];
      },
      isSelected(item) {
        return pm.getSelected().id == item.id;
      },
      selectPage(pageId) {
        return pm.select(pageId);
      },
      removePage(pageId) {
        const f1 = pages.findIndex((elem) => elem.id === pageId);
        pages.splice(f1, 1);
        setPages(pages);
        return pm.remove(pageId);
      },
      addPage() {
        const len = pm.getAll().length;
        const resp = pm.add({
          name: `Page ${len + 1}`,
          component: `<div>New page ${len + 1}</div>`,
        });
        pages.push(resp);
        setPages(pages);
      },
    },
  };

  /* useEffect donde se guardan las paginas y las metodos para el manejador de paginas en el estado de pages */
  useEffect(() => {
    if (app && isMounted) {
      const pages = app.methods.getAll();
      setPages(pages);
    }
  }, [isMounted]);

  return (
    <>
      <div className={`${!showWebBuilder && "invisible"} app-wrap`}>
        <div className="pages-wrp">
          <div className="text-white text-[15px] my-2 flex items-center ">
            <div>
              <ArrowLeft
                className="w-4 h-4 mr-1 text-white cursor-pointer"
                onClick={() => {
                  if (router.pathname == "/business") {
                    dispatch({ type: "VIEW", payload: {} });
                  }

                  if (router.pathname == "/marketplace") {
                    setCommponent("principal");
                  }
                }}
              />
            </div>
            <Tooltip label={dataPage?.title.length>7? dataPage.title:""}>
              <div className="truncate w-[80px] cursor-default">{dataPage?.title}</div>
            </Tooltip>
          </div>
          <div className="add-page" onClick={() => app.methods.addPage()}>
            Nueva pagina
          </div>
          <div className="pages">
            <div className="">
              {pages.map((item, idx) => {
                return (
                  <div className=" page selected  " key={idx}>
                    <span
                      className="flex-1"
                      onClick={() => {
                        app?.methods?.selectPage(item?.id);
                      }}
                    >
                      {item.get("name")}
                    </span>
                    <span
                      className="page-close"
                      onClick={() => {
                        !app.methods.isSelected(item) &&
                          app.methods.removePage(item?.id);
                      }}
                    >
                      {!app.methods.isSelected(item) && "X"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="editor-wrap">
          <div id="gjs"></div>
        </div>
      </div>
    </>
  );
};
