import { Avatar, Box, Divider, FormLabel, Flex, Text, Center } from "@chakra-ui/react";
import { SeudonimoList } from "./SeudonimoList";
import { ArrowDownIcon, IconEdit, IconInstagram, IconLogoFacebook, IconPlusSquare, IconTwitterLogo, IconWhatsapp } from "../Icons";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import React from 'react'
import Select from 'react-select'
import { FormLabelMod } from "../formularios/Inputs/FormLabelMod";

export const Seudonimo = ({ modal, setModal, listDown, setListDown, found, user, nickNames, setFoundList, foundList, nickName, setNickName }) => {
    const faund = nickNames.find(seudonimo => seudonimo.nickName === found)
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [value, setValue] = useState()


    const options = useMemo(() => {
        return nickNames.reduce((acc, item) => {
            acc.push({
                value: item.nickName,
                label:
                    <Flex alignItems={"center"}>
                        <Avatar h={"24px"} w={"24px"} />
                        <Text ml={"0.2rem"} className="capitalize">{item.nickName}</Text>
                    </Flex>
            })
            return acc
        }, [])
    }, [])

    useEffect(() => {
        setNickName(nickNames.filter(elem => elem.nickName === value)[0])
    }, [value])
    useEffect(() => {
        console.log(nickName, !!nickName?.facebook)
    }, [nickName])

    return (
        <Box >
            <Divider />
            <FormLabelMod >
                <Flex my={"0.5rem"} justifyContent={"space-between"} >
                    <Text>
                        Elija o cree su seudónimo
                    </Text>
                    <div className="flex flex-row gap-[5px] items-center *justify-start shrink-0 relative ">
                        <IconEdit className={`w-6 h-6 ${nickName ? "text-gray-700 cursor-pointer" : "text-gray-300"}`} onClick={() => { nickName && setModal({ show: true, create: false }) }} />
                        <IconPlusSquare className="w-6 h-6 text-gray-700 cursor-pointer" onClick={() => { setModal({ show: true, create: true }) }} />
                    </div>
                </Flex>
                <Box my={{ base: "0rem", md: "0.3rem" }} >
                    <Select
                        onChange={(e) => { setValue(e?.value) }}
                        className="w-[100%] mr-2"
                        placeholder={
                            <Flex alignItems={"Center"}>
                                <Avatar h={"24px"} w={"24px"} />
                                <Text ml={"0.2rem"} className="capitalize">{user?.displayName}</Text>
                            </Flex>
                        }
                        //defaultValue={options[0]}
                        isDisabled={isDisabled}
                        isLoading={isLoading}
                        isClearable={isClearable}
                        isSearchable={isSearchable}
                        options={options}
                        classNames={"cursor-pointer"} />


                    {/* <div style={{ top: `${refD?.current?.offsetTop}` }} className={`${listDown ? "block" : "hidden"} absolute z-30`}>
                        <SeudonimoList listDown={listDown} setListDown={setListDown} setFoundList={setFoundList} nickNames={nickNames} foundList={foundList} />
                    </div> */}
                    <Flex ml={"0.3rem"} justifyContent={"space-between"} width={"80%"}>
                        <Center>Redes activas:</Center>
                        {nickName?.facebook && <IconLogoFacebook className="w-5 h-5 text-gray-700" />}
                        {nickName?.instagram && <IconInstagram className="w-5 h-5 text-gray-700" />}
                        {nickName?.twitter && <IconTwitterLogo className="w-5 h-5 text-gray-700" />}
                        {nickName?.whatsapp && <IconWhatsapp className="w-5 h-5 text-gray-700" />}
                    </Flex>
                    <br />
                </Box>
            </FormLabelMod>
        </Box>
    )
}

/* Code generated with AutoHTML Plugin for Figma */

