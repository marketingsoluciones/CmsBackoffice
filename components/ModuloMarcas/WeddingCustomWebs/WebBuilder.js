
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
            name: "",
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
      setPages(pages) {
        this.pages = [...pages];
      },
      isSelected(page) {
        return pm.getSelected().id == page.id;
      },
      selectPage(pageId) {
        return pm.select(pageId);
      },
      removePage(pageId) {
        return pm.remove(pageId);
      },
      addPage() {
        const len = pm.getAll().length;
        pm.add({
          name: `Pagessss ${len + 1}`,
          component: '<div>New page</div>',
        });
      },
    }
  };

  useEffect(() => {

    console.log(11111, app)

  }, [app])

  useEffect(() => {

    console.log(22222, pm)

  }, [pm])




  return (
    <>
      <div className="app-wrap" >
        <div className="pages-wrp" >
          <div className="add-page" onClick={() => app.methods.addPage()} >Add new page</div>
          <div className='pages'>
            <div v-for="page in pages" /* :key="page.id" */ /* :class="{page: 1, selected: isSelected(page) }" */ /* @click="selectPage(page.id)" */>

              {app?.data?.pages?.map((item, idx) => {
                console.log(idx, item)
                return (
                  <div key={idx}>
                    {/*  {item} */}
                  </div>
                )
              })}

              {/*  {{ page.get('name') || page.id }} */}

              <span v-if="!isSelected(page)" /* @click="removePage(page.id)" */ /* class="page-close" */></span>
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