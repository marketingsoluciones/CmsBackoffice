import { Center, Flex, Text } from "@chakra-ui/react"
import { EyeIcon, Icon144Lock, Icon145Unlocked, } from "../Icons"
import { InputFieldGlobal } from "../formularios/Inputs/InputFieldGlobal"
import { useField } from "formik";

export const SocialMedia = ({ mediaIcon, name, placeholder }) => {

  const [field, meta, helpers] = useField(`${name}Status`);
  return (
    <Flex w={"100%"} justifyContent={"space-between"} >
      <Flex minW={{ base: "37%", md: "150px" }}>
        {/* <input type="checkbox" {...field} checked={!lock} /> */}
        <Center minW={"full"} className="cursor-pointer" onClick={() => {
          //setFieldValue(field.name, !lock)
          helpers.setValue(!field.value)
        }} >
          <Flex gap={{ base: "1", md: "2" }} justifyContent={"space-between"} minW={{ base: "40%", md: "85%" }} >
            <Center>
              {mediaIcon}
            </Center>
            <Text className="text-gris text-right relative capitalize" textAlign={"left"} fontSize={{ base: "sm", md: "lg" }} >
              {field.value ? "publico" : "oculto"}
            </Text>
            <Center>
              <EyeIcon className="w-5 h-5" />
              {field.value ?
                <Icon145Unlocked className="absolute z-10 w-3 h-3 translate-x-[10px] translate-y-[-8px] text-gray-700" />
                : <Icon144Lock className="absolute z-10 w-3 h-3 translate-x-[10px] translate-y-[-8px] text-gray-700" />}
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
        className="focus:outline-none max-w-[70%] border border-solid rounded-md h-8 pl-2 truncate text-xs md:text-md"
        placeholder={placeholder}
      />
    </Flex >
  )
}
