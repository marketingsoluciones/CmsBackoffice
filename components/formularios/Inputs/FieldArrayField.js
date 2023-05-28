import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Text, FormLabel, Input, Button, Flex, List, ListIcon, ListItem, IconButton, Divider, } from "@chakra-ui/react";
import { FieldArray, useField } from "formik";
import { memo } from "react";
import { useState } from "react";
import { FormLabelMod } from "./FormLabelMod";
import { CloseIcon } from "../../Icons";

export const FieldArrayField = memo(({ label, schema, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const [value, setValue] = useState("");

  const schemas = {
    string: value,
    object: { title: value }
  }

  return (
    <Box >
      <Divider />
      <FormLabelMod>
        {label}
        <Box my={{ base: "0rem", md: "0.3rem" }} >
          <FieldArray
            name={props.name}
            render={(arrayHelpers) => (
              <>
                <Flex gap={"4px"} justify={"center"}>
                  <Input
                    rounded={"md"}
                    size={"sm"}
                    variant={"filled"}
                    fontSize={"sm"}
                    w={"85%"}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                  <Button
                    size={"sm"}
                    bg={"#15803d"}
                    _hover={false}
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
                              className="truncate cursor-default mt-3 border rounded-md"
                              key={idx}>
                              <Text ml={"2"} w={"90%"} className="truncate">
                                {item}
                              </Text>
                              <CloseIcon className="w-4 h-4 mr-1" onClick={() => {
                                const indice = arrayHelpers.form.values[props.name].findIndex(ele => item === ele)
                                arrayHelpers.remove(indice)
                              }} />
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
                                key={idx}
                              >
                                <ListIcon as={CheckIcon} color="green.500" />
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
      </FormLabelMod>
    </Box>
  );
})
