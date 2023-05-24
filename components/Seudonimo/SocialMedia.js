import { Box, Center, Flex, Text } from "@chakra-ui/react"
import { BlackFacebookIcon, EyeIcon } from "../Icons"
import { InputFieldGlobal } from "../formularios/Inputs/InputFieldGlobal"
import { useField } from "formik";

export const SocialMedia = ({ mediaIcon, name, placeholder }) => {
  const [field, meta, helpers] = useField({ name: `${name}Status` });
  return (
    <Flex w={"100%"} justifyContent={"space-between"} >
      <Flex minW={{ base: "37%", md: "150px" }}>
        <Center minW={"full"} >
          <Flex gap={{ base: "1", md: "2" }} justifyContent={"space-between"} minW={{ base: "40%", md: "85%" }} >
            <Center>
              {mediaIcon}
            </Center>
            <Text className="text-gris text-right relative" textAlign={"left"} fontSize={{ base: "sm", md: "lg" }}>
              {field.value ? "Publico" : "Oculto"}
            </Text>
            <Center>
              <EyeIcon />
            </Center>
          </Flex>
        </Center>
      </Flex>
      {/* <div className="w-[100%]">
        <input placeholder={placeholder} className="focus:outline-none min-w-[95%] border border-solid rounded-md h-8 pl-2 truncate text-xs md:text-md" {...{ ...field, value: field?.value?.link }} />
        {meta.touched && meta.error && (
          <span className="text-xs text-red-600">
            {meta.error}
          </span>
        )}
      </div> */}
      <InputFieldGlobal
        name={name}
        className="focus:outline-none min-w-[95%] border border-solid rounded-md h-8 pl-2 truncate text-xs md:text-md"
        placeholder={placeholder}
      />
    </Flex>
  )
}