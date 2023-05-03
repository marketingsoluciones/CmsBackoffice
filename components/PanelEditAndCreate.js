import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  useToast,
  Center,
  Square
} from "@chakra-ui/react";
import { useEffect, useCallback, useRef, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { FormDinamical } from "../components/formularios/Form";
import { FindOption } from "../components/Datatable/Columns";
import { LoadingComponent } from "../components/LoadingComponent";
import { DeleteIcon } from "@chakra-ui/icons";
import { formatTime } from "../utils/formatTime";
import { fetchApi } from "../utils/Fetching";
import { AuthContextProvider } from "../context/AuthContext";
import { ArrowLeft } from "./Icons/index"

export const PanelEditAndCreate = ({ slug, setAction, state }) => {

  const [valuesEdit, loadingValues, errorValues, setQueryValues] = useFetch();
  const refButton = useRef();
  const toast = useToast();
  const options = FindOption(slug);
  const { user, development } = AuthContextProvider();

  useEffect(() => {
    console.log(500021, valuesEdit)

  }, [valuesEdit])


  useEffect(() => {
    if (state.type === "edit") {
      setQueryValues({
        ...options?.getByID,
        variables: { id: state.data._id },
        type: "json",
      });
    }

  }, [state]);

  /* Fetch para crear */
  const fetchCreate = useCallback(
    async (values) => {
      try {

        const data = await fetchApi({
          query: options?.createEntry?.query,
          variables: { ...values, development: development, authorUid: user?.uid, userUid: user?.uid, authorUsername: user?.displayName },
          type: "formData"
        });
        if (data) {
          toast({
            status: "success",
            title: "Operacion exitosa",
            isClosable: true,
          });
          setAction({ type: "VIEW", payload: {} });
        }

      } catch (error) {
        toast({
          status: "error",
          title: "Error",
          description: JSON.stringify(error),
          isClosable: true,
        });
        console.log(8003, error);
      }
    },
    [slug]
  );

  /* Fetch para actualizar */
  const fetchUpdate = useCallback(
    async ({
      _id,
      characteristics2,
      questionsAndAnswers2,
      categories,
      ...values
    }) => {
      try {

        delete values.createdAt;
        delete values.updatedAt;
        const data = await fetchApi({
          query: options?.updateEntry?.query,
          variables: { id: _id, args: { ...values, updaterUsername: user?.displayName } },
          type: "formData"
        });
        if (data) {
          toast({
            status: "success",
            title: "Operacion exitosa",
            isClosable: true,
          });
          setAction({ type: "VIEW", payload: {} });
        } else {
          throw new Error(10011, "Error en la peticion");
        }

      } catch (error) {
        console.log(8001, error)
        toast({
          status: "error",
          title: "Error",
          description: JSON.stringify(error),
          isClosable: true,
        });
        console.log(8002, error);
      }
    },
    [slug]
  );

  const handleSubmit = (values) => {
    state.type === "create" && fetchCreate(values);
    state.type === "edit" && fetchUpdate(values);
  };

  /* componente que indica la actualizacion y por quien se creo la empresa o post */
  const optionsFormatTime = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    //timeZone: "America/Los_Angeles",
  };
  const Information = [
    {
      title: "Creado el",
      value: formatTime(valuesEdit?.createdAt, "es", optionsFormatTime)
    },
    {
      title: "Ultima Actualización",
      value: formatTime(valuesEdit?.updatedAt, "es", optionsFormatTime)
    },
    {
      title: "Creado por",
      value: valuesEdit?.contactName || valuesEdit?.authorUsername || user?.displayName
    },
    {
      title: "Editado por",
      value: valuesEdit?.updaterUsername
    },
  ];

  return (
    <Flex flexDir={"column"} overflow={"auto"} maxH={"100%"} mb={"4rem"}>
      {!loadingValues && !errorValues ? (
        <>
          {/* Header del componente */}
          <Flex justifyContent={"space-between"} className="mb-5 px-5 mt-2">
            {/* Titulo del componente */}
            <Box>
              <div className="flex items-center">

                <button onClick={() => setAction({ type: "VIEW", payload: {} })}>
                  <ArrowLeft />
                </button>

                <div className="text-slate-600 mx-2  text-3xl" fontSize={"3xl"} as={"h1"} marginX={"2"} textTransform={"capitalize"} >
                  {valuesEdit?.businessName ||
                    valuesEdit?.title ||
                    "Crear Registro"}
                </div >

                <button
                  color={"white"}
                  fontWeight={"500"}
                  _hover={{
                    bg: "blue.700",
                  }}
                  className="bg-verde h-8 w-20 rounded-lg text-white"
                  onClick={async () => {
                    try {
                      await refButton.current.handleSubmit();
                      // setAction({ type: "VIEW", payload: {} })
                    } catch (error) {
                      console.log(8004, error);
                    }
                  }}
                >
                  Guardar
                </button>
              </div>

              <Text className="ml-9 text-slate-600 text-sm ">Identificador: {valuesEdit?._id}</Text>
            </Box>
          </Flex>

          <Flex h={"90%"}>
            <Box w="80%" h={"100%"}>
              <Grid
                gap={"1rem"}
                overflow={"auto"}
                h={"100%"}
                paddingX={"1rem"}
              >
                <GridItem
                  colSpan={["1", , , , "4"]}
                  bg={"white"}
                  p={"1rem"}
                  shadow={"sm"}
                  rounded={"xl"}
                >
                  <FormDinamical
                    schema={options?.schema}
                    initialValues={valuesEdit}
                    onSubmit={handleSubmit}
                    ref={refButton}
                    columns={["repeat(1, 1fr)", , , "repeat(3, 1fr)"]}
                  />
                </GridItem>
              </Grid>
            </Box>
            <Box w="20%" h={"100%"}>
              <Grid
                gap={"1rem"}
                overflow={"auto"}
                h={"100%"}
                paddingX={"1rem"}
              >
                <GridItem
                  colSpan={"1"}
                  display={"flex"}
                  flexDir={"column"}
                  gap={"1rem"}
                >
                  <Box bg={"white"} p={"1rem"} shadow={"sm"} rounded={"xl"}>
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
                        fontSize={"sm"}
                      >
                        <Text color={"gray.400"}>{item.title}</Text>
                        <Badge
                          w={"100%"}
                          textAlign={"center"}
                          color={"gray.700"}
                          p={"0.25rem"}
                        >
                          {item.value}
                        </Badge>
                      </Flex>
                    ))}
                  </Box>

                  {state.type === "edit" && (
                    <ButtonDeleteEntry values={valuesEdit} options={options} />
                  )}
                </GridItem>
              </Grid>
            </Box>
          </Flex>
        </>
      ) : (
        <LoadingComponent />
      )}
    </Flex>
  );
};

const ButtonDeleteEntry = ({ values, options }) => {
  const [data, isLoading, isError, setQuery] = useFetch(true);

  const handleRemove = () => {
    setQuery({
      ...options.deleteEntry,
      variables: { id: values?._id },
      type: "json",
    });
  };

  return (
    <Button
      bg={"white"}
      rounded={"xl"}
      size={"sm"}
      w={"100%"}
      color={"red.500"}
      leftIcon={<DeleteIcon />}
      isLoading={isLoading}
      onClick={handleRemove}
    >
      Eliminar entrada
    </Button>
  );
};
