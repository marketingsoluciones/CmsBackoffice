import { Box, Text, Select, Image, Divider, Flex } from "@chakra-ui/react"
import { useField } from "formik";
import { memo, useRef } from "react";
import { useCallback, useEffect, useState } from "react";
import { api } from '../../../utils/api'
import { FormLabelMod } from "./FormLabelMod";
import { Popup } from "../../Popup";

export const CounstriesSelectField = memo(({ label, ...props }) => {
    const [field, meta, helpers] = useField(props);
    const [data, setData] = useState([])
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        if (!isMounted) {
            setIsMounted(true)
        }
        return () => {
            setIsMounted(false)
        }
    }, [])

    useEffect(() => {
        if (isMounted) {
            fetching()
        }
    }, [isMounted])

    const fetching = useCallback(async () => {
        try {
            const { data } = await api.getAllCountries()
            const map = data?.map(item => ({ name: item?.translations?.spa?.common.toLowerCase() }))
            setData(map)
        } catch (error) {
            console.log(error);
        }
    })


    return (
        <Box >
            <Divider />
            <FormLabelMod>
                {label}{""}
                {/* <Flex gap={"0.3rem"} alignItems={"center"} >
                    {meta.touched && meta.error && (
                        <Text color={"red"} fontSize={"sm"} fontWeight={"500"}>
                            {meta.error}
                        </Text>
                    )}
                </Flex> */}
                <Box className="pb-1">
                    <Select variant={"filled"} fontSize={"sm"} {...field} {...props} marginTop={"1"} >
                        <option disabled={field.value === "" ? false : true}>Seleccionar</option>
                        {data?.sort((a, b) => a.name.localeCompare(b.name))?.map((item, idx) => (
                            <option key={idx} value={item.name}>{item.name}</option>
                        ))}
                    </Select>
                </Box>

                {meta.touched && meta.error && <Popup title={`${label} ${meta.error} `} arrow={"top"} />}

            </FormLabelMod>
        </Box>
    )
})

