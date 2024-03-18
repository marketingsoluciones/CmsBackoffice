import { Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react"
import { EventContextProvider } from "../context/EventContext"
import { EventsGroupContextProvider } from "../context/EventsGroupContext"
import { ArrowDownIcon } from "./Icons/index"
import { SocketContextProvider } from "../context"

export const EventoSelect = () => {
    const { event, setEvent } = EventContextProvider()
    const { eventsGroup } = EventsGroupContextProvider()
    const EventArry = eventsGroup?.reduce((acc, el) => acc.concat(el.nombre), [])
    const EventArryReverse = EventArry?.reverse()
    const { socket, fatherID } = SocketContextProvider()

    const handleChange = (item) => {
        try {
            setEvent(eventsGroup?.find((el) => el.nombre === item))
            socket?.emit(`cms:message`, {
                emit: fatherID,
                receiver: fatherID,
                type: "clickCard",
                payload: {
                    action: "clickCard",
                    value: event._id
                }
            });
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className={`flex items-center justify-star w-full bg-white  p-2 rounded-lg `}>
                <div className={`w-full flex md:flex-col space-x-2 md:space-x-0`}>
                    <div className={`flex gap-4 `}>
                        <Text pl={"0.1rem"} className={`text-gray-600 font-semibold`}>{"Evento:"}</Text>
                    </div>
                    <div className="flex w-full">
                        <Menu autoSelect={false} foc  >
                            <MenuButton flex={"2"} w={"8rem"} >
                                <div className="flex justify-between w-[90%] md:w-full">
                                    <Text noOfLines={1} textAlign={"start"} ml={"2px"} className={"text-[13px] text-gray-500 z-50 font-semibold"} >{event?.nombre}</Text>
                                    <ArrowDownIcon h={2} w={3} />
                                </div>
                            </MenuButton>
                            <MenuList p={"0"} fontSize={"sm"} justifyItems={"start"}  >
                                {EventArryReverse.map((item, idx) => (
                                    <MenuItem className={`${item === event?.nombre ? "bg-gray-100 font-semibold" : ""} text-md `} _hover={{ bg: 'gray.200' }} key={idx} color={"gray.600"}
                                        onClick={() => { handleChange(item) }}>{`${item}`}
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </Menu>
                    </div>
                </div>
            </div>
        </>
    )
}