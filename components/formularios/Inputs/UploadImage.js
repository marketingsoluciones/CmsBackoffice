import { Box, Divider, Flex, FormLabel, Input, Text } from "@chakra-ui/react";
import { useField } from "formik";
import Image from "next/image";
import { ImageIcon } from "../../icons"
import { useEffect, useState } from "react";

export const UploadImage = ({ label, typeFile = "all", ...props }) => {
  const [field, meta, helpers] = useField(props);
  const [image, setImage] = useState(null)


  const handleChange = async (e) => {
    try {
      let file = e.target.files[0];
      let reader = new FileReader();

      reader.onloadend = async () => {
        if (reader.result) {

          helpers.setValue(file)
          setImage(reader.result)
        }
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.log(error);
    }
  };

  const typesFile = {
    all: "image/*",
    svg: "image/svg+xml"
  }

  return (
    <Box>
      <Divider />
      <FormLabel paddingTop={"1rem"} fontWeight={"900"} textAlign={"left"} fontSize={"sm"}>

        <Flex gap={"0.3rem"} alignItems={"center"}>
          {label} {meta.touched && meta.error && <Text color={"red"} fontSize={"xs"} fontWeight={"500"}>{meta.error}</Text>}
        </Flex>

        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          w={"70%"}
          border={"2px dotted"}
          borderColor={"gray.300"}
          h={"12rem"}
          rounded={"xl"}
          color={"gray.400"}
          pos={"relative"}
          mt={"0.5rem"}
          ml={"8rem"}
          bgColor={"gray.100"}
        >

          {!field?.value?.i640 && !image && (
            <>
              <div className="grid grid-cols-2 h-full items-center place-items-center cursor-pointer ">
                <div>
                  <img src="/placeholder/addImgPlus.png" />
                  {/* <ImageIcon w={"5rem"} h={"5rem"} /> */}
                </div>
                <div>
                  <label className="text-black font-semibold text-lg">Selecciona una imagen</label>
                  <Text>Elija la imagen de su miniatura examinando sus archivos y subir la que mejor le guste</Text>
                </div>
              </div>
            </>
          )}
         

            {field?.value?.i640 && <Image height={"220px"} width={"220px"} src={`${process.env.NEXT_PUBLIC_BASE_URL}${field.value.i640}`} objectFit="contain" objectPosition={"center"} />}
            {image && <Image height={"220px"} width={"220px"} src={image} objectFit="contain" objectPosition={"center"}  />}
      
        </Flex>

        <Input
          type="file"
          display={"none"}
          accept={typesFile[typeFile]}
          onChange={handleChange}
        />

      </FormLabel>
    </Box>
  );
};
