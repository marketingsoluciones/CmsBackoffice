import { ForwardRefComponent } from "framer-motion";
import { useEffect, forwardRef, useRef, useState, FC, ReactNode } from "react";
import { useRowSelect, useTable } from "react-table";
/* import { EventContextProvider } from "../../context"; */
/* import { guests } from "../../utils/Interfaces"; */
import { DataTableGroupContextProvider } from "../../context/DataTableGroupContext";

interface guests {
  _id: string
  invitacion: boolean
  fecha_invitacion: string
  estatus: string
  nombre: string
  rol: string
  sexo: string
  grupo_edad: string
  correo: string
  telefono: string
  nombre_mesa: string
  puesto: string | number
  orden_puesto: string
  asistencia: string
  alergenos: string[]
  nombre_menu: string
  grupo_relacion: string
  movil: string
  direccion: string
  poblacion: string
  pais: string
}

// Para checkbox
export const IndeterminateCheckbox: ForwardRefComponent<HTMLInputElement, any> =
  forwardRef(({ indeterminate, checked, propParent, ...rest }, ref) => {
    const [ischecked, setChecked] = useState<boolean>(false);
    //@ts-ignore
    const ref1: any = ref;
    const ref2 = useRef<any>();

    const defaultRef = ref1 || ref2;

    useEffect(() => {
      if (checked !== ischecked) {
        setChecked(checked);
      } else {
        if (defaultRef?.current?.checked) {
          defaultRef.current.checked = ischecked;
        }
      }
    }, [checked, ischecked, defaultRef]);

    useEffect(() => {
      if (defaultRef?.current?.indeterminate) {
        defaultRef.current.indeterminate = indeterminate;
      }
    }, [defaultRef, indeterminate]);

    const handleCheck = (e: any) => {
      setChecked(e.target.checked);
      propParent.row.toggleRowSelected(!ischecked);
    };

    IndeterminateCheckbox.displayName = "IndeterminateCheckbox";

    return (
      <label className="relative">
        <input
          onClick={handleCheck}
          type="checkbox"
          className="rounded-full text-primary focus:ring-primary border-gray-400"
          ref={defaultRef}
          checked={ischecked}
          {...rest}
        />
      </label>
    );
  });

interface propsDataTableFinal {
  data: guests[];
  columns: any;
  children?: ReactNode;
}

const DataTableFinal: FC<propsDataTableFinal> = (props) => {
  const { children, data = [], columns = [] } = props;
  /* const { event } = EventContextProvider(); */

  // Uso de useTable para pasar data y cargar propiedades
  const tableInstance = useTable(
    { columns, data },
    useRowSelect,
    (hooks: any) => {
      hooks.visibleColumns.push((columns: any) => [
        {
          id: "selection",
          Header: (props: any) => {
            return false;
          },

          Cell: (props) => {
            const { row } = props;
            const { dispatch, dataTableGroup: { arrIDs, checkedAll } } = DataTableGroupContextProvider()

            useEffect(() => {
              checkedAll
                ? row.toggleRowSelected(true)
                : row.toggleRowSelected(false);
            }, [checkedAll]);

            useEffect(() => {
              const id = row?.original?._id;
              if (row.isSelected && !arrIDs.includes(id)) {
                dispatch({ type: "ADD_ROW_SELECTED", payload: id })
              }

              if (!row.isSelected && arrIDs.includes(id)) {
                dispatch({ type: "REMOVE_ROW_SELECTED", payload: id })
              }

            }, [row.isSelected, dispatch, arrIDs, row]);

            return (
              <div className="w-full flex justify-center items-center">
                <IndeterminateCheckbox
                  propParent={props}
                  {...row.getToggleRowSelectedProps()}
                />
              </div>
            );
          },
        },
        ...columns,
      ]);
    }
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    toggleHideColumn,
  } = tableInstance;

  const ColSpan = (id: string, headers: { id: string }[], columns: number = 12) => {

    const values = {
      selection: 5,
      nombre: 20,
      asistencia: 10,
      nombre_menu: 20,
      nombre_mesa: 5,
      delete: 5
    }

    type conteo = {
      base: number
      residuo: number
      totalCount: number
    }


    const { residuo, totalCount } = headers.reduce((acc: conteo, header) => {
      if (values[header.id]) {
        acc.base = acc.base + values[header.id]
        acc.totalCount = acc.totalCount + 1
      }
      acc.residuo = 100 - acc.base
      return acc
    }, { base: 0, residuo: 0, totalCount: 0 })

    if (residuo) {
      const sumar = residuo / totalCount
      const span = Math.round((values[id] + sumar) * columns / 100)
      return span
    }
  };



  return (
    // apply the table props
    <div className={`bg-transparent pb-4 mt-5 rounded-md w-full grid col-span-12`}>
      {children}
      <table
        {...getTableProps()}
        className="w-full text-sm text-left text-gray-500"
      >
        <thead className="relative text-xs text-gray-700 uppercase bg-gray-100 w-full">

          {
            headerGroups.map((headerGroup, i) => {
              return (
                <tr
                
                  key={i}
                  className="grid grid-cols-12"
                >
                  {
                    headerGroup.headers.map((column, i) => {
                      console.log(column)
                      return (
                        <th
                          
                          key={i}
                          className={`*px-6 py-3 text-center text-sm font-light font-display col-span-${ColSpan(column.id, headerGroup.headers, 11)}`}

                        >

                          {
                            // Render the header
                            column.render("Header")
                          }

                        </th>
                      )

                    })
                  }
                </tr>
              )
            })
          }
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows?.length == 0 && (
            <tr className="bg-white border-b font-display text-sm w-full grid grid-cols-12">
              <td className="pl-6 py-4 col-span-1 table-cell	">
              </td>
              <td className="py-4 w-max pl-5 text-gray-300">
                No hay Menú
              </td>
            </tr>
          )}
          {
            // Loop over the table rows
            rows.map((row, i) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr
                 /*  {...row.getRowProps()} */
                  key={i}
                  className="w-full bg-white border-b font-display text-sm grid grid-cols-12"
                >
                  {
                    // Loop over the rows cells
                    row.cells.map((cell, i) => {
                      return (
                        <td
                          key={i}
                          {...cell.getCellProps()}
                          className={`px-6 py-2 flex items-center col-span-${ColSpan(cell.column.id, row.cells.map(item => item.column), 11)}`}
                        >
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default DataTableFinal;
