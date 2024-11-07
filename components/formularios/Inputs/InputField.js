import { Box, Text, Input, Divider, Flex } from "@chakra-ui/react";
import { useField } from "formik";
import { memo } from "react";
import { FormLabelMod } from "./FormLabelMod";
import { Popup } from "../../Popup";
import { LuAlertCircle } from "react-icons/lu";
import { useToast } from "../../../hooks/useToast";

export const InputField = memo(({ label, availableInput, ...props }) => {
  const [field, meta, helpers, divide] = useField(props);
  const toast = useToast();

  return (
    <Box >
      {
        divide ? 
        <Divider />: null
      }
      <FormLabelMod>
        <Box gap={"0.3rem"} alignItems={"center"} display={"flex"}>
          <label> {label}</label>
          <label onClick={() => toast("error", "Este campo no esta disponible en tu plan")} className='cursor-pointer'> { !availableInput && <LuAlertCircle /> }</label>
        </Box>
        <Input  disabled={!availableInput} my={{ base: "0rem", md: "0.3rem" }} variant={"filled"} fontSize={"sm"} {...field} {...props} h={"36px"} />
        {meta.touched  && meta.error && <Popup title={`${label} ${meta.error} `} arrow={"top"} />}
      </FormLabelMod>
    </Box>
  );
});
