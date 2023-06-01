import { BlackFacebookIcon, BlackInstagramIcon, BlackTwitterIcon, BlackWhatsappIcon, EyeIcon } from "../Icons/index";
import { PerfilImg } from "../formularios/Inputs/PerfilImg";
import { Formik, Form } from "formik";
import { InputFieldGlobal } from "../formularios/Inputs/InputFieldGlobal"
import { fetchApi, queries } from "../../utils/Fetching";
import { AuthContextProvider } from "../../context/AuthContext";
import { Box, Button, Center, Divider, Flex, Text, useToast } from "@chakra-ui/react";
import * as Yup from "yup";
import { SocialMedia } from "../Seudonimo/SocialMedia";
import { FormLabelMod } from "../formularios/Inputs/FormLabelMod";
import { useState } from "react";
import { InputCheckBox } from "../Seudonimo/InputCheckBox";
import { ButtonDeleteEntry } from "../formularios/ButtonDeleteEntry";

export const EditSeudonimo = ({ modal, setModal, user, nickName, setNickName }) => {
  const socialMedias = [
    { title: "facebook", icon: <BlackFacebookIcon />, placeholder: "https://www.facebook.com/...?" },
    { title: "twitter", icon: <BlackInstagramIcon />, placeholder: "https://instagram.com/...?" },
    { title: "instagram", icon: <BlackTwitterIcon />, placeholder: "https://twitter.com/...?" },
    { title: "whatsapp", icon: <BlackWhatsappIcon />, placeholder: "wa.link/...?" }
  ]
  const [lock, setLock] = useState(socialMedias.map(elem => { return { [`${elem.title}`]: false } }))
  const [isLoading, setIsLoading] = useState(false)

  const { domain, development, setUser } = AuthContextProvider()
  const toast = useToast();
  const asd = () => {
    const resultSocialMedias = undefined
    for (let i = 0; i < socialMedias.length; i++) {
      const sm = !modal.create && nickName?.socialMedia?.find(elem => elem.title === socialMedias[i].title)?.link
      const smStatus = !modal.create && nickName?.socialMedia?.find(elem => elem.title === socialMedias[i].title)?.isVisible
      resultSocialMedias = {
        ...resultSocialMedias,
        [`${socialMedias[i].title}`]: sm ? sm : "",
        [`${socialMedias[i].title}Status`]: sm ? smStatus : true,
      }
    }
    return resultSocialMedias
  }
  const initialValue = {
    nickName: !modal.create ? nickName?.nickName : "",
    comment: true,
    trackbacks: false,
    imgAvatar: !modal.create ? nickName?.imgAvatar : undefined,
    ...asd()
  }
  const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp', 'jfif'] };
  function isValidFileType(fileName, fileType) {
    return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
  }
  const MAX_FILE_SIZE = 1024000;
  const validationSchema = Yup.object({
    nickName: Yup.string().required("requerido"),
    imgAvatar: Yup.mixed()
      .required("Required")
      .test("is-valid-type", "Not a valid image type",
        (value) => {
          if (!!value?.name) {
            return isValidFileType(value && value?.name?.toLowerCase(), "image")
          }
          return true
        }
      )
      .test("is-valid-size", "Max allowed size is 100KB",
        (value) => {
          if (!!value?.name) {
            return value && value.size <= MAX_FILE_SIZE
          }
          return true
        }
      )
  });

  const onsubmit = async (values) => {
    try {
      setIsLoading(true)
      values.socialMedia = socialMedias.reduce((acc, elem) => {
        if (values[elem.title] !== "") {
          acc.push({
            title: elem.title,
            link: values[elem.title],
            isVisible: values[`${elem.title}Status`]
          })
        }
        return acc
      }, [])
      let result
      if (modal.create) {
        result = await fetchApi({
          query: queries.createNickName,
          variables: { ...values, development: development, uid: user?.uid },
          development: domain,
          type: "formData"
        });
      }
      if (!modal.create) {
        result = await fetchApi({
          query: queries.updateNickName,
          variables: { ...values, development: development, uid: user?.uid },
          development: domain,
          type: "formData"
        });
      }
      setUser((old) => {
        const f = (arr, filter) => {
          const key = Object.keys(filter)[0]
          const value = Object.values(filter)[0]
          return arr.findIndex(item => item ? item[key] == value : false)
        }
        if (modal.create) {
          old.authDevelopments[f(old.authDevelopments, { title: development })].nickNames?.push(result)
        } else {
          old.authDevelopments[f(old.authDevelopments, { title: development })]
            .nickNames[f(old.authDevelopments[f(old.authDevelopments, { title: development })].nickNames, { nickName: nickName?.nickName })] = result
        }
        return { ...old }
      });
      setNickName(result)
      setTimeout(() => {
        if (modal.create) setModal({ setValue: true, create: true })
        if (!modal.create) setModal({ setValue: true, update: true })
      }, 500);
      if (result) {
        toast({
          status: "success",
          title: "Operacion exitosa",
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemove = async (nickName) => {
    try {
      await fetchApi({
        query: queries.deleteNickName,
        variables: { nickName, development: development, uid: user?.uid },
        development: domain,
      });
      setUser((old) => {
        const newOld = { ...old }
        const f = (arr, filter) => {
          const key = Object.keys(filter)[0]
          const value = Object.values(filter)[0]
          return arr.findIndex(item => item ? item[key] == value : false)
        }
        delete newOld.authDevelopments[f([...newOld.authDevelopments], { title: development })]
          .nickNames[f([...newOld.authDevelopments][f([...newOld.authDevelopments], { title: development })].nickNames, { nickName: nickName })]
        return { ...newOld }
      });
      setTimeout(() => {
        setModal({ setValue: true, delete: true })
      }, 500);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Formik
        onSubmit={onsubmit}
        initialValues={initialValue}
        validationSchema={validationSchema}
      >
        <Form >
          <div className="backdrop-blur backdrop-filter bg-gray-919EAB opacity-40 z-10 fixed top-0 left-0 w-screen h-screen overflow-hidden " />
          <div className="bg-white inset-6 m-auto z-50 rounded-2xl pt-2.5 flex flex-col gap-2.5 items-center justify-center w-[50$] h-[80%] md:w-[570px] md:h-[600px] fixed ">
            <Flex>
              <Text fontSize={"xl"} >
                {modal.create ? "Crea el Seudónimo" : "Edita el Seudónimo:"}
              </Text>
            </Flex>
            <Flex className="bg-white p-2 w-[90%] h-[90%] flex-col gap-4 md:items-start items-center md:justify-start ">

              <Flex w={"100%"} >
                <Box ml={"4"} w={{ base: "80px", md: "120px" }} h={{ base: "80px", md: "120px" }}>
                  <PerfilImg name={"imgAvatar"} />
                </Box>
                <Flex ml={{ base: "0.3rem", md: "1rem" }} alignItems={"center"} className={"w-[calc(100%-105px)] md:w-[calc(100%-165px)]"} h={"100%"}>
                  <InputFieldGlobal
                    name="nickName"
                    className="focus:outline-none border border-solid rounded-lg py-1 px-3 w-[100%] truncate text-md md:text-xl"
                    placeholder="Seudónimo"
                  />
                </Flex>
              </Flex>
              {nickName?.socialMedia?.map((elem, idx) => {
                <Box key={idx}>

                </Box>
              })}
              {socialMedias.map((elem, idx) => {
                return <SocialMedia key={idx} mediaIcon={elem.icon} name={elem.title} lock={lock} setLock={setLock} placeholder={elem.placeholder} />
              })}
              <Box >
                <Divider />
                <FormLabelMod fontSize={"lg"} >
                  Comentarios
                  <Flex flexDir={"column"}>
                    <InputCheckBox name={"comment"} label={"Permitir comentarios"} />
                    <InputCheckBox name={"trackbacks"} label={"Permitir trackbacks y pingbacks en esta pagina"} />
                  </Flex>
                </FormLabelMod>
              </Box>
              <Flex w={"100%"} justifyContent={"space-between"}>
                <Center w={"40%"}>
                  {!modal.create &&
                    <ButtonDeleteEntry
                      title={"Eliminar entrada"}
                      handleRemove={() => handleRemove(nickName?.nickName)}
                      isLoading={false}
                    />
                  }
                </Center>
                <div className="w-[50%] p-6 flex flex-row gap-3 items-center justify-end self-stretch shrink-0 h-14 relative">
                  <Button
                    type="submit"
                    bg={"#15803d"}
                    _hover={false}
                    fontFamily={""}
                    textColor={"white"}
                    rounded={"lg"}
                    isLoading={isLoading}
                  >
                    Guardar
                  </Button>
                  <div
                    onClick={() => setModal(!modal)} className="cursor-pointer rounded-lg border-solid border pt-1.5 pr-4 pb-1.5 pl-4 shrink-0 ">
                    Cancelar
                  </div>
                </div>
              </Flex >
            </Flex>
          </div>
        </Form>
      </Formik >
    </>
  );
};
