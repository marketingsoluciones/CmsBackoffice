
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
  const [modal, setModal] = useState(false)
  const [a, setA] = useState([])
  console.log("dataPage", dataPage)
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

  const [page, setPage] = useState({
    html: undefined,
    css: undefined,
    js: undefined
  })
  console.log(page)
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

  
 
  let editor = null
  //editor.loadProjectData({ pages: [...], styles: [...], ... })
  useEffect(() => {
    editor = grapesjs.init(
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
            component: html,
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
    setA(editor.Pages)
  }, [])


  return (
    <>
      <div id="gjs"></div>
      {modal ? <Modal classe={"w-[28%] h-[86%]"}>

      </Modal> : null}
    </>
  )
}