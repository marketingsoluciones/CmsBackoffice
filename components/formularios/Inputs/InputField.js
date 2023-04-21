import { Box, Text, FormLabel, Input, Divider, Flex } from "@chakra-ui/react";
import { useField } from "formik";
import { memo } from "react";

export const InputField = memo(({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);

  return (
    <Box>
      {/* <Divider /> */}
    {/*   <FormLabel
        paddingTop={"1rem"} 
        fontWeight={"900"} 
        textAlign={"left"}
        fontSize={"sm"}
      > */}
        <Flex /* gap={"0.3rem"} */ alignItems={"center"}>
         {/*  {label}{" "} */}
          {meta.touched && meta.error && (
            <Text color={"red"} fontSize={"xs"} fontWeight={"500"}>
              {meta.error}
            </Text>
          )}
        </Flex>
       {/*  <Input placeholder={label}  my={"0.5rem"} variant={"filled"} fontSize={"sm"} {...field} {...props} /> */}

        <input
          className="border-2 h-11 rounded-md w-full pl-4 focus:outline-none "
          placeholder={label}
          /* my={"0.5rem"} */ variant={"filled"}  {...field} {...props} />
      {/* </FormLabel> */}
    </Box>
  );
});
