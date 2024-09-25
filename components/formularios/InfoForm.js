import { Badge, Box, Divider, Text } from "@chakra-ui/react";
import { useFetch } from "../../hooks/useFetch";
import { FormLabelMod } from "./Inputs/FormLabelMod";
import { AuthContextProvider } from "../../context/AuthContext";
import { ButtonDeleteEntry } from "./ButtonDeleteEntry";

export const InfoForm = ({ Information, values, options, estado }) => {
  const [data, isLoading, isError, setQuery] = useFetch(true);
  const { dispatch } = AuthContextProvider()

  const handleRemove = () => new Promise(async (resolve, reject) => {
    const result = await setQuery({
      ...options.deleteEntry,
      variables: { id: values?._id },
      type: "json",
    })
    dispatch({ type: "VIEW", payload: {} })
    resolve(result)
  });



  return (
    <>
      <Box >
        <Divider />
        <FormLabelMod>
          Información
          <Divider />
          {Information?.map((item, idx) => (
            <div
              key={idx}
              // pt={"1rem"}
              // w={"100%"}
              // flexDir={"column"}
              // alignItems={"center"}
              // justifyContent={"space-between"}
              // fontSize={"sm"}
              className={`${item.value != null ? "block pt-[0.4rem] text-xs" : "hidden"}`}>
              <Text >{item?.title}</Text>
              <Badge
                w={"100%"}
                textAlign={"center"}
                color={"gray.700"}
                p={"0.25rem"}
              >
                {item?.value}
              </Badge>
            </div>
          ))}
        </FormLabelMod>
      </Box>
      {estado.type === "edit" && (
        <ButtonDeleteEntry
          title={"Eliminar entrada"}
          handleRemove={handleRemove}
        //isLoading={isLoading}
        />
      )}
    </>
  )
}

