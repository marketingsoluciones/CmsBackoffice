
import grapesjs from 'grapesjs/dist/grapes.min.js'
import 'grapesjs/dist/css/grapes.min.css'
import { useEffect, useState } from 'react'
import websitePlugin from 'grapesjs-preset-webpage'
import basicBlockPlugin from 'grapesjs-blocks-basic'
import formPlugin from 'grapesjs-plugin-forms'
import { fetchApi, queries } from '../../../utils/Fetching'
import { AuthContextProvider } from '../../../context/AuthContext'
//import { useToast } from '../../../hooks/useToast'
import { Box, Flex, Text, useToast, Center } from "@chakra-ui/react";
import { Modal } from '../../modals/Modal'


export const WebBuilder = ({ setCommponent }) => {
  const { user } = AuthContextProvider();
  const toast = useToast();
  const [dataPage, setDataPage] = useState()
  const [pm, setPm] = useState({})
  const [pages, setPages] = useState([])

  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true)
    }
    return () => {
      console.log("demontado")
      setIsMounted(false)
    }
  }, [])


  const [page, setPage] = useState({
    html: undefined,
    css: undefined,
    js: undefined
  })

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

  const handleUpdateCodePage = async ({ title }) => {
    try {
      if (page.html != undefined) {
        await fetchApi({
          query: queries.createCodePage,
          variables: {
            args: [{
              title: title,
              html: page.html,
              css: page.css,
              js: page.js,
              uid: user.uid,
              type: "page",
            }]
          },
          development: "bodasdehoy"
        })
        toast({
          status: "success",
          title: "Guardada correctamente",
          isClosable: true,
        });
      } else {
        toast({
          status: "error",
          title: "No hay cambios para guardar",
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
  }

  useEffect(() => {
    try {
      fetchApi({
        query: queries.getCodePage,
        variables: {
          args: { _id: "65c0fa09a95a941255283dff" }
        },
        development: "bodasdehoy"
      }).then((getDataPage) => {
        setDataPage(getDataPage.results)
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    const editor = grapesjs.init(
      {
        container: '#gjs',
        height: '560px',
        width: '100%',
        plugins: [websitePlugin, basicBlockPlugin, formPlugin],
        deviceManager,
        storageManager,
        pageManager: {
          pages: [{
            id: 'page-1',
            name: "sin-nombre",
            component: "",
            styles: '#comp1 { color: red }',
          }]
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
    editor.on('load', () => {
      console.log("LOAD")
    })
    editor.on('update', () => {
      console.log("UPDATE")
      const html = editor.getHtml()
      const css = editor.getCss()
      const js = editor.getJs()
      setPage({ html, css, js })
    })
    editor.on('undo', () => {
      console.log("UNDO")
    })
    editor.on('redo', () => {
      console.log("REDO")
    })
    editor.Panels.addButton('devices-c', {
      id: 'save-button',
      className: 'save-button',
      command: function (editor) {
        let title = ""
        title = prompt("Antes de guardar la plantilla, indica el titulo: ")
        handleUpdateCodePage({ title: title })
      },
      attributes: { title: 'Guardar' }
    });
    editor.Panels.addButton('devices-c', {
      id: 'back-button',
      className: 'ArrowBack',
      command: function (editor) {
        setCommponent("principal")
      },
      attributes: { title: 'Salir' }
    });
    setPm(editor.Pages)
  }, [])

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
      isSelected(page) {
        return pm.getSelected().id == page.id;
      },
      selectPage(pageId) {
        console.log(10004, pageId)
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
        console.log("----------->", len)
        const resp = pm.add({
          name: `Pagessss ${len + 1}`,
          component: `<div>New page ${len + 1}</div>`,
        });
        console.log("----------->", resp)
        pages.push(resp)
        setPages(pages)
      },
    }
  };

  useEffect(() => {
    if (app && isMounted) {
      console.log(11110, app)
      const pages = app.methods.getAll()
      console.log(11111, pages)
      setPages(pages)
    }
  }, [isMounted])

  useEffect(() => {
    console.log(222220001, pm)
  }, [pm])




  return (
    <>
      <div className="app-wrap" >
        <div className="pages-wrp" >
          <div className="add-page" onClick={() => app.methods.addPage()} >Add new page</div>
          <div className='pages'>
            <div className='text-xs h-[200px] bg-white rounded-md overflow-y-auto'>

              {pages.map((item, idx) => {
                console.log(idx, item.get("name"))
                return (
                  <div className='bg-gray-200 p-1 cursor-pointer flex ' key={idx} >
                    <span className='flex-1' onClick={() => { app?.methods?.selectPage(item?.id) }}>
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

              {/*  {{ page.get('name') || page.id }} */}

            </div>
          </div>
        </div >
        <div className="editor-wrap">
          <div id="gjs"></div>
        </div>
      </div >
    </>
  )
}