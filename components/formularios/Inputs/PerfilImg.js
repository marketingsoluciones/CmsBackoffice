import { CamaraIcon } from "../../Icons/index"

import { Box, Center, Flex, FormLabel, Input, Text } from "@chakra-ui/react";
import { useField } from "formik";
import Image from "next/image";
import { ImageIcon } from "../../icons"
import { useEffect, useState } from "react";
import { FormLabelMod } from "./FormLabelMod";

export const PerfilImg = ({ ...props }) => {
    const [field, meta, helpers] = useField(props);
    const [image, setImage] = useState(null)

    const handleChange = async (e) => {
        try {
            let file = e.target.files[0];
            let reader = new FileReader();

            reader.onloadend = async () => {
                if (reader.result) {
                    setImage(null)
                    if (reader.result.split("/")[0].split(":")[1] === "image") {
                        setImage(reader.result)
                        helpers.setValue(file)
                    }
                }
            };

            reader.readAsDataURL(file);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <FormLabel className="w-[100%] h-[100%]">
            <Flex className="cursor-pointer rounded-full border-dashed border w-[100%] h-[100%] bg-gray-400 truncate flex items-center justify-center">
                <Center>
                    <div className="bg-red-500 text-white">
                        {
                            !field?.value?.i640 && !image ?
                                (<>
                                    {
                                        <>
                                            <CamaraIcon className="w-10 h-10" />
                                            {/* <ImageIcon w={"3rem"} h={"3rem"} /> */}
                                        </>
                                    }
                                </>)
                                :
                                (
                                    <div className="border w-[216px] h-[122px]">
                                        {field?.value?.i640 && <Image width={"214"} height={"120"} layout="intrinsic" src={`${process.env.NEXT_PUBLIC_BASE_URL}${field.value.i640}`} objectFit="contain" objectPosition={"center"} />}
                                        {image && <Image width={"214"} height={"120"} layout="intrinsic" src={image} objectFit="contain" objectPosition={"center"} />}
                                    </div>
                                )
                        }
                        <Input
                            type="file"
                            display={"none"}
                            accept={"image/*"}
                            onChange={handleChange}
                            bg={"red"}
                        />
                    </div>
                </Center>
            </Flex>
            {meta.touched && meta.error && (
                <span className="text-xs text-red-600">
                    {meta.error}
                </span>
            )}
        </FormLabel>

    )
}