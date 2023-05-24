import { Box, Text, Input, Divider, Flex, Switch } from "@chakra-ui/react";
import { useField } from "formik";
import { memo } from "react";
import { FormLabelMod } from "./FormLabelMod";

export const SwitchField = memo(({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);


  return (
    <Box >
      {/* <Divider /> */}
      <FormLabelMod>
        {label}{" "}
        <Flex gap={"0.3rem"} alignItems={"center"}>
          {meta.touched && meta.error && (
            <Text color={"red"} fontSize={"sm"} fontWeight={"500"}>
              {meta.error}
            </Text>
          )}
        </Flex>
        <Box w={"100%"} my={{ base: "0rem", md: "0.3rem" }} >
          {/* <Flex w={"100%"} justifyContent={"center"} > */}
          <Switch size={"lg"} isChecked={field.value} {...field} {...props} />
          {/* </Flex> */}
        </Box>
      </FormLabelMod>
    </Box>
  );
});
