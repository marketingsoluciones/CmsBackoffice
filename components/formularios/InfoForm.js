import { Badge, Box, Button, Divider, Heading, Text } from "@chakra-ui/react";
import { useFetch } from "../../hooks/useFetch";
import { DeleteIcon } from "@chakra-ui/icons";
import { DeleteModall } from "../modals/Alert";
import { useState } from "react";

export const InfoForm = ({ Information, values, options, estado, setAction, deleteModal, setDeleteModal }) => {
  const [modal, setModal] = useState(false)
  const [data, isLoading, isError, setQuery] = useFetch(true);
  
  const handleRemove = () => {
   const borrar= setQuery({
      ...options.deleteEntry,
      variables: { id: values?._id },
      type: "json",
    })
    if(borrar){
      setAction({ type: "VIEW", payload: {} })
    }
  };

  return (
    <>
      <Box bg={"white"} p={"1rem"} shadow={"sm"} rounded={"xl"} w={"250px"}>
        {modal ? (
          <DeleteModall setModal={setModal} modal={modal} handleRemove={handleRemove} setAction={setAction}   />
        ) : null}
        <Heading pb={"1rem"} fontSize={"sm"} color={"gray.500"}>
          Información
        </Heading>
        <Divider />
        {Information?.map((item, idx) => (
          <div
            key={idx}
            pt={"1rem"}
            w={"100%"}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"space-between"}
            fontSize={"sm"}
            className={`${item.value != null ? "block pt-[1rem] text-sm" : "hidden"}`}
          >
            <Text color={"gray.400"}>{item?.title}</Text>
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
      </Box>
      {estado.type === "edit" && (
        <ButtonDeleteEntry
          values={values}
          options={options}
          setAction={setAction}
          modal={modal}
          setModal={setModal}
        />
      )}
    </>
  )
}

const ButtonDeleteEntry = ({ modal, setModal }) => {
  const [data, isLoading, isError, setQuery] = useFetch(true);
  return (
    <Button
      bg={"white"}
      rounded={"xl"}
      size={"sm"}
      w={"100%"}
      color={"red.500"}
      leftIcon={<DeleteIcon />}
      isLoading={isLoading}
      onClick={() => setModal(!modal)}
    >
      Eliminar entrada
    </Button>
  );
};

