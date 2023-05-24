import { Box, Button, Divider, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useField } from "formik";
import { useState } from "react";
import { FormLabelMod } from "./FormLabelMod";

export const PasswordInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Box >
      <Divider />
      <FormLabelMod>
        {label}
        <Box my={{ base: "0rem", md: "0.3rem" }} >
        <InputGroup>
          <Input fontSize={"sm"} {...field} {...props} type={show ? 'text' : 'password'} />
          <InputRightElement width="4.5rem" pr={"0.5rem"}>
            <Button bg={"gray.300"} h="1.75rem" size="sm" fontSize={"sm"} onClick={handleClick}>
              {show ? "Ocultar" : "Mostrar"}
            </Button>
          </InputRightElement>
        </InputGroup>
        </Box>
      </FormLabelMod>
    </Box>
  );
};

;
