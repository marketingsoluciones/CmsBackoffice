
import grapesjs from 'grapesjs/dist/grapes.min.js'
import 'grapesjs/dist/css/grapes.min.css'
import { useEffect, useState } from 'react'
import websitePlugin from 'grapesjs-preset-webpage'
import basicBlockPlugin from 'grapesjs-blocks-basic'
import formPlugin from 'grapesjs-plugin-forms'
import { fetchApi, queries } from '../../../utils/Fetching'
import { AuthContextProvider } from '../../../context/AuthContext'
import { useToast } from "@chakra-ui/react";
import { useRouter } from 'next/router'


export const WebBuilder = ({ setCommponent, id }) => {
  const { user, state ,dispatch  } = AuthContextProvider();
  const toast = useToast();
  const [dataPage, setDataPage] = useState()
  const [pm, setPm] = useState({})
  const [pages, setPages] = useState([])
  const [isMounted, setIsMounted] = useState(false)
  const [pageSelected, setPageSelected] = useState()
  const [page, setPage] = useState({ html: undefined, css: undefined, js: undefined })
  const [handle, setHandle] = useState({ payload: {}, date: new Date() })
  const [showWebBuilder, setShowWebBuilder] = useState(false)
  const router = useRouter()

  console.log(router)

 


  /* useEffect para montar y desmontar el componente  */
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true)
    }
    return () => {
      setIsMounted(false)
    }
  }, [])

  /* opciones de almacenado de la interfaz */
  const storageManager = {
    id: 'gjs-',
    type: 'local',
    autosave: true,
    autoload: true,
    storeComponents: true,
    storeStyles: true,
    storeHtml: true,
    storeCss: true,
  }

  /* botones responsives de la interfaz */
  const deviceManager = {
    devices:
      [
        {
          id: 'desktop',
          name: 'Desktop',
          width: '',
        },
        {
          id: 'tablet',
          name: 'Tablet',
          width: '768px',
          widthMedia: '992px',
        },
        {
          id: 'mobilePortrait',
          name: 'Mobile portrait',
          width: '320px',
          widthMedia: '575px',
        },
      ]
  }

  /* useEffect donde se ejecuta la query para pedir la plantilla por id */
  useEffect(() => {
    if (isMounted) {
      try {
        fetchApi({
          query: queries.getCodePage,
          variables: {
            args: { _id: id }
          },
          development: "bodasdehoy"
        }).then((result) => {
          setDataPage(result.results[0])
        })
      } catch (error) {
        console.log(error)
      }

    }
  }, [isMounted])

  /* handle para crear la plantilla */
  useEffect(() => {
    try {
      if (dataPage?.type === "template") {
        fetchApi({
          query: queries.createCodePage,
          variables: {
            args: [{
              author: user?.uid,
              title: handle.payload.title,
              htmlPage: {
                html: handle.payload.page?.html,
                css: handle.payload.page?.css,
                js: handle.payload.page?.js
              },
              code: JSON.stringify(handle.payload.code),
              type: "page",
            }]
          },
          development: "bodasdehoy"
        }).then((result) => {
          setDataPage(result.results[0])
        })
        toast({
          status: "success",
          title: "Guardada correctamente",
          isClosable: true,
        });
      }
      if (dataPage?.type === "page") {
        fetchApi({
          query: queries.updateCodePage,
          variables: {
            args: {
              _id: dataPage?._id,
              htmlPage: {
                html: handle.payload.page?.html,
                css: handle.payload.page?.css,
                js: handle.payload.page?.js
              },
              code: JSON.stringify(handle.payload.code),
            }
          },
          development: "bodasdehoy"
        }).then((result) => {
          setDataPage(result)
        })
        toast({
          status: "success",
          title: "Guardada correctamente",
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        status: "error",
        title: "a ocurrido un error",
        isClosable: true,
      });
      console.log(error)
    }
  }, [handle])

  /* useEffect que ejecuta la interfaz del grapes */
  let editor = {}
  useEffect(() => {
    const editor = grapesjs.init(
      {
        autorender: false,
        container: '#gjs',
        width: '100%',
        plugins: [websitePlugin, basicBlockPlugin, formPlugin],
        deviceManager,
        storageManager,
        lang: 'es',
        I18n: {
          locale: 'es', // default locale
          localeFallback: 'es', // default fallback
        },
        pageManager: {
          pages: [{
            id: 'page-1',
            name: "home",
            component: "",
            styles: '#comp1 { color: red }',
          },
          {
            id: 'page-2',
            name: "about",
            component: "",
            styles: '#comp1 { color: red }',
          },
          {
            id: 'page-3',
            name: "contact",
            component: "",
            styles: '#comp1 { color: red }',
          },
          ]
        },
        pluginsOpts: {
          'grapesjs-preset-webpage': {
            blocksBasicOpts: {
              blocks: ['column1', 'column2', 'column3', 'column3-7', 'text', 'link', 'image', 'video'],
              flexGrid: 1,
            },
            blocks: ['link-block', 'quote', 'text-basic'],
          },
        },
      }
    )

    setPm(editor.Pages)

    // if (isMounted) {
    editor.on('load', (editor) => {
      dataPage && editor?.loadProjectData(JSON.parse(dataPage.code));
      setTimeout(() => {
        setShowWebBuilder(true)
      }, 1000);
    });

    editor.render();

    editor.on('update', () => {
      const html = editor.getHtml()
      const css = editor.getCss()
      const js = editor.getJs()
      const page = { html, css, js }
      setPage(page)
    });

    editor.on('undo', () => {
    });

    editor.on('redo', () => {
    });

    editor.Panels.addButton('devices-c', {
      id: 'save-button',
      className: 'save-button',
      command: function (editor) {
        let title = ""
        title = prompt("Antes de guardar la plantilla, indica el titulo: ")
        setHandle({
          payload: {
            title: title,
            page: {
              html: editor.getHtml(),
              css: editor.getCss(),
              js: editor.getJs(),
            },
            code: editor.getProjectData()
          },
          date: new Date()
        })
      },
      attributes: { title: 'Guardar' }
    });

    editor.Panels.addButton('devices-c', {
      id: 'back-button',
      className: 'ArrowBack',
      command: function (editor) {
        if(router.pathname=="/business"){
          dispatch({ type: "VIEW", payload: {} });
        }

        if(router.pathname=="/marketplace"){
          setCommponent("principal")
        }
        
      },
      attributes: { title: 'Salir' }
    });

  }, [dataPage])

  /* constante donde se guardan las funciones del manejador de paginas */
  const app = {
    el: '.pages-wrp',
    data: { pages: [] },
    mounted() {
      this.setPages(pm.getAll());
      editor.on('page', () => {
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
        const f1 = pages.findIndex(elem => elem.id === pageId)
        pages.splice(f1, 1)
        setPages(pages)
        return pm.remove(pageId);
      },
      addPage() {
        const len = pm.getAll().length;
        const resp = pm.add({
          name: `Page ${len + 1}`,
          component: `<div>New page ${len + 1}</div>`,
        });
        pages.push(resp)
        setPages(pages)
      },
    }
  };

  /* useEffect donde se guardan las paginas y las metodos para el manejador de paginas en el estado de pages */
  useEffect(() => {
    if (app && isMounted) {
      const pages = app.methods.getAll()
      setPages(pages)
    }
  }, [isMounted])

  return (
    <>
      <div className={`${!showWebBuilder && "invisible"} app-wrap`} >
        <div className="pages-wrp" >
          <div className="add-page" onClick={() => app.methods.addPage()} >Add new page</div>
          <div className='pages'>
            <div className='text-xs h-[200px] bg-white rounded-md overflow-y-auto'>

              {pages.map((item, idx) => {
                return (
                  <div className='bg-gray-200 p-1 cursor-pointer flex hover:bg-gray-300  ' key={idx} >
                    <span className='flex-1' onClick={() => { app?.methods?.selectPage(item?.id), setPageSelected(item?.id) }}>
                      {item.get("name")}
                    </span>
                    <span
                      className='w-4 flex justify-center hover:scale-110 hover:font-semibold'
                      onClick={() => { !app.methods.isSelected(item) && app.methods.removePage(item?.id) }}>
                      {!app.methods.isSelected(item) && "X"}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div >
        <div className="editor-wrap">
          <div id="gjs" ></div>
        </div>
      </div >
    </>
  )
}