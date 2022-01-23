import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import FormDinamical from "./Forms/Form";
import { FindOption } from "./Datatable/Columns";
import LoadingComponent from "./LoadingComponent";

const PanelEditAndCreate = ({ slug, setAction, state }) => {
  const [{ data, isLoading, isError }, setQuery] = useFetch();

  const options = FindOption(slug);

  useEffect(() => {
    if (state.type === "edit") {
      setQuery({ ...options?.getByID, variables: { id: state.data._id } });
    }
  }, [state]);

  const Information = [
    { title: "Ultima Actualización", value: "14/12/2022" },
    { title: "Creado por", value: "Francisco Montilla" },
  ];
  return (
    <Flex flexDir={"column"}>
    {!isLoading && !isError ? (
      <>
    <Flex justifyContent={"space-between"} paddingBottom={"2rem"}>
    <Box>
          <Heading fontSize={"3xl"} as={"h1"} textTransform={"capitalize"}>
            {data?.businessName || data?.title || "Crear Registro"}
          </Heading>
          <Text fontSize={"xs"}>Identificador: {data?._id}</Text>
        </Box>
      <Flex gap={"1rem"} alignItems={"center"}>
      <Button w={"fit-content"} onClick={() => setAction({ type: "VIEW", payload: {} })}>
        Descartar
      </Button>
      <Button w={"fit-content"} onClick={() => setAction({ type: "VIEW", payload: {} })}>
        Guardar
      </Button>
      </Flex>

    </Flex>
    
    <Grid
      templateColumns={["repeat(1, 1fr)", , , , "repeat(5, 1fr)"]}
      gap={"2rem"}
    >
      <GridItem
        colSpan={["1", , , , "4"]}
        bg={"white"}
        p={"1rem"}
        shadow={"sm"}
        rounded={"xl"}
      >
        
          <FormDinamical schema={slug} initialData={data} />
    
      </GridItem>
      <GridItem
        colSpan={"1"}
        bg={"white"}
        p={"1rem"}
        shadow={"sm"}
        rounded={"xl"}
        h={"fit-content"}
      >
        <Heading pb={"1rem"} fontSize={"sm"} color={"gray.500"}>
          Información
        </Heading>
        <Divider />
        {Information?.map((item, idx) => (
          <Flex
            key={idx}
            pt={"1rem"}
            w={"100%"}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"space-between"}
            fontSize={"xs"}
          >
            <Text color={"gray.400"}>{item.title}</Text>
            <Badge w={"100%"} textAlign={"center"} color={"gray.700"} p={"0.25rem"}>
              {item.value}
            </Badge>
          </Flex>
        ))}
      </GridItem>
    </Grid>
    </>) : <LoadingComponent />}
    </Flex>
    
  );
};

export default PanelEditAndCreate;
