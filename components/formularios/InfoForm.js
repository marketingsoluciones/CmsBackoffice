import { Badge, Box, Button, Divider, Flex, Grid, GridItem, Heading, Text, useToast, Center, Square } from "@chakra-ui/react";

export const InfoForm = ({ Information}) => {

  return (
    <>
      <Box bg={"white"} p={"1rem"} shadow={"sm"} rounded={"xl"} w={"250px"}>
        <Heading pb={"1rem"} fontSize={"sm"} color={"gray.500"}>
          Información
        </Heading>
        <Divider />
        {Information?.map((item, idx) => (
          <div
            key={idx}
            pt={"1rem"}
            w={"100%"}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"space-between"}
            fontSize={"sm"}
            className={`${item.value != null?"block pt-[1rem] text-sm":"hidden"}`}
          >
            <Text color={"gray.400"}>{item?.title}</Text>
            <Badge
              w={"100%"}
              textAlign={"center"}
              color={"gray.700"}
              p={"0.25rem"}
            >
              {item?.value}
            </Badge>
          </div>
        ))}
      </Box>
      {/*  {state.type === "edit" && (
              <ButtonDeleteEntry values={valuesEdit} options={options} />
            )} */}
    </>
  )
}