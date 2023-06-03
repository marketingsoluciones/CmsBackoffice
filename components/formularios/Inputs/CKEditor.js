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

export const CKEditorComponent = ({ label, ...props }) => {
  const [valir, setValir] = useState(false)
  const [data, setData] = useState({ fieldMod: null, metaMod: null, helpersMod: null })
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
    toolbar: [
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
            <Flex gap={"0.3rem"} alignItems={"center"}>
              {data?.metaMod?.touched && data?.metaMod?.error && (
                <Text color={"red"} fontSize={"sm"} fontWeight={"500"}>
                  {data?.metaMod?.error}
                </Text>
              )}
            </Flex>
          </FormLabelMod>
          {valir &&
            <CKEditor
              editor={Editor}
              config={editorConfiguration}
              onChange={(event, editor) => data?.helpersMod?.setValue(editor.getData())}
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
        </>
      )}
    </>
  );
};
