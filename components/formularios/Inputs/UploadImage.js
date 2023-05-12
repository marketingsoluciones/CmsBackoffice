import { Box, Divider, Flex, FormLabel, Input, Text, } from "@chakra-ui/react";
import { useField } from "formik";
import Image from "next/image";
import { ImageIcon} from "../../icons"
import { EditIcon } from "@chakra-ui/icons";
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
    <Box bg={"white"} p={"2px"} rounded={"xl"} w={"250px"} shadow={"md"} >
      {/* <Divider /> */}
      <FormLabel p={"0.5rem"} m={"0"} fontWeight={"900"} textAlign={"center"} alignItems={"center"} fontSize={"sm"} >
        <Flex gap={"0.3rem"} alignItems={"center"} justify={"center"}  >
          {label} {" "} {meta.touched && meta.error && (<Text color={"red"} fontSize={"sm"} fontWeight={"500"}>{meta.error}</Text>)}
        </Flex>
        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          w={"100%"}
          border={"2px dotted"}
          borderColor={"gray.300"}
          h={"10rem"}
          rounded={"xl"}
          color={"gray.400"}
          pos={"relative"}
          mt={"0.5rem"}
          className="cursor-pointer"
        >
          {!field?.value?.i640 && !image && (
            <>
              <ImageIcon w={"3rem"} h={"3rem"} />
              <Text>Subir imagen</Text>
            </>
          )}
          {field?.value?.i640 && <Image layout="fill" src={`${process.env.NEXT_PUBLIC_BASE_URL}${field.value.i640}`} objectFit="contain" objectPosition={"center"} />}
          {image &&
            <div className="relative w-full h-full flex justify-center ">

              <Image width={"120rem"} height={"120rem"} src={image} objectFit="contain" objectPosition={"center"} />
              <div className="absolute top-5 right-5">
                <EditIcon w={"1rem"} h={"1rem"} />
              </div>
            </div>
          }
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
