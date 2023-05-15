import { Box, Button, Divider, Flex, FormLabel, Input, Text } from "@chakra-ui/react";
import { useField } from "formik";
import Image from "next/image";
import { ImageIcon } from "../../icons"
import { EditIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { GreenEditIcon } from "../../Icons/index";

export const UploadImage = ({ label, typeFile = "all", ...props }) => {
  const [field, meta, helpers] = useField(props);
  const [image, setImage] = useState(null)
  const [video, setVideo] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [videoFile, setVideoFile] = useState(null)
  const [valirCanvas, setValirCanvas] = useState(false)

  useEffect(() => {
    console.log(54121, field?.value)
  }, [field])


  const handleChange = async (e) => {
    try {
      let file = e.target.files[0];
      let reader = new FileReader();

      reader.onloadend = async () => {
        if (reader.result) {
          setImage(null)
          setVideo(null)
          setImageFile(null)
          setVideoFile(null)

          if (reader.result.split("/")[0].split(":")[1] === "image") {
            setImageFile(file)
            setImage(reader.result)
            helpers.setValue({ imageFile: file })
          }
          if (reader.result.split("/")[0].split(":")[1] === "video") {
            setVideoFile(file)
            setVideo(reader.result)
            helpers.setValue({ videoFile: file })
          }
        }
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCapture = () => {
    try {
      setValirCanvas(true)
      const canvas = document.getElementById("canvas");
      const video = document.querySelector("video");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas
        .getContext("2d")
        .drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      const imgPaste = canvas.toDataURL()
      setImage(imgPaste)
      let file = null;
      let blob = document.querySelector("canvas").toBlob(function (blob) {
        file = new File([blob], 'test.png', { type: 'image/png' });
        setImageFile(file)
        helpers.setValue({ imageFile: file, videoFile })
      }, 'image/png');

    } catch (error) {
      console.log(error);
    }
  };

  const typesFile = {
    all: "image/*,video/*",
    image: "image/*",
    video: "video/*",
    svg: "image/svg+xml"
  }

  return (
    <Box bg={"white"} p={"2px"} rounded={"xl"} w={"250px"} shadow={"md"} >
      {/* <Divider /> */}
      {/* <div className="flex flex-col">
        <span className="text-[10px]">typeFile: {typeFile}</span>
        <span className="text-[10px]">video: {video?.length || "false"}</span>
        <span className="text-[10px]">image: {image?.length || "false"}</span>
        <span className="text-[10px]">field?.value?.i640: {field?.value?.i640?.length || "false"}</span>
        <span className="text-[10px]">field?.value?.videoUrl: {field?.value?.videoUrl?.length || "false"}</span>
      </div> */}
      <FormLabel p={"0.5rem"} m={"0"} fontWeight={"900"} textAlign={"center"} alignItems={"center"} fontSize={"sm"} className="cursor-pointer">
        <Flex gap={"0.3rem"} alignItems={"center"} justify={"center"}  >
          {label} {" "} {meta.touched && meta.error && (<Text color={"red"} fontSize={"sm"} fontWeight={"500"}>{meta.error}</Text>)}
          <GreenEditIcon/>
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
          {!field?.value?.videoUrl ?
            !field?.value?.i640 && !image && !video ?
              (
                <>

                  {
                    typeFile === "all" ?
                      <Text>Subir imagen o video</Text>
                      : <>
                        <ImageIcon w={"3rem"} h={"3rem"} />
                        <Text>Subir imagen</Text>
                      </>
                  }
                </>
              )
              :
              (
                <div className="border w-[216px] h-[122px]">
                  {field?.value?.i640 && <Image width={"214"} height={"120"} layout="intrinsic" src={`${process.env.NEXT_PUBLIC_BASE_URL}${field.value.i640}`} objectFit="contain" objectPosition={"center"} />}
                  {image && !video && <Image width={"214"} height={"120"} layout="intrinsic" src={image} objectFit="contain" objectPosition={"center"} />}
                  {video && <video id="video" style={{ maxHeight: "120px" }} width={"214px"} height={"120px"} src={video} controls />}
                </div>


              )
            :
            (<video id="video" style={{ maxHeight: "120px" }} width={"214px"} height={"120px"} src={`${process.env.NEXT_PUBLIC_BASE_URL}${field.value.videoUrl}`} controls />)
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
      {video || field?.value?.videoUrl ?
        <Flex w={"100%"} flexDir={"column"} pt={"0.5rem"} px={"1.5rem"}>
          <>
            <Button
              size={"sm"}
              bg={"#15803d"}
              _hover={"none"}
              fontFamily={""}
              textColor={"white"}
              onClick={handleCapture}
              disabled={!video}
            >
              Captura Imagen Miniatura
            </Button>
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              w={"100%"}
              border={"2px dotted"}
              borderColor={"gray.300"}
              h={"8rem"}
              rounded={"xl"}
              color={"gray.400"}
              pos={"relative"}
              my={"0.5rem"}
            >
              {video || field?.value?.videoUrl ? <canvas hidden={!valirCanvas} style={{ overflow: "auto", maxHeight: "120px" }} width={"214px"} className="border" id="canvas"></canvas> : ""}
              {field?.value?.videoUrl && !valirCanvas && <Image width={"214"} height={"120"} layout="intrinsic" src={`${process.env.NEXT_PUBLIC_BASE_URL}${field.value.i640}`} objectFit="contain" objectPosition={"center"} />}
            </Flex>
          </>
        </Flex>
        : ""
      }
    </Box>
  );
};
