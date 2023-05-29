import { Box, Text, Input, Divider, Flex } from "@chakra-ui/react";
import { useField } from "formik";
import { memo } from "react";
import { FormLabelMod } from "./FormLabelMod";

export const InputField = memo(({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);

  return (
    <Box>
      <Divider />
      <FormLabelMod>
        <Box gap={"0.3rem"} alignItems={"center"}>
          {label}{" "}
          {meta.touched && meta.error && (
            <Text color={"red"} fontSize={"sm"} fontWeight={"500"}>
              {meta.error}
            </Text>
          )}
        </Box>
        <Input my={{ base: "0rem", md: "0.3rem" }} variant={"filled"} fontSize={"sm"} {...field} {...props} h={"36px"} />
      </FormLabelMod>
    </Box>
  );
});
