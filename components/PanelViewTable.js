import { Box, Button, Flex, Heading, Text, IconButton } from "@chakra-ui/react";
import { columnsDataTable } from "../components/Datatable/Columns";
import { Datatable } from "../components/Datatable/Datatable";
import { useFetch } from "../hooks/useFetch";
import { useEffect, useMemo, useState } from "react";
import { SearchIcon } from "../components/Icons/index"
import GlobalFilter from "./Datatable/GlobalFilter";
import { AuthContextProvider } from "../context/AuthContext";
import { useRouter } from "next/router";
import { hasRole } from "../utils/auth";

export const PanelViewTable = ({ slug, dispatch }) => {

  //const [pageSize, setPageSize] = useState(10)
  const [skip, setSkip] = useState(0)
  const [limit, setLimit] = useState(10)
  const [sortCriteria, setSortCriteria] = useState()
  const [sort, setSort] = useState()
  const [data, setData] = useState()
  const [isMounted, setIsMounted] = useState(false)
  const [validationData, setValidationData] = useState(true)
  const router = useRouter()
  const [data_, isLoading, isError, setQuery] = useFetch();

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true)
    }
  }, [])

  useEffect(() => {
    if (data_?.results?.length) {

      /* setValidationData(true) */
      const results = data_?.results.map(item => {
        return { ...item, imgMiniatura: item?.imgMiniatura?.i320 }
      })
      setData({ total: data_.total, results })
    } else {

      /* router.push(`${selected?.resumenRout}`) */
    }
  }, [data_])


  const [dataRemove, isLoadingRemove, isErrorRemove, setQueryRemove] = useFetch(true);
  const { development, user, domain } = AuthContextProvider()
  const [selected, setSelected] = useState(columnsDataTable({ slug, user }));
  const [global, setGlobal] = useState()
  const [seteador, setSeteador] = useState(() => () => { })

  const columns = useMemo(() => {
    const avalibleShowColumns = user?.visibleColumns?.map(elem => elem.accessor) //selected?.visibleColumns?.map(elem => elem.accessor)
    return selected?.schema?.reduce((acc, item) => {
      if (avalibleShowColumns?.includes(item?.accessor) && !item?.roles)
        acc.push(item)
      if (item?.roles && hasRole(development, user, item?.roles))
        acc.push(item)
      return acc
    }, [])
  }, [selected]);
  useEffect(() => {
    if (isMounted) {
      if (hasRole(development, user, selected.roles)) {
        const variables = { development: development, domain: "diariocivitas", skip, limit, sort: { [sortCriteria]: sort } }
        if (!user?.role.includes("admin", "editor")) {
          variables = { ...variables, authorUid: user?.uid, userUid: user?.uid }
        }
        setQuery({
          ...selected.getData,
          variables,
          type: "json"
        });
      } else {
        setTimeout(() => {
          router.push("/")
        }, 100);
      }
    }
  }, [selected, isLoadingRemove, skip, limit, sortCriteria, sort]);

  useEffect(() => {
    dispatch({ type: "VIEW", payload: {} });
    setSelected(columnsDataTable({ slug, user }));
  }, [slug, development]);

  /* useEffect(() => {
   if (data_?.results?.length > 0) {
     setValidationData(true)
   } else {
     router.push(`${selected?.altRoute}`)
   }

 }, [data_]) */

  const handleRemoveItem = (idSelected) => {
    setQueryRemove({
      ...selected.deleteEntry,
      variables: { id: idSelected },
      type: "json",
    });
  };


  return (
    <>
      {validationData &&
        <>

          <div className="w-full space-y-2">
            <div className=" flex justify-between w-100%">
              <Box>
                <Heading textTransform={"capitalize"} className="mt-2 text-3xl">
                  <div className="text-slate-600 mt-2 text-3xl">
                    <Text className=" text-rosa font-normal">{/* ${selected?.father}/ */}{`${selected?.title}`}</Text>
                  </div>
                </Heading>
              </Box>
            </div>

            {
              selected?.subTitle && <div className="my-2">
                <p className="text-sm bg-white p-2 rounded-lg text-gray-500">{selected?.subTitle}</p>
              </div>
            }

            <div className="flex justify-between items-center w-100% relative">
              <button
                color={"white"}
                fontWeight={"400"}
                _hover={"green.500"}
                onClick={() => dispatch({ type: "CREATE", payload: {} })}
                className="p-2 *mt-2 bg-rosa rounded-lg text-white *hover:bg-hover-verde text-base"
                type="button"
              >
                Añadir registro
              </button>
              <div className=" w-[44%]">
                {/* <button onClick={() => router.push(`${selected?.resumenRout}`)} type="button" className="border border-rosa px-3 rounded-lg text-rosa text-base hidden md:block">
                  ver resumen
                </button> */}
                <div className=" absolute h-8  rounded-md px-2 flex items-center  border-gray-400 border-2  bottom-0.5 right-0 w-1/3 ">
                  <SearchIcon />
                  <GlobalFilter
                    globalFilter={global}
                    setGlobalFilter={seteador}
                  />
                </div>
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
              my={"0.5rem"}
              mx={"1.5rem"}
            >
              <Datatable
                skip={skip}
                setSkip={setSkip}
                limit={limit}
                setLimit={setLimit}
                sortCriteria={sortCriteria}
                setSortCriteria={setSortCriteria}
                sort={sort}
                setSort={setSort}
                setSeteador={setSeteador}
                columns={columns}
                data={data?.results?.filter((item) => item && item) ?? []}
                total={data?.total}
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
      }
    </>

  );
};

export const OnlyViewTable = ({ slug, dispatch, setbuscador }) => {
  const [skip, setSkip] = useState(0)
  const [limit, setLimit] = useState(10)
  const [sortCriteria, setSortCriteria] = useState()
  const [sort, setSort] = useState()
  const [data, setData] = useState()
  const [isMounted, setIsMounted] = useState(false)

  const [data_, isLoading, isError, setQuery] = useFetch();

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true)
    }
  }, [])

  useEffect(() => {
    if (data_?.results?.length) {
      const results = data_?.results.map(item => {
        return { ...item, imgMiniatura: item?.imgMiniatura?.i320 }
      })
      setData({ total: data_.total, results })
    }
  }, [data_])


  const [dataRemove, isLoadingRemove, isErrorRemove, setQueryRemove] = useFetch(true);
  const { development, user, domain } = AuthContextProvider()
  const [selected, setSelected] = useState(columnsDataTable({ slug, user }));
  const [global, setGlobal] = useState()
  const [seteador, setSeteador] = useState(() => () => { })
  const router = useRouter()

  const columns = useMemo(() => {
    const avalibleShowColumns = user?.visibleColumns?.map(elem => elem.accessor) //selected?.visibleColumns?.map(elem => elem.accessor)
    return selected?.schema?.reduce((acc, item) => {
      if (avalibleShowColumns?.includes(item?.accessor) && !item?.roles)
        acc.push(item)
      if (item?.roles && hasRole(development, user, item?.roles))
        acc.push(item)
      return acc
    }, [])
  }, [selected]);

  useEffect(() => {
    if (isMounted) {
      if (hasRole(development, user, selected.roles)) {
        const variables = { development: development, domain: "diariocivitas", skip, limit, sort: { [sortCriteria]: sort } }
        if (!user?.role.includes("admin", "editor")) {
          variables = { ...variables, authorUid: user?.uid, userUid: user?.uid, args: { author: user?.uid } }
        }
        setQuery({
          ...selected.getData,
          variables,
          type: "json"
        });
      } else {
        setTimeout(() => {
          router.push("/")
        }, 100);
      }
    }
  }, [selected, isLoadingRemove, skip, limit, sortCriteria, sort]);

  useEffect(() => {
    dispatch({ type: "VIEW", payload: {} });
    setSelected(columnsDataTable({ slug, user }));
  }, [slug, development]);

  const handleRemoveItem = (idSelected) => {
    setQueryRemove({
      ...selected.deleteEntry,
      variables: { id: idSelected },
      type: "json",
    });
  };

  return (
    <>
      <Flex w={"100%"} overflow={"hidden"}>
        <Box
          bg={"white"}
          rounded={"xl"}
          overflow={"auto"}
          mb={"4rem"}
          w={"100%"}
          m={"0.5rem"}
        >
          <Datatable
            skip={skip}
            setSkip={setSkip}
            limit={limit}
            setLimit={setLimit}
            sortCriteria={sortCriteria}
            setSortCriteria={setSortCriteria}
            sort={sort}
            setSort={setSort}
            setSeteador={setbuscador}
            columns={columns}
            data={data?.results?.filter((item) => item && item) ?? []}
            total={data?.total}
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
  )
}