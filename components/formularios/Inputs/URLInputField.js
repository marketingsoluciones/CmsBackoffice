import { Box, Divider, Flex, Input, InputGroup, InputLeftAddon, Text } from "@chakra-ui/react";
import { useField } from "formik";
import { FormLabelMod } from "./FormLabelMod";
import { LuAlertCircle } from "react-icons/lu";
import { useToast } from "../../../hooks/useToast";

const splitUrl = (urlString) => {
  try {
    const sep = urlString.split("//")
    if (sep.length > 1) {
      return sep[1]
    }
    return urlString
  } catch (error) {
    console.log(error)
  }
}

export const URLInputField = ({ label,availableInput, ...props }) => {
  const [field, meta, helpers] = useField(props);
  if (field.value) {
    field.value = splitUrl(field.value)
  }
  const toast = useToast();

  return (
    <Box >
      <Divider />
      <FormLabelMod>
        <div className="flex  items-center space-x-1">
          <label> {label}</label>
          <label  onClick={() => toast("error", "Este campo no esta disponible en tu plan")} className='cursor-pointer'> { !availableInput && <LuAlertCircle /> }</label>
        </div>
        <Flex gap={"0.3rem"} alignItems={"center"}>
          {meta.touched && meta.error && (
            <Text color={"red"} fontSize={"sm"} fontWeight={"500"}>
              {meta.error}
            </Text>
          )}
        </Flex>
        <Box my={{ base: "0rem", md: "0.3rem" }} >
          <InputGroup fontSize={"sm"}>
            <InputLeftAddon children="https://" />
            <Input disabled={!availableInput} fontSize={"sm"} {...field} {...props} />
          </InputGroup>
        </Box>
      </FormLabelMod>
    </Box>
  );
};
