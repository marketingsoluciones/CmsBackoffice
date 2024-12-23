import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, CloseIcon, DeleteIcon, SettingsIcon } from "@chakra-ui/icons";
import { Table, Tbody, Th, Thead, Tr, Td, Select, Flex, Text, IconButton, Tooltip, Divider, Button, Heading, Checkbox, FormLabel, Menu, MenuButton, MenuList, Switch, Image, Center, Box } from "@chakra-ui/react";
import { useTable, usePagination, useRowSelect, useFilters, useGlobalFilter, } from "react-table";
import { LoadingComponent } from "../../components/LoadingComponent";
import { IndeterminateCheckbox } from "../../components/Datatable/IndeterminateCheckbox";
import GlobalFilter from "../../components/Datatable/GlobalFilter";
import { useMemo, useState, useEffect, useRef } from "react";
import { ActionsCell } from "./ActionsCell";
import { useRouter } from "next/router";
import { ModalAlert, ModalMasivoAlert } from "../modals/Alert";
import { set } from "react-hook-form";
import { fetchApi, queries } from "../../utils/Fetching";
import { AuthContextProvider } from "../../context/AuthContext";



export const Datatable = ({ isLoading, initialState, columns, data = [], total, handleRemoveItem, setAction, setSeteador, skip, setSkip, limit, setLimit, setSortCriteria, setSort, slug, setSlug, selected, ...props }) => {
  console.log(10087, selected)
  const { user, setUser, config } = AuthContextProvider()
  const [modal, setModal] = useState(false)
  const [modalMasivo, setModalMasivo] = useState(false)
  const [saveId, setSaveId] = useState("")
  const [showTableRootMain, setShowTableRootMain] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true)
    }
    return () => {
      if (isMounted) {
        document.getElementById(`child-${slug}`)?.remove()
        setIsMounted(false)
      }
    }
  }, [isMounted])

  const totalPage = Math.trunc(total / limit) + 1

  const filterTypes = useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds, globalFilter },
    allColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    getToggleHideAllColumnsProps,
  } = useTable(
    {
      columns,
      data,
      initialState,
      setAction,
      handleRemoveItem,
      filterTypes,
      ...props,
    },
    useFilters,
    useGlobalFilter,
    //useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      if (selected?.deleteEntry) {
        !["links"].includes(slug) && hooks.visibleColumns.push((columns) => [
          // Let's make a column for selection
          {
            id: "selection",
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllPageRowsSelectedProps, column, ...rest }) => {
              return (
                <Tooltip label={"Seleccionar todos"}>
                  <div>
                    <IndeterminateCheckbox
                      {...getToggleAllPageRowsSelectedProps()}
                    />
                  </div>
                </Tooltip>
              );
            },
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
      }
    }
  );

  const handleChecked = (column) => {

    fetchApi({
      query: queries.updateVisibleColumns,
      variables: {
        uid: user?.uid, args: {
          accessor: column?.id,
          show: !column.isVisible
        }
      },
      development: config?.name
    }).then((resp) => {
      setUser((old) => {

        const idx = old.visibleColumns.findIndex((elem) => elem.accessor === column.id);
        old.visibleColumns[idx] = {
          accessor: column?.id,
          show: !!column.isVisible
        }
        return { ...old }
      })
    })
  }

  useEffect(() => {
    setSeteador(() => setGlobalFilter)
  }, [setGlobalFilter])

  useEffect(() => {
    if (isMounted) {
      const rootElement = document.getElementById("rootElementMain")
      const child = document.getElementById(`child-${slug}`)
      if (rootElement && child) {
        rootElement?.appendChild(child)
      }
    }
  }, [isMounted])

  return (
    <>
      <div id={`child-${slug}`}>
        {showTableRootMain && <div className={`w-full h-full z-50 top-0 left-0 absolute`}>
          <div className="bg-black w-full h-full absolute opacity-70" />
          <div onClick={() => setShowTableRootMain(false)} className="w-10 h-10 rounded-full bg-slate-200 hover:bg-zinc-300 cursor-pointer top-4 right-4 absolute flex items-center justify-center" >
            <CloseIcon className="text-black w-5 h-5" />
          </div>
        </div>}
      </div>
      {!isLoading ? (
        <>
          <Box w={"100%"} overflowX={"auto"} >
            <Table {...getTableProps()} bg={"white"} size="">
              <Thead overflow={"auto"} >
                {headerGroups.map((headerGroup, idx) => {
                  return (
                    <Tr key={idx} {...headerGroup.getHeaderGroupProps()} boxSize={"12"} >
                      {headerGroup.headers.map((column, idx) => {
                        const propsNew = { ...column.getHeaderProps(/*column.getSortByToggleProps()*/), style: { cursor: 'pointer', fontSize: "14px" } }
                        return (
                          <Th
                            key={idx}
                            {...propsNew}
                            onClick={
                              column.id === "selection" ? () => { }
                                : () => {
                                  setSortCriteria((old) => {
                                    if (old !== column.id) {
                                      setSort(1)
                                      return column.id
                                    }
                                    setSort(old => old === 1 ? -1 : 1)
                                    return old
                                  })
                                  setSkip(0)
                                }
                            }
                          >
                            <Center fontSize={{ base: "10px", "2xl": "12px" }} >
                              {column.render("Header")}
                              {/*  <span>
                        {column.isSorted
                          ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                          : ""}
                        </span> */}
                            </Center>
                          </Th>
                        )
                      })}
                      <Th >
                        {(() => {
                          if (selectedFlatRows.length > 0) {
                            return (
                              <>
                                {modalMasivo ? (
                                  <ModalMasivoAlert setModalMasivo={setModalMasivo} modalMasivo={modalMasivo} handleRemoveItem={handleRemoveItem} onClickList={selectedFlatRows.map(item => item.original._id)} />
                                ) : null}

                                <Button
                                  className="mt-[-0.5rem] mb-[-0.5rem]"
                                  transition={"all"}
                                  bg={"red.400"}
                                  color={"white"}
                                  _hover={{ bg: "red.500" }}
                                  onClick={() => {
                                    setModalMasivo(!modalMasivo)
                                  }}
                                >
                                  <Text
                                    display={"flex"}
                                    gap={"2px"}
                                    alignItems={"center"}
                                    justifyItems={"center"}
                                    w={"1.5px"}
                                    fontSize={"sm"}
                                    justifyContent={"center"}
                                    fontWeight={"medium"}
                                  >
                                    <DeleteIcon />
                                    {selectedFlatRows.length}
                                  </Text>
                                </Button>
                              </>
                            )

                          } else {
                            return (<>
                              <Menu>
                                <Tooltip label={"Edit. columnas"}>
                                  <MenuButton className="mt-[-0.5rem] mb-[-0.5rem] p-2 w-8 h-8">
                                    <SettingsIcon w={""} h={""} />
                                  </MenuButton>
                                </Tooltip>
                                <MenuList
                                  h={"15rem"}
                                  overflow={"auto"}
                                  bg={"white"}
                                  p={"1rem"}
                                  rounded={"lg"}
                                  shadow={"md"}
                                >
                                  <Flex flexDir={"column"}>
                                    <Heading as={"p"} fontSize={"sm"}>
                                      Campos mostrados
                                    </Heading>
                                    <Divider paddingBlock={"0.3rem"} />
                                    {/* <FormLabel
                                  paddingTop={"0.5rem"}
                                  display={"flex"}
                                  alignItems={"center"}
                                  gap={"0.5rem"}
                                  fontSize={"sm"}
                                >
                                  <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} />
                                  Seleccionar todos
                                </FormLabel> */}
                                    {allColumns?.slice(1).map((column, idx) => {
                                      return (
                                        <FormLabel
                                          key={idx}
                                          display={"flex"}

                                          alignItems={"center"}
                                          gap={"0.5rem"}
                                          fontSize={"sm"}
                                        >
                                          <Checkbox
                                            type={"checkbox"}
                                            isChecked={column.getToggleHiddenProps().checked}
                                            onChange={(e) => {
                                              column.toggleHidden(!e.target.checked);
                                              handleChecked(column)
                                            }}

                                          />
                                          {typeof column.Header === "string"
                                            ? column.Header
                                            : column.id}
                                        </FormLabel>
                                      )
                                    })}
                                  </Flex>
                                </MenuList>
                              </Menu>
                            </>)
                          }
                        })()}
                      </Th>
                    </Tr>
                  )
                })}
              </Thead>
              <Tbody {...getTableBodyProps()} overflow={"auto"}>
                {page.map((row, idx) => {
                  prepareRow(row);
                  return (
                    <Tr key={idx} fontSize={"sm"} {...row.getRowProps()} _hover={{ bg: "gray.100" }} className={`${row.isSelected && "bg-gray-100"}`} boxSize={{ base: "44px", md: "36px", "2xl": "60px" }}>
                      {row.cells.map((cell, i) => {
                        return (
                          <Td
                            key={i} className=""
                            {...cell.getCellProps()}
                            w={cell.column.id === "selection" && "16"}
                            onClick={() => {
                              if (slug === "links") {
                                setShowTableRootMain(true)
                                return
                              }
                              ["title", "businessName", "_id"].includes(cell.column.id) &&
                                setAction({ type: selected?.updateEntry ? "EDIT" : "VIEW_DATAILS", payload: { _id: row.original._id } })
                            }}>
                            {
                              cell.column.id === "imgMiniatura" ?
                                <Center >
                                  <Box w={{ base: "100px", md: "120px", "2xl": "150px" }} >
                                    <Center>
                                      <Image
                                        src={`${cell?.value ? `${process.env.NEXT_PUBLIC_BASE_URL}${cell?.value}` : "/placeholder/image.png"}`}
                                        objectFit={"contain"}
                                        w={{ base: "80px", md: "50px", "2xl": "76px" }}
                                        h={{ base: "34px", md: "30px", "2xl": "60px" }}
                                        rounded={"lg"}
                                      />
                                    </Center>
                                  </Box>
                                </Center>
                                :
                                cell.column.id === "status" ?
                                  <Center>
                                    <div className="z-10 w-8 h-6 transform translate-x-4"></div>
                                    <Switch size={"sm"} isChecked={cell?.value} isReadOnly={true} isFocusable={true} className=" transform translate-x-[-13px]" />
                                  </Center>
                                  :
                                  cell.column.id === "title" || cell.column.id === "businessName" ?
                                    <ComponentCursorPointer cell={cell} setAction={setAction} row={row} />
                                    : ["slug", "socialMedia", "link"].includes(cell.column.id) ?
                                      <Text noOfLines={1}  >
                                        {cell.render("Cell")}
                                      </Text>
                                      : cell.column.id === "_id" ?
                                        <ComponentCursorPointer cell={cell} setAction={setAction} row={row} />
                                        :
                                        <Center>
                                          {cell.render("Cell")}
                                        </Center>
                            }
                          </Td>
                        );
                      })}
                      {/*PAPELERA*/
                        selected?.deleteEntry &&
                        <Td
                          className="mt-[-0.5rem] mb-[-0.5rem] 2xl:mt-[0rem] 2xl:mb-[0rem]"
                          w={"16"}
                        >
                          {modal ? (
                            <ModalAlert id={saveId} handleRemoveItem={handleRemoveItem} setModal={setModal} modal={modal} />
                          ) : null}
                          {!["links"].includes(slug) && <Center onClick={() => [setModal(!modal), setSaveId(row.original._id)]} className="cursor-pointer" >
                            <IconButton size={`${screen.width < 640 ? "xs" : "sm"}`} icon={<DeleteIcon />} />
                          </Center>}
                        </Td>
                      }
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Box>

          <Flex
            justifyContent={"space-between"}
            //alignItems={"center"}
            //paddingBlock={"0.5rem"}
            px={{ base: "1", md: "4" }}
            className="flex justify-center items-start my-1.5"
          >

            <Flex direction={{ base: "column", md: "row" }} w={"30%"} alignItems={{ base: "", md: "center" }} justifyContent={"left"} gap={"0.5rem"} >
              <Select
                size={`${screen.width < 640 ? "xs" : "sm"}`}
                rounded={{ base: "md", md: "lg" }}
                w={"fit-content"}
                fontSize={{ base: "xs", md: "sm" }}
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setLimit(Number(e.target.value))
                  setSkip(0)
                }}
              >
                {[5, 10, 20, 30, 40, 50].map((pageSize, idx) => (
                  <option key={idx} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </Select>
              {screen.width < 640 ?
                <></>
                : <Text color={"gray.500"} fontSize={{ base: "xs", md: "sm" }} fontStyle={"italic"}>
                  Entradas por página
                </Text>
              }

            </Flex>

            <Flex direction={{ base: "column", md: "row" }} w={"30%"} columns={1} justifyContent={"center"} mt={"1"}>
              <Text textAlign={"center"} color={"gray.500"} fontSize={{ base: "xs", md: "sm" }} fontStyle={"italic"}>
                Total de Entradas
              </Text>
              <Text ml={{ base: "0", md: "0.5rem" }} textAlign={"center"} color={"gray.500"} fontSize={"sm"} fontStyle={"italic"}>
                {total ? total : 0}
              </Text>
            </Flex >

            <Flex direction={{ base: "column-reverse", md: "row" }} w={"35%"} alignItems={{ base: "", md: "center" }} justifyContent={"right"} gap={{ base: "0", md: "0.5rem" }} isTruncated>
              <Text fontSize={{ base: "xs", md: "sm" }} textAlign={"right"} mr={"1"}>
                {totalPage ? `Página ${(skip + limit) / limit} de ${totalPage}` : <></>}
              </Text>
              <Flex gap={"1"} justifyContent={"space-between"}>
                <IconButton
                  size="xs"
                  fontSize={"8px"}
                  onClick={() => setSkip(0)}
                  isDisabled={!((skip + limit) / limit > 1)}
                  icon={<ArrowLeftIcon />}
                />
                <IconButton
                  size="xs"
                  fontSize={"18px"}
                  onClick={() => setSkip(old => old - limit)}
                  isDisabled={!((skip + limit) / limit > 1)}
                  icon={<ChevronLeftIcon />}
                />

                <IconButton
                  size="xs"
                  fontSize={"18px"}
                  onClick={() => setSkip(old => old + limit)}
                  isDisabled={!((skip + limit) / limit < totalPage)}
                  icon={<ChevronRightIcon />}
                />
                <IconButton
                  size="xs"
                  fontSize={"8px"}
                  onClick={() => setSkip((totalPage - 1) * limit)}
                  isDisabled={!((skip + limit) / limit < totalPage)}
                  icon={<ArrowRightIcon />}
                />
              </Flex>
            </Flex>
          </Flex>
        </>
      ) : (
        <LoadingComponent />
      )
      }
    </>
  );
};

const ComponentCursorPointer = ({ cell, setAction, row }) => {
  const { asPath } = useRouter()
  const tdRef = useRef()
  useEffect(() => {
    tdRef?.current?.parentElement?.classList?.add("cursor-pointer")
  }, [tdRef])
  return (
    <Text
      ref={tdRef}
      noOfLines={1}>
      {cell.render("Cell")}
    </Text>
  )
}