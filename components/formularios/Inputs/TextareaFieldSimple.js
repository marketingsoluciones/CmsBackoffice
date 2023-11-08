import { Box, Divider, Textarea, Flex, Text } from "@chakra-ui/react"
import { useField } from "formik";
import { FormLabelMod } from "./FormLabelMod";


export const TextareaFieldSimple = ({ label, ...props }) => {

    const [field, meta, helpers] = useField(props);

    return (

        <Box >
            <FormLabelMod>
                {label}
                <Flex alignItems={"center"}>
                    {meta.touched && meta.error && (
                        <Text color={"red"} fontSize={"sm"} fontWeight={"500"}>
                            {meta.error}
                        </Text>
                    )}
                </Flex>
                <Box  >
                    <Textarea fontSize={"sm"} {...field} {...props} />
                </Box>
            </FormLabelMod>
        </Box>
    )
}
