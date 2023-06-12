import { Box, Text, Input, Divider, Flex } from "@chakra-ui/react";
import { useField } from "formik";
import { memo } from "react";
import { FormLabelMod } from "./FormLabelMod";
import { Popup } from "../../Popup";

export const InputField = memo(({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);

  return (
    <Box >
      <Divider />
      <FormLabelMod>
        <Box gap={"0.3rem"} alignItems={"center"}>
          {label}{" "}
          
        </Box>
        <Input my={{ base: "0rem", md: "0.3rem" }} variant={"filled"} fontSize={"sm"} {...field} {...props} h={"36px"} />
        {meta.touched && meta.error && <Popup title={`${label} ${meta.error} `} arrow={"top"} />}
      </FormLabelMod>
    </Box>
  );
});
