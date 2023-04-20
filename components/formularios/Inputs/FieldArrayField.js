import { CheckIcon, CloseIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  FormLabel,
  Input,
  Button,
  Flex,
  List,
  ListIcon,
  ListItem,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import { FieldArray, useField } from "formik";
import { memo } from "react";
import { useState } from "react";

export const FieldArrayField = memo(({ label, schema, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const [value, setValue] = useState("");

  const schemas = {
    string: value,
    object: { title: value }
  }

  return (
    <Box>
      <FieldArray
        name={props.name}
        render={(arrayHelpers) => (
          <>
            {/*       <Divider /> */}
            {/*  <FormLabel  paddingTop={"1rem"}  fontWeight={"900"} textAlign={"left"} fontSize={"sm"}>{label}</FormLabel> */}
            <Flex gap={"0.5rem"} alignItems={"center"}>
              <Button

                size={"sm"}
                onClick={() => arrayHelpers.push(schemas[schema])}
              >
                Crear
              </Button>

              <Input
                height={"44px"}
                width={"15rem"}
                size={"sm"}
                variant={"filled"}
                fontSize={"sm"}
                value={value}
                placeholder="Tags"
                onChange={(e) => setValue(e.target.value)}
                rounded={"md"}
              />

            </Flex>
            <List spacing={3} py={"0.5rem"} columnGap={"2rem"} display={"grid"} gridTemplateColumns={"repeat(4, 1fr)"}>
              {field.value &&
                field?.value?.map((item, idx) => {

                  if (typeof item === "string") {
                    return (
                      item && (
                        <ListItem
                          textTransform={"capitalize"}
                          fontSize={"sm"}
                          display={"flex"}
                          alignItems={"center"}
                          mt={"2"}

                        >
                          <div className="bg-gray-200 px-2 py-1 rounded-xl space-x-2 flex items-center   ">

                            <ListIcon key={idx} as={CheckIcon} color="green.500" />
                            <label className="truncate w-24 ">
                              {item}
                            </label>
                            <IconButton size={"xs"} onClick={() => {
                              const indice = arrayHelpers.form.values[props.name].findIndex(ele => item === ele)
                              arrayHelpers.remove(indice)
                            }}><CloseIcon /></IconButton>
                          </div>
                        </ListItem>
                      )
                    )
                  }

                  if (item instanceof Object) {
                    return (
                      <>
                        {item.title && (
                          <ListItem
                            textTransform={"capitalize"}
                            fontSize={"sm"}
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                          >
                            <ListIcon key={idx} as={CheckIcon} color="green.500" />
                            {item.title}
                            <IconButton size={"xs"} onClick={() => {
                              const indice = arrayHelpers.form.values[props.name].findIndex(ele => item === ele)
                              arrayHelpers.remove(indice)
                            }}><CloseIcon /></IconButton>
                          </ListItem>
                        )}
                      </>
                    )
                  }


                })}
            </List>
            {meta.touched && meta.error && (
              <Text color={"red"} fontSize={"xs"}>
                {meta.error}
              </Text>
            )}
          </>
        )}
      />
    </Box>
  );
})
