import { Box, Divider, Textarea, Flex, Text } from "@chakra-ui/react"
import { useField } from "formik";
import { FormLabelMod } from "./FormLabelMod";


export const TextareaField = ({ label, ...props }) => {

    const [field, meta, helpers] = useField(props);

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
                <Box my={{ base: "0rem", md: "0.3rem" }} >
                    <Textarea fontSize={"sm"} {...field} {...props} />
                </Box>
            </FormLabelMod>
        </Box>
    )
}
