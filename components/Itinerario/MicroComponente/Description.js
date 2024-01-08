import {
    Editable,
    EditableInput,
    EditableTextarea,
    EditablePreview,
    Textarea,
    Box,
} from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import { InputFieldGlobal } from '../../formularios/Inputs/InputFieldGlobal'
import { TextareaFieldSizable } from "../../formularios/Inputs/TextareaFieldSizable"
import { useField } from "formik";
import { memo, useEffect, useRef, useState } from "react";
import { Popup } from "../../Popup";

export const Description = ({ ...props }) => {
    const refInput = useRef(null)
    const [field, meta, helpers] = useField({ name: "description"});
    const [rows, setRows] = useState(1)

    const handleChange = (e) => {
        e.preventDefault()
        e.target.rows = 1
        const rowT = refInput?.current ? (refInput?.current.scrollHeight / 16) - 1 : 1
        if (rowT < 5) {
            e.target.rows = rowT
        }
        else {
            e.target.rows = 4
        }
        helpers.setValue(e.target.value)
    }
    useEffect(() => {
        const rowT = refInput?.current ? (refInput?.current.scrollHeight / 16) - 1 : 1
        if (rowT < 5) {
            setRows(rowT)
        }
        else {
            setRows(4)
        }
    }, [refInput])
    return (
        <div className='w-[25%]'>
            <Box gap={"0.3rem"} alignItems={"center"}>
                <Textarea
                    resize={"none"}
                    rows={rows}
                    ref={refInput}
                    className=" overflow-y-scroll"
                    onChange={(e) => { handleChange(e) }}
                    fontSize={"md"}
                    value={field.value}
                    variant={"filled"}
                    _focus={"outline-none"}
                    bg={"none"}
                    {...props}
                />
            </Box>
        </div>
    )
}