import { Box, Divider, FormLabel, Textarea, Flex,Text } from "@chakra-ui/react"
import { useField } from "formik";


export const TextareaField = ({ label, ...props }) => {

    const [field, meta, helpers] = useField(props);

    return (
        <Box>
            <Divider />
            {/* <FormLabel paddingTop={"1rem"} fontWeight={"900"} textAlign={"left"} fontSize={"sm"}>{label}</FormLabel> */}

            <FormLabel
                paddingTop={"1rem"}
                fontWeight={"900"}
                textAlign={"left"}
                fontSize={"sm"}
            >
                <Flex gap={"0.3rem"} paddingBottom={"0.5rem"} alignItems={"center"}>
                    {label}{" "}
                    {meta.touched && meta.error && (
                        <Text color={"red"} fontSize={"xs"} fontWeight={"500"}>
                            {meta.error}
                        </Text>
                    )}
                </Flex>
                <Textarea fontSize={"sm"} {...field} {...props} />
            </FormLabel>

        </Box>
    )
}
