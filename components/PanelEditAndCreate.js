import { Box, Flex, Text, useToast, Center } from "@chakra-ui/react";
import { useEffect, useCallback, useRef, useState, } from "react";
import { useFetch } from "../hooks/useFetch";
import { FormDinamical } from "../components/formularios/Form";
import { FindOption } from "../components/Datatable/Columns";
import { LoadingComponent } from "../components/LoadingComponent";
import { formatTime } from "../utils/formatTime";
import { fetchApi } from "../utils/Fetching";
import { AuthContextProvider } from "../context/AuthContext";
import { ArrowLeft } from "./Icons/index"
import { Modal } from "./modals/Alert";

export const PanelEditAndCreate = ({ slug, setAction, state }) => {

  const [valuesEdit, loadingValues, errorValues, setQueryValues] = useFetch();
  const refButton = useRef();
  const toast = useToast();
  const options = FindOption(slug);
  const { user, development, changedForm, setChangedForm } = AuthContextProvider();
  const [showModal, setShowModal] = useState(false)
  const [handle, setHandle] = useState()

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
        values.video = values?.imgMiniatura?.videoFile
        values.imgMiniatura = values?.imgMiniatura?.imageFile
        values.imgBanner = values?.imgBanner?.imageFile
        values.imgLogo = values?.imgLogo?.imageFile
        values.icon = values?.icon?.imageFile
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
        values.video = values?.imgMiniatura?.videoFile
        values.imgMiniatura = values?.imgMiniatura?.imageFile
        values.imgBanner = values?.imgBanner?.imageFile
        values.imgLogo = values?.imgLogo?.imageFile
        values.icon = values?.icon?.imageFile
        delete values.createdAt;
        delete values.updatedAt;
        const data = await fetchApi({
          query: options?.updateEntry?.query,
          variables: { id: _id, args: { ...values } },
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
    console.log(2008, showModal)
    setChangedForm(false)
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
    <Flex flexDir={"column"} overflow={"auto"} maxH={"95%"} >
      {showModal && <Modal setShowModal={setShowModal} showModal={showModal} title={"Al salir perdera los cambios"} handle={handle} />}
      {!loadingValues && !errorValues ? (
        <>
          {/* Header del componente */}
          <Flex w={"99%"} className="px-1">
            {/* Titulo del componente */}
            <Box w={"100%"}>
              <Flex className="md:items-center" >
                <div className="flex items-start">
                  <Center >
                    <ArrowLeft
                      className="w-6 h-6 *md:w-8 *md:h-8 mr-2 text-gray-600 cursor-pointer"

                      onClick={() => {
                        if (changedForm) {
                          setHandle(() => () => {
                            setAction({ type: "VIEW", payload: {} })
                            setChangedForm(false)
                          }
                          )
                          setShowModal(true)
                        } else {
                          setAction({ type: "VIEW", payload: {} })
                        }
                      }}
                    />
                  </Center>
                  <Flex>
                    <Text color={"gray.600"} mx={"2"} fontSize={{ base: "md", md: "lg" }} mr={"6"} >
                      {valuesEdit?.businessName ||
                        valuesEdit?.title ||
                        "Crear Registro"}
                    </Text  >
                  </Flex>
                </div>
                <div>
                  <button
                    color={"white"}
                    fontWeight={"500"}
                    _hover={{
                      bg: "blue.700",
                    }}
                    className="hidden bg-verde h-8 w-20 rounded-lg text-white"
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
              </Flex>
            </Box>
          </Flex>
          {/* Cuerpo del formulario */}
          <Flex h={"85%"}  >
            <Box w={"100%"}  >
              <FormDinamical
                schema={options?.schema}
                initialValues={valuesEdit}
                onSubmit={handleSubmit}
                ref={refButton}
                Information={Information}
                values={valuesEdit}
                options={options}
                estado={state}
                setAction={setAction}
                columns={["repeat(1, 1fr)", , , "repeat(5, 1fr)"]}
              />
            </Box>
          </Flex>
        </>
      ) : (
        <LoadingComponent />
      )}
    </Flex>
  );
};

