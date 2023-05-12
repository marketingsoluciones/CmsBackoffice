import { Box, Divider, Flex, FormLabel, Input, Text } from "@chakra-ui/react";
import { useField } from "formik";
import Image from "next/image";
import { ImageIcon } from "../../icons"
import { useEffect, useState } from "react";

export const UploadImage = ({ label, typeFile = "all", ...props }) => {
  const [field, meta, helpers] = useField(props);
  const [image, setImage] = useState(null)
  const [video, setVideo] = useState(null)

  useEffect(() => {
    console.log(645001, image)
  }, [image])

  const handleChange = async (e) => {
    try {
      let file = e.target.files[0];
      let reader = new FileReader();

      reader.onloadend = async () => {
        if (reader.result) {
          setImage(null)
          setVideo(null)

          helpers.setValue(file)
          if (reader.result.split("/")[0].split(":")[1] === "image") {
            setImage(reader.result)
          }
          if (reader.result.split("/")[0].split(":")[1] === "video") {
            setVideo(reader.result)
          }
        }
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.log(error);
    }
  };

  const typesFile = {
    all: "image/*,video/*",
    svg: "image/svg+xml"
  }

  return (
    <Box bg={"white"} p={"2px"} rounded={"xl"} w={"250px"} shadow={"md"} >
      {/* <Divider /> */}
      <FormLabel p={"0.5rem"} m={"0"} fontWeight={"900"} textAlign={"center"} alignItems={"center"} fontSize={"sm"} className="cursor-pointer">
        <Flex gap={"0.3rem"} alignItems={"center"} justify={"center"}  >
          {label} {meta.touched && meta.error && <Text color={"red"} fontSize={"sm"} fontWeight={"500"}>{meta.error}</Text>}
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
        >
          {!field?.value?.i640 && !image && !video ?
            (
              <>
                <ImageIcon w={"3rem"} h={"3rem"} />
                <Text>Subir imagen</Text>
              </>
            )
            :
            (
              <div className="border w-[216px] h-[122px]">
                {field?.value?.i640 && <Image width={"214"} height={"120"} layout="intrinsic" src={`${process.env.NEXT_PUBLIC_BASE_URL}${field.value.i640}`} objectFit="contain" objectPosition={"center"} />}
                {image && <Image width={"214"} height={"120"} layout="intrinsic" src={image} objectFit="contain" objectPosition={"center"} />}
                {video && <video style={{ maxHeight: "120px" }} width={"214px"} height={"120px"} src={video} />}
              </div>

            )
          }
        </Flex>
        <Input
          type="file"
          display={"none"}
          accept={typesFile[typeFile]}
          onChange={handleChange}
          bg={"red"}
        />
      </FormLabel>
    </Box>
  );
};
