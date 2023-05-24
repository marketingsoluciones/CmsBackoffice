import { Badge, Box, Button, Divider, FormLabel, Heading, Text } from "@chakra-ui/react";
import { useFetch } from "../../hooks/useFetch";
import { DeleteIcon } from "@chakra-ui/icons";
import { DeleteModall } from "../modals/Alert";
import { useState } from "react";
import { FormLabelMod } from "./Inputs/FormLabelMod";

export const InfoForm = ({ Information, values, options, estado, setAction, deleteModal, setDeleteModal }) => {
  const [modal, setModal] = useState(false)
  const [data, isLoading, isError, setQuery] = useFetch(true);

  const handleRemove = () => {
    const borrar = setQuery({
      ...options.deleteEntry,
      variables: { id: values?._id },
      type: "json",
    })
    if (borrar) {
      setAction({ type: "VIEW", payload: {} })
    }
  };

  return (
    <>
      <Box >
        <Divider />
        <FormLabelMod>
          {modal ? (
            <DeleteModall setModal={setModal} modal={modal} handleRemove={handleRemove} setAction={setAction} />
          ) : null}
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

