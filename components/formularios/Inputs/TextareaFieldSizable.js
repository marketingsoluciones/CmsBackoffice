import { Box, Divider, Textarea, Flex, Text } from "@chakra-ui/react"
import { useField } from "formik";
import { FormLabelMod } from "./FormLabelMod";
import { useRef, } from "react";


export const TextareaFieldSizable = ({ label, ...props }) => {
  const refInput = useRef(null)
  const [field, meta, helpers] = useField(props);

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

  return (
    <Box >
      <Divider />
      <FormLabelMod>
        {label}{" "}
        <Flex gap={"0.3rem"} paddingBottom={"0.5rem"} alignItems={"center"}>
          {meta.touched && meta.error && (
            <Text color={"red"} fontSize={"sm"} fontWeight={"500"}>
              {meta.error}
            </Text>
          )}
        </Flex>
        <Box gap={"0.3rem"} alignItems={"center"}>
          <Textarea
            resize={"none"}
            rows={1}
            ref={refInput}
            className="outline-none overflow-y-scroll"
            onChange={(e) => { handleChange(e) }}
            fontSize={"sm"}
            value={field.value}
            variant={"filled"}
            {...props}
          />
        </Box>
      </FormLabelMod>
    </Box>
  )
}
