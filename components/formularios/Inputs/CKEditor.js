import dynamic from "next/dynamic";
const CKEditor = dynamic(
  () => import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor),
  { ssr: false }
);
import Editor from '@ckeditor/ckeditor5-build-classic'
import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { useField } from "formik";
import { UploadAdapter } from "../../../utils/UploadAdapter";
import { useCallback, useEffect, useState } from "react";
import { FormLabelMod } from "./FormLabelMod";
import { AuthContextProvider } from "../../../context/AuthContext";
import { Popup } from "../../Popup";

export const CKEditorComponent = ({ label, changedForm, setChangedForm, ...props }) => {
  const [valir, setValir] = useState(false)
  const [data, setData] = useState({ fieldMod: null, metaMod: null, helpersMod: null })
  const { changedForm, setChangedForm } = AuthContextProvider()
  setTimeout(() => {
    setValir(true)
  }, 100);
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true)
    }
    return () => {
      setIsMounted(false)
    }
  }, [])
  const [field, meta, helpers] = useField({ ...props })
  useEffect(() => {
    if (isMounted) {
      setData({ fieldMod: field, metaMod: meta, helpersMod: helpers })
    }
  }, [isMounted])


  const CustomUploadAdapterPlugin = useCallback((editor) => {
    editor.plugins.get("FileRepository").createUploadAdapter = loader => {
      // Create new object and pass server url
      return loader && new UploadAdapter(loader)
    };
  })

  const editorConfiguration = {
    extraPlugins: [CustomUploadAdapterPlugin],
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'indent',
        '|',
        'imageUpload',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'undo',
        'redo'
      ],
      shouldNotGroupWhenFull: true
    },
    language: 'es',
    image: {
      toolbar: [
        'imageTextAlternative',
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:side'
      ]
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells'
      ]
    },
  }
  return (
    <>
      {typeof window !== "undefined" && (
        <>
          <Divider />
          <FormLabelMod >
            {label}
          </FormLabelMod>
          {valir &&
            <CKEditor
              editor={Editor}
              config={editorConfiguration}
              onChange={(event, editor) => {
                !changedForm && setChangedForm(true)
                data?.helpersMod?.setValue(editor.getData())
              }}
              data={data?.fieldMod?.value}
            // para fijar alto fijo del ckeditor
            // onReady={(editor) => {
            //   editor.editing.view.change((writer) => {
            //     writer.setStyle(
            //       "height",
            //       "600px",
            //       editor.editing.view.document.getRoot()
            //     );
            //   });
            // }}
            />
            
          }
            {meta.touched && meta.error && <Popup title={`${label} ${meta.error} `} arrow={"top"} />}
        </>
      )}
    </>
  );
};
