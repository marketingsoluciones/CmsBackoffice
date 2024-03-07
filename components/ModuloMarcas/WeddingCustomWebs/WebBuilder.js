import grapesjs from "grapesjs/dist/grapes.min.js";
import "grapesjs/dist/css/grapes.min.css";
import { useCallback, useEffect, useState } from "react";
import websitePlugin from "grapesjs-preset-webpage";
import basicBlockPlugin from "grapesjs-blocks-basic";
import flexbox from "grapesjs-blocks-flexbox";
import navbar from "grapesjs-navbar";
import customCode from "grapesjs-custom-code";
import formPlugin from "grapesjs-plugin-forms";
import { fetchApi, queries } from "../../../utils/Fetching";
import { AuthContextProvider } from "../../../context/AuthContext";
import { Tooltip, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { transformBase64 } from "../../../utils/trasformBase64";
import * as localEs from "grapesjs/locale/es.js";
import { ArrowLeft } from "../../Icons/index";
import { confgiAsset } from "../../../utils/configGrapes.js";
import { uploadImage, resizeImage } from "../../../utils/UploadAdapter";
import { ListPages } from "./ListPages";

export const WebBuilder = ({ setCommponent, id }) => {
  const { user, dispatch } = AuthContextProvider();
  const toast = useToast();
  const [dataPage, setDataPage] = useState();
  const [pm, setPm] = useState({});
  const [pages, setPages] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [handle, setHandle] = useState({ payload: {}, date: new Date() });
  const [showWebBuilder, setShowWebBuilder] = useState(false);
  const [isPageSelect, setIsPageSelect] = useState("");
  const [isNewPage, setIsNewPage] = useState("");
  const router = useRouter();
  const [isUpdated, setIsUpdated] = useState(false);

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
        const payload = handle?.payload;
        const strCode = JSON.stringify(payload?.code);
        if (payload?.type) {
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
              setIsUpdated(false)
            });
            toast({
              status: "success",
              title: "Guardada correctamente",
              isClosable: true,
            });
          }
        }
        if (dataPage?.type === "page" && !payload?.type) {
          const state = payload?.state
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
                state
              },
            },
            development: "bodasdehoy",
          }).then((result) => {
            setIsUpdated(false)
            setDataPage(result);
          });
          toast({
            status: "success",
            title: !state ? "Guardada correctamente" : "Su sitio web ha sido publicado",
            isClosable: true,
          });
        }
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
    const pages = dataPage?.code && JSON.parse(dataPage.code).pages.map(elem => { return { id: elem.id, name: elem.name } })
    setPages(pages);
    let componentAdd = {};
    const editor = grapesjs.init({
      autorender: false,
      container: "#gjs",
      plugins: [
        websitePlugin,
        basicBlockPlugin,
        formPlugin,
        flexbox,
        navbar,
        customCode,
      ],
      deviceManager,
      storageManager,
      pageManager: {
        pages: [],
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
          textCleanCanvas: "algo",
          blocks: ["link-block", "quote", "text-basic"],
        },
      },

      assetManager: {
        // // Upload endpoint, set `false` to disable upload, default `false`
        // upload: 'http://96.126.110.203:3000/upload',

        // // The name used in POST to pass uploaded files, default: `'files'`
        // uploadName: 'files',
        custom: false,
        // assets: [
        //   { type: '*', someOtherCustomProp: 1 },
        // ],
        noAssets: "",
        upload: 0,
        uploadName: "files",
        headers: {},
        params: {},
        credentials: "include",
        multiUpload: true,
        autoAdd: 0,
        uploadText: "Drop files here or click to upload1",
        addBtnText: "Add image1",
        uploadFile: async (e) => {
          //alert("otro tipo de imagen")
          let data = [];
          if (e.dataTransfer) {
            data = e.dataTransfer.files;
          } else {
            data = e.target.files;
          }
          const iterarObjeto = async (objeto) => {
            for (let i = 0; i < objeto.length; i++) {
              const file = await resizeImage(objeto[i]);
              const url = await uploadImage(file);
              editor.AssetManager.add(url);
            }
          };
          iterarObjeto(data);
        },
        handleAdd: (textFromInput) => {
          editor.AssetManager.add(textFromInput);
        },
        handleRemove: () => {
        },
        dropzone: 1,
        openAssetsOnDrop: 1,
        dropzoneContent: "",
        modalTitle: "Select Image",
      },
    });

    setPm(editor.Pages);

    editor.on("load", (editor) => {
      dataPage ? editor?.loadProjectData(JSON.parse(dataPage.code)) : []
      setTimeout(() => {
        setShowWebBuilder(true);
      }, 1000);
    });

    editor.render();

    editor.on("update", () => {
      console.log("update1");
      setIsUpdated(true)
    });

    editor.on("asset", (e) => {
      // startAnimation();
      //console.log("-------------------->4", e)
    });
    editor.on("preview", (e) => {
      console.log('Spots', editor.Canvas.getSpots());
      console.log("-------------------->4", e)
    });
    editor.on("component:add", (e) => {
      componentAdd = e;
      console.log("-------------------->4", e);
    });

    // The upload is ended (completed or not)
    editor.on("asset:upload:end", () => {
      // endAnimation();
      console.log("-------------------->5");
    });

    // Error handling
    editor.on("asset:upload:error", (err) => {
      // notifyError(err);
      console.log("-------------------->6", err);
    });

    // Do something on response
    editor.on("asset:upload:response", (response) => {
      console.log("-------------------->7", response);
    });

    editor.on("asset:custom", (props) => {
      console.log("-------------------->8", props);
      // The `props` will contain all the information you need in order to update your UI.
      // props.open (boolean) - Indicates if the Asset Manager is open
      // props.assets (Array<Asset>) - Array of all assets
      // props.types (Array<String>) - Array of asset types requested, eg. ['image'],
      // props.close (Function) - A callback to close the Asset Manager
      // props.remove (Function<Asset>) - A callback to remove an asset
      // props.select (Function<Asset, boolean>) - A callback to select an asset
      // props.container (HTMLElement) - The element where you should append your UI

      // Here you would put the logic to render/update your UI.
    });
    editor.on("page:add", (resp) => {
      pages.push({ id: resp.attributes.id, name: resp.attributes.name });
      setIsNewPage(resp.attributes.id)
      setPages([...pages]);
    });
    editor.on("page:remove", (resp) => {
      const pageId = resp.attributes.id
      const isUnique = pages[0] === pageId
      const isSelected = pm.getSelected().id === pageId
      const isPrimary = pages[0].id === pageId
      if (!isUnique) {
        if (isSelected) {
          if (isPrimary) {
            pm.select(pages[1].id)
            setIsPageSelect(pages[1].id)
          } else {
            pm.select(pages[0].id)
            setIsPageSelect(pages[0].id)
          }
        }
        const f1 = pages.findIndex((elem) => elem.id === pageId);
        pages.splice(f1, 1);
        setPages([...pages]);
      }
    });
    editor.on("undo", () => { });

    editor.on("redo", () => { });

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
              alert("Por favor, ingrese un titulo válido");
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
          if (dataPage?.type === "template") {
            let title;
            while (true) {
              var valor = prompt(
                "Antes de guardar la plantilla, indica el titulo:"
              );
              if (valor === "") {
                alert("Por favor, ingrese un titulo válido");
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
                type: "template",
                title: title,
                code: editor.getProjectData(),
              },
              date: new Date(),
            });
          }
        },
        attributes: { title: "Crear nuevo" },
      });
    }

    editor.Panels.addButton("devices-c", {
      id: "publicate-button",
      className: !isUpdated ? "publicate-button" : "publicated-button",
      command: function (editor) {
        if (dataPage?.type === "page") {
          const html = editor.getHtml();
          const css = editor.getCss();
          const js = editor.getJs();
          const page = { html, css, js };
          setHandle({
            payload: {
              title: dataPage.title,
              code: editor.getProjectData(),
              page,
              state: "publicated"
            },
            date: new Date(),
          });
        }
      },
      attributes: { title: "Publicar" },
    });


    editor.Panels.addButton("devices-c", {
      id: "vistaPrevia",
      className: "searchScreen",
      command: function (editor) {
        console.log("aqui")
      },
      attributes: { title: "Vista previa" },
    });

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
    // mounted() {
    //   this.setPages(pm.getAll());
    //   editor.on("page", () => {
    //     this.pages = [...pm.getAll()];
    //   });
    // },
    methods: {
      getAll: () => {
        return pm.getAll();
      },
      setPages: (pages) => {
        this.pages = [...pages];
      },
      isSelected: (item) => {
        return pm.getSelected().id == item.id;
      },
      selectPage: (pageId) => {
        return pm.select(pageId);
      },
      getPage: (pageId) => {
        return pm.get(pageId);
      },
      renamePage: (pageId, name) => {
        let page = pm.get(pageId);
        page.setName(name)
        return { id: pageId, name }
      },
      removePage: (pageId) => {
        if (pages.length > 1) {
          const isUnique = pages[0] === pageId
          if (!isUnique) {
            pm.remove(pageId)
          }
        }
      },
      addPage: () => {
        if (pages.length < 8) {
          const resp = pm.add({ name: `sin nombre` })
        }
      },
    },
  };

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
            <Tooltip label={dataPage?.title.length > 7 ? dataPage.title : ""}>
              <div className="truncate w-[80px] cursor-default">
                {dataPage?.title}
              </div>
            </Tooltip>
          </div>
          <div className="add-page" onClick={() => app.methods.addPage()}>
            Agregar pagina
          </div>
          <div className="pages">
            <div className="">
              {pages?.length && pages?.map((item, idx) => (
                < ListPages key={item.id} item={item} app={app} pages={pages} setPages={setPages} isPageSelect={isPageSelect} setIsPageSelect={setIsPageSelect} isNewPAge={isNewPage} setIsNewPAge={setIsNewPage} />
              ))
              }
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
