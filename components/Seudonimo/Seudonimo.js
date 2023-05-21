import { Avatar, Box, Divider, FormLabel, Flex, Text, Select } from "@chakra-ui/react";
import { SeudonimoList } from "./SeudonimoList";
import { ArrowDownIcon, IconEdit, IconInstagram, IconLogoFacebook, IconPlusSquare, IconTwitterLogo, IconWhatsapp } from "../Icons";
import { useEffect, useRef } from "react";

export const Seudonimo = ({ modal, setModal, listDown, setListDown, found, user, nickNames, setFoundList, foundList }) => {
    const refD = useRef(null)
    const faund = nickNames.find(seudonimo => seudonimo.nickName === found)
    useEffect(() => {
        console.log(refD?.current?.offsetLeft, refD?.current?.offsetTop)
    }, [refD])


    return (
        <Box >
            <Divider />
            <Flex
                paddingTop={"1rem"}
                fontWeight={"900"}
                textAlign={"left"}
                fontSize={"md"}
                gap={"0.3rem"}
                alignItems={"center"}
            >
                Elija o cree su seudónimo
            </Flex>

            <Flex my={"0.5rem"} justifyContent={"space-between"} >
                <Flex justifyContent={"space-between"} width={"75%"} className="rounded-lg p-2 border cursor-pointer" onClick={() => nickNames.length > 0 ? setListDown(!listDown) : null}>
                    <div >
                        {faund?.imgAvatar ? faund.imgAvatar : <Avatar h={"24px"} w={"24px"} />}
                    </div>
                    <div ref={refD} className="w-[calc(100%-48px)] flex flex-col gap-0 items-start justify-center shrink-0 relative overflow-hidden">
                        <Text className="text-left relative truncate" textTransform={"capitalize"} fontSize={"md"}>
                            {faund?.nickName ? faund.nickName : user?.displayName}
                        </Text>
                    </div>
                    <ArrowDownIcon className="w-4 h-4" />
                </Flex>
                <div className="flex flex-row gap-[5px] items-center *justify-start shrink-0 relative ">
                    <div className="rounded-lg flex flex-row gap-[5px] items-center justify-start shrink-0 relative cursor-pointer">
                        <IconEdit className="w-6 h-6 text-gray-700" />
                    </div>
                    <IconPlusSquare className="w-6 h-6 text-gray-700" />
                </div>
            </Flex>
            <div style={{ top: `${refD?.current?.offsetTop}` }} className={`${listDown ? "block" : "hidden"} absolute z-30`}>
                <SeudonimoList listDown={listDown} setListDown={setListDown} setFoundList={setFoundList} nickNames={nickNames} foundList={foundList} />
            </div>
            <Flex mt={"0.5rem"} ml={"1rem"} mb={"1rem"} justifyContent={"space-between"} width={"40%"}>
                <IconLogoFacebook />
                <IconInstagram />
                <IconTwitterLogo />
                <IconWhatsapp />
            </Flex>
            <Select placeholder={
                <>
                    <div >
                        {faund?.imgAvatar ? faund.imgAvatar : <Avatar h={"24px"} w={"24px"} />}
                    </div>
                    <div ref={refD} className="w-[calc(100%-48px)] flex flex-col gap-0 items-start justify-center shrink-0 relative overflow-hidden">
                        <Text className="text-left relative truncate" textTransform={"capitalize"} fontSize={"md"}>
                            {faund?.nickName ? faund.nickName : user?.displayName}
                        </Text>
                    </div>
                </>
            } size='md'>
                <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option>
            </Select>
        </Box>
    )
}

/* Code generated with AutoHTML Plugin for Figma */

