import { Box, Text, FormLabel, Select, Image, Divider, Flex } from "@chakra-ui/react"
import { useField } from "formik";
import { memo } from "react";
import { useCallback, useEffect, useState } from "react";
import { api } from '../../../utils/api'

export const CounstriesSelectField = memo(({ label, ...props }) => {

    const [field, meta, helpers] = useField(props);
    const [data, setData] = useState([])

    const fetching = useCallback(async () => {
        try {
            const { data } = await api.getAllCountries()
            const map = data?.map(item => ({ name: item?.translations?.spa?.common.toLowerCase() }))
            setData(map)
        } catch (error) {
            console.log(error);
        }
    })

    useEffect(() => {
        fetching()
    }, []);


    return (
        <Box>
            <Divider />
            <FormLabel paddingTop={"1rem"}
                fontWeight={"900"}
                textAlign={"left"}
                fontSize={"sm"}
            >
                <Flex gap={"0.3rem"} alignItems={"center"} >
                    {label}{""}
                    {meta.touched && meta.error && (
                        <Text color={"red"} fontSize={"xs"} fontWeight={"500"}>
                            {meta.error}
                        </Text>
                    )}
                </Flex>
            </FormLabel>


            <Select variant={"filled"} fontSize={"sm"} {...field} {...props} >
                <option disabled={field.value === "" ? false : true}>Seleccionar</option>
                {data?.sort((a, b) => a.name.localeCompare(b.name))?.map((item, idx) => (
                    <option key={idx} value={item.name}>{item.name}</option>
                ))}
            </Select>
        </Box>
    )
})

