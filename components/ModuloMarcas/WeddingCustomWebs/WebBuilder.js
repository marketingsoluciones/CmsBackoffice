import grapesjs from "grapesjs/dist/grapes.min.js";
import "grapesjs/dist/css/grapes.min.css";
import { useEffect, useState } from "react";
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
import * as localEs from "grapesjs/locale/es.js";
import { ArrowLeft } from "../../Icons/index";
import { uploadImage, resizeImage } from "../../../utils/UploadAdapter";
import { ListPages } from "./ListPages";
import { SharedUrl } from "../../ToolsComponents/SharedUrl";

export const WebBuilder = ({ setCommponent, id, type = "title", isUpdated = false }) => {
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


  const UrlPage = dataPage?.title + "-" + dataPage?._id?.slice(-6);

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

  const [metaData, setMetaData] = useState();
  useEffect(() => {
  }, [pages]);

  let editor = {};
  useEffect(() => {
    let componentAdd = {};
    const editor = grapesjs.init({
      keymaps: {
        // Object of keymaps
        defaults: {
          "your-namespace:keymap-name": {
            keys: "⌘+z, ctrl+z",
            handler: "some-command-id",
          },
        },
      },
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
        handleRemove: () => { },
        dropzone: 1,
        openAssetsOnDrop: 1,
        dropzoneContent: "",
        modalTitle: "Select Image",
      },
    });

    setPm(editor.Pages);

    editor.on("load", (editor) => {
      fetchApi({
        query: queries.getCodePage,
        variables: {
          args: { _id: id },
        },
        development: "bodasdehoy",
      }).then((result) => {
        const data = result.results[0];
        let pages = {}
        try {
          if (data?.code) {
            editor?.loadProjectData(JSON.parse(data.code));
            pages = JSON.parse(data.code).pages.map((elem) => {
              return { id: elem.id, name: elem.name };
            })
          } else {
            const code = {
              assets: JSON.parse(data.assets),
              pages: JSON.parse(data.pages),
              styles: JSON.parse(data.styles),
              symbols: JSON.parse(data.symbols),
            }
            editor?.loadProjectData(code);
            pages = JSON.parse(data.pages).map((elem) => {
              return { id: elem.id, name: elem.name };
            })
          }
        } catch (error) {
          console.log(error)
        }
        setPages(pages);
        const { type: typeResult, title, _id, state } = result.results[0];
        type = typeResult;
        setMetaData({ type: typeResult, title, _id, state });
        setShowWebBuilder(true);
      });
    });

    editor.render();

    editor.on("update", () => {
      isUpdated = true;
    });

    editor.on("asset", (e) => {
      // startAnimation();
      //console.log("-------------------->4", e)
    });
    editor.on("preview", (e) => {
      //console.log('Spots', editor.Canvas.getSpots());
      console.log("-------------------->4", e);
    });
    editor.on("component:add", (e) => {
      componentAdd = e;
      // console.log("-------------------->4", e);
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
      let pages = editor.Pages.getAll().map((elem) => {
        return { id: elem.id, name: elem.attributes.name };
      });
      setIsNewPage(resp.attributes.id);
      setPages([...pages]);
    });
    editor.on("page:remove", (resp) => {
      const pageId = resp.attributes.id;

      const isUnique = editor.Pages.getAll()[0].id === pageId;
      const isSelected = editor.Pages.getSelected().id === pageId;
      const isPrimary = editor.Pages.getAll()[0].id === pageId;
      if (!isUnique) {
        if (isSelected) {
          if (isPrimary) {
            editor.Pages.select(editor.Pages.getAll()[1].id);
            setIsPageSelect(editor.Pages.getAll()[1].id);
          } else {
            editor.Pages.select(editor.Pages.getAll()[0].id);
            setIsPageSelect(editor.Pages.getAll()[0].id);
          }
        }
        setPages(
          editor.Pages.getAll().map((elem) => {
            return { id: elem.id, name: elem.attributes.name };
          })
        );
      }
    });
    editor.on("undo", () => { });

    editor.on("redo", () => { });

    editor.Panels.addButton("devices-c", {
      id: "save-button",
      className: "save-button",
      command: function (editor) {
        const page = editor.Pages.getSelected()
        const component = page.getMainComponent();
        const htmlPage = {
          id: page.id,
          title: page.attributes.name,
          html: editor.getHtml({ component }),
          css: editor.getCss({ component }),
        }
        if (type === "template") {
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
          if (!!title) {
            const code = editor.getProjectData()
            fetchApi({
              query: queries.createCodePage,
              variables: {
                args: {
                  author: user?.uid,
                  title: title,
                  // code: JSON.stringify(editor.getProjectData()),
                  assets: JSON.stringify(code.assets),
                  pages: JSON.stringify(code.pages),
                  styles: JSON.stringify(code.styles),
                  symbols: JSON.stringify(code.symbols),
                  htmlPages: [htmlPage],
                  type: "page",
                },
              },
              development: "bodasdehoy",
            }).then((result) => {
              id = result?.results[0]?._id;
              type = result?.results[0]?.type;
              toast({
                status: "success",
                title: "La web ha sido creada",
                isClosable: true,
              });
            });
          }
        }
        if (type === "page") {
          const code = editor.getProjectData()
          fetchApi({
            query: queries.updateCodePage,
            variables: {
              args: {
                _id: id,
                //code: JSON.stringify(editor.getProjectData()),
                assets: JSON.stringify(code.assets),
                pages: JSON.stringify(code.pages),
                styles: JSON.stringify(code.styles),
                symbols: JSON.stringify(code.symbols),
                htmlPage
              },
            },
            development: "bodasdehoy",
          }).then((result) => {
            if (result?._id) {
              id = result._id;
              toast({
                status: "success",
                title: "La páginas han sido guardadas",
                isClosable: true,
              })
              isUpdated = false
            } else {
              toast({
                status: "error",
                title: "Ha ocurrido un error, la página no se ha guardado",
                isClosable: true,
              })
            }
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
        if (!isUpdated) {
          fetchApi({
            query: queries.updateCodePage,
            variables: {
              args: {
                _id: id,
                state: "publicated",
              },
            },
            development: "bodasdehoy",
          }).then((result) => {
            if (result?._id) {
              id = result._id;
              toast({
                status: "success",
                title: "Se ha publicado con éxito",
                isClosable: true,
              })
            } else {
              toast({
                status: "error",
                title: "Ha ocurrido un error al publicar",
                isClosable: true,
              })
            }
          });
        } else {
          toast({
            status: "warning",
            title: "Guarda primero para poder publicar",
            isClosable: true,
          })
        }
      },
      attributes: { title: "Publicar" },
    });

    editor.Panels.addButton("devices-c", {
      id: "vistaPrevia",
      className: "searchScreen",
      command: function (editor) {
      },
      attributes: { title: "Vista previa" },
    });

    editor.I18n.addMessages({
      en: {
        // indicate the locale to update
        ...localEs?.default,
      },
    });
  }, []);

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
        page.setName(name);
        return { id: pageId, name };
      },
      removePage: (pageId) => {
        if (pages.length > 1) {
          const isUnique = pages[0] === pageId;
          if (!isUnique) {
            pm.remove(pageId);
          }
        }
      },
      addPage: () => {
        if (pages.length < 10) {
          const resp = pm.add({ name: `sin nombre` });
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
                  console.log(10058, router.asPath)
                  if (router.asPath == "/business/mywebsites") {
                    dispatch({ type: "VIEW", payload: {} });
                  }
                  if (router.asPath == "/marketplace") {
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
              {pages?.length &&
                pages?.map((item, idx) => (
                  <ListPages
                    key={item.id}
                    item={item}
                    app={app}
                    pages={pages}
                    setPages={setPages}
                    isPageSelect={isPageSelect}
                    setIsPageSelect={setIsPageSelect}
                    isNewPAge={isNewPage}
                    setIsNewPAge={setIsNewPage}
                  />
                ))}
            </div>
          </div>
          <div className="flex-1" />
          <div className="h-40">
            {(UrlPage != undefined && pages?.length) &&
              <SharedUrl
                link={`https://${window.origin.includes("://test.") ? "test." : ""}bodasdehoy.com/landingpage/${UrlPage}/${pages[0].name}`}
              />
            }
          </div>
        </div>
        <div className="editor-wrap">
          <div id="gjs"></div>
        </div>
      </div>
    </>
  );
};
