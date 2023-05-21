import { Box, Button, Divider, Flex, FormLabel, Text } from "@chakra-ui/react";
import { SwitchField } from "./Inputs/SwitchField";
import { IconCalendary, IconEdit, IconStatus, IconVisibility, IconVisits } from "../Icons";

export const OptionsForm = ({ alertDev, setAlertDev, schema, user }) => {
    return (
        <Box >
            <Divider />
            <Flex
                paddingTop={"1rem"}
                fontWeight={"900"}
                textAlign={"left"}
                fontSize={"md"}
                gap={"0.3rem"} alignItems={"center"}
            >
                Publico
            </Flex>
            <Flex my={"0.5rem"} justifyContent={"space-between"} >
                <FormLabel width={"45%"}>
                    <Button
                        size={"sm"}
                        width={"100%"}
                        bg={"#15803d"}
                        _hover={false}
                        fontFamily={""}
                        textColor={"white"}
                        type="submit"
                    >
                        Guardar
                    </Button>
                </FormLabel>
                <Button
                    size={"sm"}
                    width={"50%"}
                    bg={"#15803d"}
                    _hover={false}
                    fontFamily={""}
                    textColor={"white"}
                    onClick={() => setAlertDev(!alertDev)}
                >
                    Pre-visualizar
                </Button>
            </Flex>
            <Flex my={"0.2rem"} justifyContent={"space-between"} >
                <Flex >
                    <IconStatus />
                    <Text className="ml-2 text-sm  relative" >Estatus: Redactando</Text>
                </Flex>
                <IconEdit className={"w-6 h-6 text-gray-600"} />
            </Flex>
            <Flex my={"0.2rem"} justifyContent={"space-between"} >
                <Flex >
                    <IconVisibility />
                    <Text className="ml-2 text-sm  relative" >Visibilidad: Pública</Text>
                </Flex>
                <IconEdit className={"w-6 h-6 text-gray-600"} />
            </Flex>
            <Flex my={"0.2rem"} justifyContent={"space-between"} >
                <Flex >
                    <IconVisits />
                    <Text className="ml-2 text-sm  relative" >Visitas: 52</Text>
                </Flex>
                <IconEdit className={"w-6 h-6 text-gray-600"} />
            </Flex>
            <Flex my={"0.2rem"} justifyContent={"space-between"} >
                <Flex >
                    <IconCalendary />
                    <Text className="ml-2 text-sm  relative" >Publicar: Inmediatamente</Text>
                </Flex>
                <IconEdit className={"w-6 h-6 text-gray-600"} />
            </Flex>
            <div className="flex flex-row gap-4 items-center justify-center shrink-0 w-[100%] relative" >
                {schema && schema?.map((item, idx) => {
                    const valir = !item?.roles ? true : item?.roles?.some(role => user?.role.includes(role))
                    switch (valir && item.type) {
                        case "switch":
                            return (
                                <SwitchField
                                    key={idx}
                                    name={item.accessor}
                                    label={item.Header}
                                />
                            );
                            break;
                    }
                })}
                {/* <div className="bg-green-700 rounded-lg pt-[11px] pr-[22px] pb-[11px] pl-[22px] flex flex-row gap-0 items-center justify-center shrink-0 w-[110px]* h-[30px] relative" style={{ boxShadow: "var(--_01-shadows-color-01-primary-box-shadow, 0px 8px 16px 0px rgba(0, 171, 85, 0.24))" }}>

                    <div className="text-white text-sm relative" >
                        Publicar
                    </div>

                </div> */}
            </div>
        </Box>
    )
}