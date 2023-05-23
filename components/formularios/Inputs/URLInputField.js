import { Box, Divider, Flex, Input, InputGroup, InputLeftAddon, Text } from "@chakra-ui/react";
import { useField } from "formik";
import { FormLabelMod } from "./FormLabelMod";

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

export const URLInputField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  if (field.value) {
    field.value = splitUrl(field.value)
  }
  return (
    <Box >
      <Divider />
      <FormLabelMod>
        {label}
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
            <Input fontSize={"sm"} {...field} {...props} />
          </InputGroup>
        </Box>
      </FormLabelMod>
    </Box>
  );
};
