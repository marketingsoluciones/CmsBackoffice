import { Box, Divider, Textarea, Flex, Text } from "@chakra-ui/react"
import { useField } from "formik";
import { FormLabelMod } from "./FormLabelMod";
import { useEffect, useRef, useState, } from "react";
import { Popup } from "../../Popup";


export const TextareaFieldSizable = ({ label, ...props }) => {
  const refInput = useRef(null)
  const [field, meta, helpers] = useField(props);
  const [rows, setRows] = useState(1)

  const handleChange = (e) => {
    e.preventDefault()
    e.target.rows = 1
    const rowT = refInput?.current ? (refInput?.current.scrollHeight / 16) - 1 : 1
    if (rowT < 5) {
      e.target.rows = rowT
    }
    else {
      e.target.rows = 4
    }
    helpers.setValue(e.target.value)
  }
  useEffect(() => {
    const rowT = refInput?.current ? (refInput?.current.scrollHeight / 16) - 1 : 1
    if (rowT < 5) {
      setRows(rowT)
    }
    else {
      setRows(4)
    }
  }, [refInput])


  return (
    <Box >
      <Divider />
      <FormLabelMod>
        {label}{" "}
        <Box gap={"0.3rem"} alignItems={"center"}>
          <Textarea
            resize={"none"}
            rows={rows}
            ref={refInput}
            className="outline-none overflow-y-scroll"
            onChange={(e) => { handleChange(e) }}
            fontSize={"sm"}
            value={field.value}
            variant={"filled"}
            {...props}
          />
        </Box>
        {meta.touched && meta.error && <Popup title={`${label} ${meta.error} `} arrow={"top"} />}
      </FormLabelMod>
    </Box>
  )
}
