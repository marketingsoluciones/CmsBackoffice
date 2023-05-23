import { FormLabel } from "@chakra-ui/react"

export const FormLabelMod = ({ children }) => {
  return (
    <FormLabel w={"100%"} paddingTop={{ base: "0.2rem", md: "0.5rem" }} fontWeight={"900"} textAlign={"left"} fontSize={"sm"}>
      {children}
    </FormLabel>
  )
}