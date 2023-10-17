import { useEffect, useRef, useState, FC, Dispatch, SetStateAction, cloneElement } from "react";
//import ClickAwayListener from "react-click-away-listener";
import { useRouter } from "next/router";
/* import { EventContextProvider } from "../../context"; */
//import { api } from "../../api";
import DataTableFinal from "./DataTable";
//import { BorrarInvitado } from "../../hooks/EditarInvitado";
//import { CanceladoIcon, ConfirmadosIcon, DotsOpcionesIcon, PendienteIcon, } from "../icons";
import { DataTableGroupContextProvider, DataTableGroupProvider, } from "../../context/DataTableGroupContext";
//import { fetchApiEventos, queries } from "../../utils/Fetching";
import { useToast } from "@chakra-ui/react";

interface propsDatatableGroup {
  GruposArray: string[];
  setSelected: Dispatch<SetStateAction<string>>;
  isMounted: boolean;
  setIsMounted: Dispatch<SetStateAction<boolean>>;
  menu?: any[]
  setGetMenu?: any
}

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


const DatatableGroup: FC<propsDatatableGroup> = ({ setSelected, isMounted, setIsMounted, menu = [] }) => {
  /* const { event, setEvent, invitadoCero, setInvitadoCero } = EventContextProvider(); */
  /* const [datas, setDatas] = useState<{ titulo: string; data: guests[] }[]>([]); */
  const datas = [
    {
      titulo: "Coctel de Bienvenida",
      data: []
    },
    {
      titulo: "carta de Vinos ",
      data: []
    },
    {
      titulo: "carta de cerveza",
      data: []
    },
    {
      titulo: "listado de aperitivos ",
      data: []
    },
    {
      titulo: "listado de entradas",
      data: []
    },
    {
      titulo: "listado de postres ",
      data: []
    },
  ]

  console.log("data de la tabla",datas)


  /* useEffect(() => {
    setInvitadoCero(event?.invitados_array?.filter(elem => elem.rol === event?.grupos_array[0])[0]?.nombre)
  }, [event?.invitados_array, event?.grupos_array]) */

  /*   useEffect(() => {
  
      const Datas = event?.grupos_array.reduce((acc, group) => {
        acc[group] = { titulo: group, data: [] };
        event.invitados_array.forEach(guest => {
          if (event.grupos_array.includes(guest.rol)) {
            if (guest.rol === group) {
              acc[group] = {
                titulo: group,
                data: acc[group]?.data
                  ? [...acc[group]?.data, guest]
                  : [guest],
              };
            }
          } else {
            acc["no asignado"] = {
              titulo: "no asignado",
              data: acc["no asignado"]?.data
                ? [...acc["no asignado"]?.data, guest]
                : [guest],
            };
          }
        })
        return acc
      }, {})
  
      const Data = event?.invitados_array.reduce((acc, invitado) => {
        event.grupos_array.forEach((group) => {
          acc[group] = { titulo: group, data: [] };
          if (event.grupos_array.includes(invitado.rol)) {
            if (invitado.rol === group) {
              acc[group] = {
                titulo: group,
                data: acc[group]?.data
                  ? [...acc[group]?.data, invitado]
                  : [invitado],
              };
            }
          }
        });
  
        if (!event.grupos_array.includes(invitado.rol)) {
          acc["no asignado"] = {
            titulo: "no asignado",
            data: acc["no asignado"]?.data
              ? [...acc["no asignado"]?.data, invitado]
              : [invitado],
          };
        }
        return acc;
      }, {});
  
      Datas && setDatas(Object.values(Datas));
    }, [event]); */

  // Funcion para Editar Invitado dropdown
  /* const updateMyData = ({
    rowID,
    columnID,
    reemplazar,
    value,
    loading,
    eventoID,
  }) => {
    try {
      // Para modificar el estado
      if (loading == true) {
        setEvent((viejo) => {
          const { invitados_array: arr } = viejo;

          const rowIndex = arr.findIndex((e) => e._id == rowID);

          const resultado = arr.map((invitado) => {
            if (invitado._id === rowID) {
              //Para escribir en base de datos
              fetchApiEventos({
                query: queries.editGuests,
                variables: {
                  eventID: event._id,
                  guestID: invitado._id,
                  variable: reemplazar,
                  value: value
                },
              });
              return {
                ...arr[rowIndex],
                [columnID]: value,
              };
            }
            return invitado;
          });
          return {
            ...viejo,
            invitados_array: resultado,
          };
        });
      }
    } catch (error) {
      console.log(error);
    }
  }; */

  //Definir Columnas
  const CrearColumna = (title) => {
    return [
      {
        Header: () => {
          return (
            <h3 className=" text-gray-500 text-left truncate capitalize font-medium">
             {title}
            </h3>
          );
        },
        accessor: "nombre", // accessor es la "key" en la data(invitados)
        id: "nombre",
        Cell: (props) => {
          /* const value = props?.cell?.value;
          const { sexo, _id: id } = props?.row?.original;
          const image = {
            hombre: {
              image: "/profile_men.png",
              alt: "Hombre",
            },
            mujer: {
              image: "profile_woman.png",
              alt: "Mujer",
            },
          };

          const handleClick = () => {
            setSelected(id);
            setIsMounted(!isMounted);
          };

          return (
            <div
              className="flex justify-start items-center truncate py-2 pr-3 cursor-pointer"
              onClick={handleClick}
            >
              <img
                className="block w-10 h-10 mr-2"
                src={image[sexo]?.image}
                alt={image[sexo]?.alt}
              />
              <p className="font-display text-sm capitalize overflow-ellipsis text-gray-700">
                {value}
              </p>
            </div>
          ); */
        },
      },
      {
        Header: "Alérgeno",
        accessor: "Alergeno",
        Cell: ({ value: initialValue, row, column: { id } }) => {
          /* const [value, setValue] = useState(initialValue ?? "No asignado");
          const [show, setShow] = useState(false);
          const [loading, setLoading] = useState(false);
          useEffect(() => {
            setLoading(false);
            updateMyData({
              rowID: row.original._id,
              columnID: id,
              reemplazar: "asistencia",
              value: value,
              loading: loading,
              eventoID: event._id,
            });
            setLoading(true);
          }, [value]);

          const Lista = [
            {
              title: "pendiente",
              icon: <PendienteIcon />,
            },
            {
              title: "confirmado",
              icon: <ConfirmadosIcon />,
            },
            {
              title: "cancelado",
              icon: <CanceladoIcon />,
            },
          ];
          const dicc = Lista.reduce((acc, el) => {
            acc[el.title] = { ...el };
            return acc;
          }, {}); */

          return (
            ""
           /*  <ClickAwayListener onClickAway={() => setShow(false)}>
              <div className="relative w-full items-center justify-center flex">
                <button
                  className="font-display text-gray-500 hover:text-gray-400 transition text-sm capitalize flex gap-2 items-center justify-center focus:outline-none"
                  onClick={() => setShow(!show)}
                >
                  {cloneElement(dicc[value].icon, { className: "w-5 h-5" })}
                  {value}
                </button>
                <ul
                  className={`${show ? "block opacity-100" : "hidden opacity-0"
                    } absolute bg-white transition shadow-lg rounded-lg overflow-hidden duration-500 -top-2 z-40`}
                >
                  {Lista.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="cursor-pointer flex gap-2 items-center py-4 px-6 font-display text-sm text-gray-500 hover:bg-base hover:text-gray-700 transition w-full capitalize"
                        onClick={() => {
                          setValue(item.title);
                          setShow(!show);
                        }}
                      >
                        {cloneElement(item.icon, { className: "w-5 h-5" })}
                        {item.title}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </ClickAwayListener> */
          );
        },
      },
    ];
  };

  return (
    <DataTableGroupProvider>
      <div className="w-[200%] md:w-[100%] ">
        <CheckBoxAll />

        {datas?.map((item, idx: number) => {
          return (
             <DataTableFinal
              key={idx}
              data={item.data}
              columns={CrearColumna(item.titulo)}
            /> 
          )
        })}
      </div>
    </DataTableGroupProvider>
  );
};

export default DatatableGroup;


const CheckBoxAll: FC<any> = ({ check, ...rest }) => {
  const {
    dataTableGroup: { arrIDs, checkedAll },
    dispatch,
  } = DataTableGroupContextProvider();
  //const { event, setEvent } = EventContextProvider();
  //const toast = useToast();
  const refCheckbox: any = useRef();

  const getToggleAllRowsSelectedProps = () => {
    /* const totalGuests: number = event?.invitados_array?.length;
    const guestsSelected: number = arrIDs?.length;
    return {
      checked: totalGuests > 0 && totalGuests === guestsSelected,
      indeterminate: guestsSelected > 0 && totalGuests !== guestsSelected,
    }; */
  };

  const handleChange = () => {
    dispatch({ type: "CHANGE_STATE_CHECKALL", payload: !checkedAll });
  };

  const eliminarTodo = async () => {
    /*  try {
       const { invitados_array }: any = await fetchApiEventos({
         query: queries.removeGuests,
         variables: {
           eventID: event._id,
           guests: arrIDs,
         },
       });
       setEvent((old) => ({
         ...old,
         invitados_array,
       }));
       dispatch({ type: "RESET_STATE" });
       // toast("success", "Invitado eliminado con exito"); 
     } catch (error) {
       console.log(error);
       //toast("error", "Ha ocurrido un error");
     } */
  };

  const OptionList = [{ texto: "Eliminar", icono: "", funcion: eliminarTodo }];

  /*   useEffect(() => {
      const { indeterminate } = getToggleAllRowsSelectedProps();
      if (refCheckbox?.current?.indeterminate) {
        refCheckbox.current.indeterminate = indeterminate;
      }
    }, [refCheckbox, arrIDs, getToggleAllRowsSelectedProps]); */

  return (
    <div className="h-8 w-full grid grid-cols-12 items-center">
      <label className="relative w-full grid place-items-center col-span-1">
        <input
          type="checkbox"
          className="rounded-full text-primary focus:ring-primary border-gray-400 cursor-pointer "
          ref={refCheckbox}
          //{...getToggleAllRowsSelectedProps()}
          onChange={handleChange}
          {...rest}
        />
      </label>
      {arrIDs.length === 0 ? (
        <div className="col-span-11">
          <p className="font-display text-sm md:text-sm text-gray-500 translate-x-[-8px] md:translate-x-[-16px]">
            Seleccionar todos
          </p>
        </div>
      ) : (
        <ul className="w-full h-full flex items-center col-span-11">
          {OptionList.map((item, idx) => (
            <li
              key={idx}
              className="cursor-pointer flex items-center gap-2 rounded-2xl border border-gray-300 px-4 hover:bg-gray-200 hover:text-white transition text-sm text-gray-500 font-display py-1 translate-x-[-8px] md:translate-x-[-16px]"
              onClick={item.funcion}
            >
              {item.icono}
              {item.texto}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
