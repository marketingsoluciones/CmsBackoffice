
import grapesjs from 'grapesjs/dist/grapes.min.js'
import 'grapesjs/dist/css/grapes.min.css'
import { useEffect, useState } from 'react'
import websitePlugin from 'grapesjs-preset-webpage'
import basicBlockPlugin from 'grapesjs-blocks-basic'
import formPlugin from 'grapesjs-plugin-forms'
import { fetchApi, queries } from '../../../utils/Fetching'
import { AuthContextProvider } from '../../../context/AuthContext'

export const WebBuilder = () => {
  const { user } = AuthContextProvider()

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

  const handleUpdateCodePage = async () => {
    try {
      await fetchApi({
        query: queries.createCodePage,
        variables: {
          args: [{
            title: "Pagina de jafet",
            html: page.html,
            css: page.css,
            js: page.js,
            uid: user.uid,
            type: "page",
          }]
        },
        development: "bodasdehoy"
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    try {
      const getDataPage = fetchApi({
        query: queries.getCodePage,
        variables: {
          args: { _id: "65c0fa09a95a941255283dff" }
        },
        development: "bodasdehoy"
      }).then((getDataPage) => {
        return getDataPage
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
      //editor.load()
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
        handleUpdateCodePage({ title: "primera pagina" })
      },
      attributes: { title: 'Guardar' }
    });
    editor.Panels.addButton('devices-c', {
      id: 'save-button',
      className: 'save-button',
      command: function (editor) {
        handleUpdateCodePage({ title: "primera pagina" })
      },
      attributes: { title: 'Guardar' }
    });
  }, [])


  return (
    <>
      <div id="gjs"></div> 
     
    </>
  )
}