import {
  Box,
  Divider,
  Flex,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Text
} from "@chakra-ui/react";
import { useField } from "formik";

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
    <Box>
      <Divider />
      <FormLabel
        paddingTop={"1rem"}
        fontWeight={"900"}
        textAlign={"left"}
        fontSize={"sm"}
      >
        <Flex gap={"0.3rem"} alignItems={"center"}>
          {label}
          {meta.touched && meta.error && (
            <Text color={"red"} fontSize={"xs"} fontWeight={"500"}>
              {meta.error}
            </Text>
          )}
        </Flex>
      </FormLabel>
      <InputGroup fontSize={"sm"}>
        <InputLeftAddon children="https://" />
        <Input fontSize={"sm"} {...field} {...props} />
      </InputGroup>
    </Box>
  );
};
