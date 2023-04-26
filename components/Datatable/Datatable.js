import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import {
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
  Select,
  Flex,
  Text,
  IconButton,
  Tooltip,
  Divider,
  Button,
  Heading,
  Checkbox,
  FormLabel,
  Menu,
  MenuButton,
  MenuList,
  Link,
} from "@chakra-ui/react";
import { useTable, useSortBy, usePagination, useRowSelect, useFilters, useGlobalFilter, } from "react-table";
import { LoadingComponent } from "../../components/LoadingComponent";
import { IndeterminateCheckbox } from "../../components/Datatable/IndeterminateCheckbox";
import GlobalFilter from "../../components/Datatable/GlobalFilter";
import { useMemo, useState, useEffect } from "react";
import { ActionsCell } from "./ActionsCell";
import { useRouter } from "next/router";
import { ModalAlert, ModalMasivoAlert } from "../modals/Alert";



export const Datatable = ({ isLoading, initialState, columns, data = [], handleRemoveItem, setAction, setSeteador, ...props }) => {

  const { asPath } = useRouter()
  const [modal, setModal] = useState(false)
  const [modalMasivo, setModalMasivo] = useState(false)
  const [saveId, setSaveId] = useState("")

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
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
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
  );

  useEffect(() => {
    setSeteador(() => setGlobalFilter)
  }, [setGlobalFilter])

  return (
    <>

      {!isLoading ? (
        <>
          <Table {...getTableProps()} bg={"white"} >
            <Thead overflow={"auto"} >
              {headerGroups.map((headerGroup, idx) => (
                <Tr key={idx} {...headerGroup.getHeaderGroupProps()}  >
                  {headerGroup.headers.map((column, idx) => {
                    const propsNew = { ...column.getHeaderProps(column.getSortByToggleProps()), style: { cursor: 'pointer', fontSize: "12px" } }
                    return (
                      <Th
                        key={idx}
                        {...propsNew}
                      >
                        {column.render("Header")}
                        {/*  <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span> */}
                      </Th>
                    )
                  })}
                  <Th display={"flex"} justifyContent={"center"} justifyItems={"center"} >
                    {(() => {
                      if (selectedFlatRows.length > 0) {
                        return (
                          <>
                            {modalMasivo ? (
                              <ModalMasivoAlert setModalMasivo={setModalMasivo} modalMasivo={modalMasivo} handleRemoveItem={handleRemoveItem} onClickList={selectedFlatRows.map(item => item.original._id)} />
                            ) : null}

                            <Button
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
                            <Tooltip label={"Editar columnas"}>
                              <MenuButton className="mt-[-0.5rem] mb-[-0.5rem]">
                                <IconButton icon={<SettingsIcon />} />
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
                                <FormLabel
                                  paddingTop={"0.5rem"}
                                  display={"flex"}
                                  alignItems={"center"}
                                  gap={"0.5rem"}
                                  fontSize={"sm"}
                                >
                                  <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} />
                                  Seleccionar todos
                                </FormLabel>
                                {allColumns.map((column, idx) => (
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
                                      {...column.getToggleHiddenProps()}
                                    />
                                    {typeof column.Header === "string"
                                      ? column.Header
                                      : column.id}
                                  </FormLabel>
                                ))}
                              </Flex>
                            </MenuList>
                          </Menu>
                        </>)
                      }
                    })()}
                  </Th>
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()} overflow={"auto"}>
              {page.map((row, idx) => {
                prepareRow(row);



                return (
                  <Tr key={idx} fontSize={"sm"} {...row.getRowProps()} _hover={{ bg: "gray.100" }} className={`${row.isSelected && "bg-gray-100"}`}>
                    {row.cells.map((cell, idx) => {

                      return (
                        <>
                          <Td key={idx} className="cursor-pointer" {...cell.getCellProps()} paddingY="0.9rem" paddingInlineEnd={"1rem"} onClick={() => setAction(asPath !== "/questions" ? { type: "VIEWW", payload: { _id: row.original._id } } : { type: "EDIT", payload: { _id: row.original._id } })}>
                            <Text noOfLines={1} >
                              {cell.render("Cell")}
                            </Text>
                          </Td>
                        </>
                      );
                    })}
                    <Td
                      display={"flex"}
                      justifyContent={"center"}
                      justifyItems={"center"}
                      className="cursor-pointer mt-[-0.5rem] mb-[-0.5rem] 2xl:mt-[0rem] 2xl:mb-[0rem]"
                    >
                      {modal ? (
                        <ModalAlert id={saveId} handleRemoveItem={handleRemoveItem} setModal={setModal} modal={modal} />
                      ) : null}
                      <button onClick={() => [setModal(!modal), setSaveId(row.original._id)]} className="cursor-pointer mb-[-0.5rem] 2xl:mt-[0rem] 2xl:mb-[0rem]"  >
                        <IconButton size={"sm"} icon={<DeleteIcon />} />
                      </button>
                    </Td>
                  </Tr>

                );
              })}
            </Tbody>
          </Table>

          <Flex
            justifyContent={"space-between"}
            //alignItems={"center"}
            //paddingBlock={"0.5rem"}
            className="flex justify-center items-center my-1.5 px-4 "
          >
            <Flex alignItems={"center"} gap={"0.5rem"}>
              <Select
                size={"sm"}
                rounded={"lg"}
                w={"fit-content"}
                fontSize={"sm"}
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </Select>
              <Text color={"gray.500"} fontSize={"sm"} fontStyle={"italic"}>
                Entradas por pagina
              </Text>
            </Flex>
            <Flex alignItems={"center"} gap={"0.5rem"}>
              <Text fontSize={"sm"}>
                Pagina {pageIndex + 1} de {pageOptions.length}
              </Text>
              <IconButton
                size={"sm"}
                onClick={() => gotoPage(0)}
                isDisabled={!canPreviousPage}
                icon={<ArrowLeftIcon h={3} w={3} />}
              />
              <IconButton
                size={"sm"}
                onClick={previousPage}
                isDisabled={!canPreviousPage}
                icon={<ChevronLeftIcon h={6} w={6} />}
              />

              <IconButton
                size={"sm"}
                onClick={nextPage}
                isDisabled={!canNextPage}
                icon={<ChevronRightIcon h={6} w={6} />}
              />
              <IconButton
                size={"sm"}
                onClick={() => gotoPage(pageCount - 1)}
                isDisabled={!canNextPage}
                icon={<ArrowRightIcon h={3} w={3} />}
              />
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