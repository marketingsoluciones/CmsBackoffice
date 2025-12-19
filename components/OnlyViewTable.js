import { Box, Button, Flex, Heading, Text, IconButton } from "@chakra-ui/react";
import { columnsDataTable } from "./Datatable/Columns";
import { Datatable } from "./Datatable/Datatable";
import { useFetch } from "../hooks/useFetch";
import { useEffect, useMemo, useState, useCallback } from "react";
import { SearchIcon } from "./Icons/index"
import GlobalFilter from "./Datatable/GlobalFilter";
import { AuthContextProvider } from "../context/AuthContext";
import { useRouter } from "next/router";
import { hasRole } from "../utils/auth";
import { api } from "../utils/api";
import { visibleColumns } from "../utils/schemas";

// Función helper para obtener la configuración de la tabla
const getTableConfiguration = (ComponentControl, slug, user) => {
  // Verificar si ComponentControl tiene la información necesaria
  if (ComponentControl && ComponentControl.getData && ComponentControl.schema) {
    // Aplicar la misma lógica de hiddenColumns que se hace en columnsDataTable
    const newVisibleColumns = user?.visibleColumns?.reduce((acc, item) => {
      item?.show && acc.push(item.accessor)
      return acc
    }, [])
    const hiddenColumns = ComponentControl?.schema?.reduce((acc, item) => {
      !newVisibleColumns?.includes(item?.accessor) &&
        acc?.push(item?.accessor);
      return acc;
    }, []);
    
    return {
      ...ComponentControl,
      hiddenColumns
    };
  }
  
  // Fallback al schema si ComponentControl no tiene la información
  const result = columnsDataTable({ slug, user });
  return result || { schema: [], getData: null };
};

export const OnlyViewTable = ({ slug, setSlug, dispatch, setbuscador, ComponentControl }) => {
  const router = useRouter()
  const { development, user, domain, state } = AuthContextProvider()
  slug = router.asPath.slice(1)
  const [skip, setSkip] = useState(0)
  const [limit, setLimit] = useState(10)
  const [sortCriteria, setSortCriteria] = useState()
  const [sort, setSort] = useState()
  const [data, setData] = useState()
  const [isMounted, setIsMounted] = useState(false)
  const [dataRemove, isLoadingRemove, isErrorRemove, setQueryRemove] = useFetch(true);
  
  // Función helper para obtener la configuración: primero ComponentControl, luego schema
  const getTableConfig = useCallback(() => {
    return getTableConfiguration(ComponentControl, slug, user);
  }, [ComponentControl, slug, user]);
  
  // Inicializar selected con la configuración correcta
  const [selected, setSelected] = useState(() => {
    return getTableConfiguration(ComponentControl, slug, user);
  });
  const [global, setGlobal] = useState()
  const [seteador, setSeteador] = useState(() => () => { })

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

  const columns = useMemo(() => {
    // Asegurar que columns siempre sea un array
    if (!selected || !selected?.schema || !Array.isArray(selected.schema)) {
      return []
    }
    
    let avalibleShowColumns = visibleColumns.map(elem => {
      const item = user?.visibleColumns?.find(el => el.accessor === elem.accessor)
      return item ? item?.accessor : elem?.accessor
    })
    
    const result = selected.schema.reduce((acc, item) => {
      if (avalibleShowColumns?.includes(item?.accessor) && !item?.roles)
        acc.push(item)
      if (item?.roles && hasRole(development, user, item?.roles))
        acc.push(item)
      return acc
    }, [])
    
    return result || []
  }, [selected, user, development]);

  useEffect(() => {
    if ((isMounted && typeof state.data === "object") || (isMounted && router.asPath === state.data)) {
      console.log(1008, typeof state.data === "object", router.asPath, state.data)
      if (hasRole(development, user, selected.roles)) {
        const variables = { development: development, domain: development, skip, limit, sort: { [sortCriteria]: sort } }
        if (!user?.role.includes("admin", "editor")) {
          variables = { ...variables, authorUid: user?.uid, userUid: user?.uid, args: { author: user?.uid } }
        }
        setQuery({
          ...selected.getData,
          variables,
          type: "json",
          api: selected?.api
        });
      } else {
        setTimeout(() => {
          router.push("/")
        }, 100);
      }
    }
  }, [selected, isLoadingRemove, skip, limit, sortCriteria, sort]);

  useEffect(() => {
    const config = getTableConfig();
    setSelected(config);
  }, [slug, development, user, ComponentControl, getTableConfig]);

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
          < Datatable
            slug={slug}
            setSlug={setSlug}
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
            selected={selected}
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