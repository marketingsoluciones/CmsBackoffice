import { CheckIcon, CloseIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Text, FormLabel, Input, Button, Flex, List, ListIcon, ListItem, IconButton, Divider, } from "@chakra-ui/react";
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
    <Box bg={"white"} p={"2px"} rounded={"xl"} w={"250px"} shadow={"md"}>

      <FieldArray
        name={props.name}
        render={(arrayHelpers) => (
          <>
            <FormLabel paddingTop={"1rem"} fontWeight={"900"} textAlign={"center"} alignItems={"center"} fontSize={"sm"}>{label}</FormLabel>

            <Flex gap={"4px"} justify={"center"}>
              <Input
                rounded={"md"}
                size={"sm"}
                variant={"filled"}
                fontSize={"sm"}
                w={"9rem"}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <Button
                size={"sm"}
                bg={"#15803d"}
                _hover={"none"}
                fontFamily={""}
                textColor={"white"}
                onClick={() => arrayHelpers.push(schemas[schema])}
              >
                Añadir
              </Button>
            </Flex>

            <List spacing={3} py={"0.5rem"} columnGap={"1rem"} px={"6px"} display={"grid"} gridTemplateColumns={"repeat(2, 1fr)"}>
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
                          justifyContent={"space-between"}
                          className="truncate cursor-default mt-3"

                        >
                          <ListIcon key={idx} as={CheckIcon} color="green.500" />
                          <span className="truncate">
                            {item}
                          </span>
                          <IconButton _focus={"none"} h={"22px"} w={"20px"} size={"sm"} onClick={() => {
                            const indice = arrayHelpers.form.values[props.name].findIndex(ele => item === ele)
                            arrayHelpers.remove(indice)
                          }}>
                            <CloseIcon h={"10px"} w={"10px"} />
                          </IconButton>
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
                            <IconButton size={"sm"} onClick={() => {
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
              <Text color={"red"} fontSize={"sm"}>
                {meta.error}
              </Text>
            )}
          </>
        )}
      />
    </Box>
  );
})
