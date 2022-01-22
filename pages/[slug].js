import { Box, Button, Flex, Text, Heading } from "@chakra-ui/react";
import { useEffect, useMemo, useReducer, useState } from "react";
import Datatable from "../components/Datatable/Datatable";
import { FetchGraphQL } from "../Fetching";
import PanelEditAndCreate from "../components/PanelEditAndCreate";
import { useFetch } from '../hooks/useFetch'
import { columnsDataTable } from "../components/Datatable/Columns";

export class Action {
  type;
  data;
  constructor(type, data) {
    this.type = type;
    this.data = data;
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case "VIEW":
      return new Action("view", action.payload);
    case "EDIT":
      return new Action("edit", action.payload);
    case "CREATE":
      return new Action("create", action.payload);
    case "DELETE":
      return new Action("delete", action.payload);
    default:
      break;
  }
};

const Module = ({ slug }) => {
  const [state, dispatch] = useReducer(reducer, new Action("view", {}));
  const [{data, isLoading, isError}, setQuery] = useFetch()

  
  const ObjectData = {
    business: FetchGraphQL.getBusinessAll,
    categoriesBusiness: {},
    subcategoriesBusiness: {},
    posts: {},
    categoriesPosts: {},
    subcategoriesPosts: {},
  };

  useEffect(() => {
    // setData(initialValues);
    dispatch({ type: "VIEW", payload: {} });
    ObjectData[slug] && setQuery(ObjectData[slug])
  }, [slug]);

  const myColumns = columnsDataTable({slug, dispatch})

  const columns = useMemo(() => myColumns?.schema, [myColumns]);

  return (
    <Flex as={"section"} flexDir={"column"} gap={"1rem"} h={"100%"} >
      {state.type === "view" && (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"100%"}>
          <Box>
          <Heading fontSize={"3xl"} as={"h1"} textTransform={"capitalize"}>{slug}</Heading>
          <Text fontSize={"sm"}>{JSON.stringify(data?.total)} registros</Text>
          </Box>
          <Button
        w={"fit-content"}
        px={"1rem"}
        onClick={() => dispatch({ type: "CREATE", payload: {} })}
      >
        Añadir registro
      </Button>

        </Flex>
      )}
        {state.type === "view" && (
          <Flex w={"100%"} overflow={"hidden"}>
      <Box bg={"white"} p={"1rem"} shadow={"sm"} rounded={"xl"} overflow={"auto"} mb={"5rem"} w={"100%"} >
          <Datatable columns={columns} data={data?.results?? []} isLoading={isLoading} initialState={{hiddenColumns : myColumns?.hiddenColumns ?? {}}} />
        </Box>
          </Flex>
        )}
        {["edit", "create"].includes(state.type) && (
          <PanelEditAndCreate setAction={dispatch} slug={slug} />
        )}
    </Flex>
  );
};

export default Module;

export async function getServerSideProps({ params }) {
  return {
    props: params, // { slug : "business"}
  };
}
