import { Box, Button, Flex, Heading, Text, IconButton } from "@chakra-ui/react";
import { columnsDataTable } from "../components/Datatable/Columns";
import { Datatable } from "../components/Datatable/Datatable";
import { useFetch } from "../hooks/useFetch";
import { useEffect, useMemo, useState } from "react";
import { FiltrarIcon, SearchIcon, PermisosIcon, ArrowDownIcon, OptionIcon } from "../components/Icons/index"
import GlobalFilter from "./Datatable/GlobalFilter";
import { AuthContextProvider } from "../context/AuthContext";
import { useRouter } from "next/router";
import { hasRole } from "../utils/auth";

export const PanelViewTable = ({ slug, dispatch }) => {
  const [data, isLoading, isError, setQuery] = useFetch();
  const [dataRemove, isLoadingRemove, isErrorRemove, setQueryRemove] = useFetch(true);
  const [selected, setSelected] = useState(columnsDataTable({ slug }));
  const columns = useMemo(() => selected?.schema, [selected]);
  const [global, setGlobal] = useState()
  const [seteador, setSeteador] = useState(() => () => { })
  const { development, user } = AuthContextProvider()
  const router = useRouter()

  useEffect(() => {
    const userRole = user?.authDevelopments.filter(elem => elem.title === development)[0].role
    console.log(70014, development, userRole, selected.roles, hasRole(development, user, selected.roles))
    if (hasRole(development, user, selected.roles)) {
      setQuery({
        ...selected.getData,
        variables: { development: development },
        type: "json"
      });
    } else {
      setTimeout(() => {
        router.push("/")
      }, 100);
    }
  }, [selected, isLoadingRemove]);

  useEffect(() => {
    dispatch({ type: "VIEW", payload: {} });
    setSelected(columnsDataTable({ slug }));
  }, [slug, development]);



  const handleRemoveItem = (idSelected) => {
    setQueryRemove({
      ...selected.deleteEntry,
      variables: { id: idSelected },
      type: "json",
    });
  };

  useEffect(() => {
    /*  console.log(1001, seteador) */
  }, [seteador])

  return (
    <>

      <div className="w-full px-5">
        <div className=" flex justify-between w-100%">
          <Box>
            <Heading textTransform={"capitalize"} className="mt-2 text-3xl">
              <div className="text-slate-600 mt-2 text-3xl">
                <Text className="">{`${selected?.father}/${selected?.title}`}</Text>
              </div>
            </Heading>
          </Box>
        </div>

        <div className="flex justify-between w-100% relative">
          <button
            color={"white"}
            fontWeight={"400"}
            _hover={"green.500"}
            onClick={() => dispatch({ type: "CREATE", payload: {} })}
            className="p-2 mt-2 bg-verde rounded-lg text-white hover:bg-hover-verde"
          >
            Añadir registro
          </button>

          <div className=" absolute h-8  rounded-md px-2 flex items-center  border-gray-400 border-2  bottom-0 right-0 w-1/3 ">
            <SearchIcon />
            <GlobalFilter
              globalFilter={global}
              setGlobalFilter={seteador}
            />
          </div>
        </div>
      </div>


      <Flex w={"100%"} overflow={"hidden"}>
        <Box
          bg={"white"}
          rounded={"xl"}
          overflow={"auto"}
          mb={"4rem"}
          w={"100%"}
        >
          <Datatable
            setSeteador={setSeteador}
            columns={columns}
            data={data?.results?.filter((item) => item && item) ?? []}
            isLoading={isLoading}
            handleRemoveItem={handleRemoveItem}
            initialState={{
              hiddenColumns: selected?.hiddenColumns ?? {},
              sortBy: [
                {
                  id: "createdAt",
                  desc: true,
                },
              ],
            }}
            setAction={dispatch}
          />
        </Box>
      </Flex>
    </>
  );
};