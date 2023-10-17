import { useState } from "react";
import { getCurrency, useDelayUnmount } from "./Funciones";
import ClickAwayListener from "react-click-away-listener";
import { useEffect } from "react";
import {PlusCirculoIcon} from "../../Icons/index"

export const BlockListaCategorias = ({ categorias_array, set }) => {
    const [isMounted, setIsMounted] = useState([false, ""]);
    const shouldRenderChild = useDelayUnmount(isMounted[0], 500);
    const [categorias, setCategorias] = useState([]);
    /* const { event, setEvent } = EventContextProvider() */
    /* const [colorText, setColorText] = useState(event?.presupuesto_objeto?.coste_estimado == 0 ? "text-gray-300" : "text-gray-500"); */
   /*  const Presu = event?.presupuesto_objeto?.coste_estimado */
  
    useEffect(() => {
      setCategorias(categorias_array)
    }, [categorias_array])
  
    /* useEffect(() => {
      if (event?.presupuesto_objeto?.coste_estimado != 0) {
        setColorText("text-gray-500")
      }
    }, [event?.presupuesto_objeto?.coste_estimado]) */
  
    /* const Forms = {
      crear: <FormCrearCategoria
        state={isMounted}
        set={(accion) => setIsMounted(accion)}
      />,
      editar: <FormEditarCategoria
        categoria={isMounted[2]}
        state={isMounted}
        set={(accion) => setIsMounted(accion)}
      />,
  
    } */
  
    return (
      <>
        {/* {shouldRenderChild && (
          <ModalLeft state={isMounted[0]} set={(accion) => setIsMounted(accion)}>
            {Forms[isMounted[1]]}
          </ModalLeft>
        )} */}
        <div className="bg-white w-full shadow-md rounded-xl h-max ">
          <button
            onClick={() => setIsMounted([true, "crear"])}
            className="focus:outline-none bg-rosa  rounded-xl font-display font-light text-md flex gap-2 w-full transform py-1 items-center justify-center text-white hover:scale-105 transition transform"
          >
            <PlusCirculoIcon className="text-white w-4 h-4" />
            Nueva Categoria
          </button>
          <ul className={`w-full flex flex-col font-display text-sm h-44 overflow-y-auto md:h-max divide-y`} /* ${colorText} ${Presu == 0 ? "cursor-not-allowed*" : "cursor-pointer"}`} */>
            {categorias?.map((item, idx) => (
              <ItemCategoria key={idx} item={item} setVisible={act => set(act)}
                set={(accion) => setIsMounted(accion)} />
            ))}
          </ul>
        </div>
        <style jsx>
          {`
          div {
            height: max-content
          }
          `}
        </style>
      </>
    );
  };

  const ItemCategoria = ({ item, setVisible, set }) => {
    /* const { event, setEvent, currencyState } = EventContextProvider() */
    const [show, setShow] = useState(false);
    /* const toast = useToast() */
   /*  const Presu = event?.presupuesto_objeto?.coste_estimado */
  
  
    const BorrarCategoria = async () => {
      /* setShow(!show)
      const params = {
        query: `mutation{
            borraCategoria(evento_id:"${event?._id}",
            categoria_id: "${item?._id}"){
              coste_final
            }
          }
          `,
        variables: {},
      };
      try {
        await api.ApiApp(params)
      } catch (error) {
        console.log(error)
      } finally {
        setEvent(old => {
          old.presupuesto_objeto.categorias_array = old?.presupuesto_objeto?.categorias_array?.filter(elemento => elemento._id !== item._id)
          return { ...old }
        })
      } */
    }
  
    const EditarCategoria = () => {
      /* setShow(!show)
      set([true, "editar", item]) */
    }
  
    const DefinirCoste = (item) => {
      /* if (item.coste_final >= item.coste_estimado) {
        return item.coste_final
      } else {
        return item.coste_estimado
      } */
    }
  
    const Lista = [
      { title: "Editar", function: EditarCategoria },
      { title: "Borrar", function: BorrarCategoria }
    ];
  
    return (
      <li /* onClick={() => Presu != 0 ? setVisible({ isVisible: true, id: item._id }) : toast("error", "Agrega un monto a tu Presupuesto Estimado ")} */ className={`w-full justify-between items-center flex   px-5  transition` /* ${Presu == 0 ? "" : "hover:bg-base"}` */}>
        <span
          className="gap-2 py-3 flex items-center capitalize"
        >
          {item?.icon}
          {item?.nombre?.toLowerCase()}
        </span>
        <span className="gap-4 flex items-center py-3 md:py-0" >
          <div >
            {getCurrency(DefinirCoste(item), /* currencyState */ "EUR")}
          </div>
          <div className="relative ">
            {/* <DotsOpcionesIcon
              onClick={() => Presu != 0 ? setShow(!show) : null}
              className={`w-3 h-3 ${Presu != 0 ? "cursor-pointer" : ""} `}
            /> */}
            {show && (
              <ClickAwayListener onClickAway={() => show && setShow(false)}>
                <ul className="w-max z-20 bg-white shadow-md rounded absolute top-0 right-0 font-display text-sm divide-y ">
                  {Lista.map((item, idx) => (
                    <li
                      key={idx}
                      /* onClick={() => item.function()} */
                      className="px-2 py-1 hover:bg-base transition "
                    >
                      {item.title}
                    </li>
                  ))}
                </ul>
              </ClickAwayListener>
            )}
          </div>
        </span>
      </li>
    );
  };