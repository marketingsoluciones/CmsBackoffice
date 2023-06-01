import { Avatar, Box, Divider, Flex, Text, Center, Tooltip } from "@chakra-ui/react";
import { IconEdit, IconInstagram, IconLogoFacebook, IconPlusSquare, IconTwitterLogo, IconWhatsapp } from "../Icons";
import { useEffect, useMemo, useRef, useState } from "react";
import React from 'react'
import Select, { InputActionMeta } from 'react-select'
import { FormLabelMod } from "../formularios/Inputs/FormLabelMod";
import { AuthContextProvider } from "../../context/AuthContext";
import Image from "next/image";

export const Seudonimo = ({ setModal, modal, nickName, setNickName }) => {
    const refSelet = useRef(null)
    const { user, development } = AuthContextProvider()
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [value, setValue] = useState()
    const [idxOptions, setIdxOptions] = useState()

    const socialMediaIcons = {
        facebook: <IconLogoFacebook className="w-5 h-5 text-gray-700" />,
        instagram: <IconInstagram className="w-5 h-5 text-gray-700" />,
        twitter: <IconTwitterLogo className="w-5 h-5 text-gray-700" />,
        whatsapp: <IconWhatsapp className="w-5 h-5 text-gray-700" />
    }


    const options = useMemo(() => {
        return user?.authDevelopments.find(entorno => entorno.title === development).nickNames.reduce((acc, item) => {
            acc.push({
                value: item.nickName,
                label:
                    <Flex alignItems={"center"}>
                        {item?.imgAvatar?.i320 ?
                            <Flex w={"24px"} h={"24px"} border={"1px"} borderColor={"gray.400"} rounded={"full"} isTruncated>
                                <Image width={"24px"} height={"24px"} layout="intrinsic" src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.imgAvatar.i320}`} objectFit="contain" objectPosition={"center"} />
                            </Flex>
                            : <Avatar h={"24px"} w={"24px"} />
                        }
                        <Text ml={"0.2rem"} className="capitalize">{item.nickName}</Text>
                    </Flex>
            })
            return acc
        }, [])
    }, [user, nickName])

    useEffect(() => {
        //aqui para setear modal de acuerdo a los cambios que quiero para el select
        if (modal?.setValue) {
            if (modal?.create) { refSelet.current.setValue(options[options.length - 1]) }
            if (modal?.update) refSelet.current.setValue(options[idxOptions])
            if (modal?.delete) refSelet.current.setValue()
        }
    }, [modal])

    useEffect(() => {
        setNickName(user?.authDevelopments.find(entorno => entorno.title === development).nickNames.filter(elem => elem.nickName === value)[0])
    }, [value, user])

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
                        ref={refSelet}
                        onChange={(e) => {
                            setIdxOptions(options.findIndex(elem => elem.value === e?.value))
                            setValue(e?.value)
                        }}
                        isOptionSelected={value}
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
                    <Flex ml={"0.3rem"} mt={"2"} justifyContent={"flex-start"} width={"80%"}>
                        <Center>Redes activas:</Center>
                        <Flex ml="2" gap={"2"}>
                            {nickName?.socialMedia?.map((elem, idx) => {
                                return (elem.isVisible &&
                                    <Tooltip label={elem.link} key={idx}>
                                        <Box>
                                            {socialMediaIcons[elem.title]}
                                        </Box>
                                    </Tooltip>)
                            })}
                        </Flex>
                    </Flex>
                    <br />
                </Box>
            </FormLabelMod>
        </Box>
    )
}

