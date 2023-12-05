import Image from "next/image";
import React, { FC, useState } from "react";
/* import { PencilEdit } from "../Icons/index"; */
import { capitalize } from '../../utils/Capitalize'
import { EventContextProvider } from "../../context/EventContext";
import { ModalLeft } from "../modals/ModalLeft";
import { useDelayUnmount } from "../WeddingPlannerComponents/PresupuestoComponents/Funciones";
import { FormCrearEvento } from "../EventosComponents/FormCrearEvento";
import { defaultImagenes } from "./CardComponent";

interface propsBlockVista {
  children?: React.ReactNode;
}


const BlockVista: FC<propsBlockVista> = ({ children }) => {
  const [state, setState] = useState(0)
  const { event } = EventContextProvider();

  const seatedGuests: number = event?.invitados_array?.filter(
    (item) => item?.nombre_mesa?.toLowerCase() !== "no asignado"
  )?.length;

  const newDate: Date = new Date(parseInt(event?.fecha));

  const options: object = { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" };
  let count: any

  if (event?.presupuesto_objeto?.coste_estimado) {
    if (event.invitados_array.length) {
      if (seatedGuests !== 0) {
        count = state + 3
        console.log("el state esta en: ", state + 3)
      } else {
        count = state + 2
        console.log("el state esta en: ", state + 2)
      }
    } else {
      count = state + 1
      console.log("el state esta en: ", state + 1)
    }
  } else {
    count = state + 0
    console.log("no haz iniciado los preparativos del evento")
  }

  return (
    <>
      <div className="w-full bg-white shadow rounded-xl overflow-hidden relative flex flex-col-reverse md:flex-row md:h-72 gap-12  md:gap-0 pt-6 md:pt-0">
        {event?.tipo && (
          <img
            src={defaultImagenes[event?.tipo]}
            className="md:w-1/2 md:h-full h-60 object-cover object-top rounded-xl"
            alt={event?.nombre}
          />
        )}

        {children}
        <div className="md:w-1/2 h-full flex flex-col items-center justify-center px-8 gap-6 relative">
          <div className="w-max mx-auto inset-x-0 text-center">

            <h1 className="font-display font-semibold text-3xl text-gray-500">
              {event?.nombre}
            </h1>
            <span className="font-display font-base text-sm flex gap-2 mx-auto w-max inset-x-0">
              <p className="text-gray-500">
                {/* @ts-ignore */}
                {newDate.toLocaleDateString("es-VE", options)}
              </p>
              -<p className="text-primary">{event?.tipo == "otro" ? "Mi Evento Especial" : event?.tipo && capitalize(event?.tipo)}</p>
            </span>
          </div>

          <div className="w-full">
            <span className="w-full justify-between flex">
              <p className="font-display text-xs text-gray-500">Estado</p>
              <p className="font-display text-xs text-gray-500">
                ¡A celebrar! ¿Empezamos?
              </p>
            </span>
            {/* <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              
              <svg className="bg-primary h-full" width={ count <= 1 ? "20%": "50%" || count > 2? "100%": "60%" }  />
            </div> */}
            <StateBar />
          </div>

          <div className="w-full justify-between flex">
            <div className="w-1/3 grid place-items-center">
              <p className="font-display text-lg font-base text-gray-500">
                {count} de 3
              </p>
              <p className="font-display text-center text-xs font-base text-gray-500">
                pasos para completar tu evento
              </p>
            </div>

            <div className="w-1/3 grid place-items-center">
              <p className="font-display text-lg font-base text-gray-500">
                {event?.invitados_array?.length}
              </p>
              <p className="font-display text-xs font-base text-gray-500 pb-4">
                invitado{event?.invitados_array?.length > 1 ? "s" : ""}
              </p>
            </div>

            <div className="w-1/3 grid place-items-center">
              <p className="font-display text-lg font-base text-gray-500">
                {seatedGuests} de {event?.invitados_array?.length}
              </p>
              <p className="font-display text-xs text-center font-base text-gray-500">
                invitados sentados en tu evento
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const BlockPrincipal = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const shouldRenderChild = useDelayUnmount(isMounted, 500);
  const { event } = EventContextProvider()

  const handleEdit = (): void => {
    setIsMounted(!isMounted);
  };
  return (
    <>
      {shouldRenderChild && (
        <ModalLeft set={setIsMounted} state={isMounted}>
          <FormCrearEvento set={setIsMounted} state={isMounted}/*  EditEvent={true} */ />
        </ModalLeft>
      )}
      <BlockVista >
        <span
          className="absolute top-5 right-5 transition transform hover:scale-105 hover:rotate-12 cursor-pointer z-30"
          onClick={handleEdit}
        >
          {/* <PencilEdit className="w-5 h-5 text-primary" /> */}
        </span>
      </BlockVista>
    </>
  );
};
export default BlockPrincipal;

const BlockEditar = ({ set, state }) => {
  return (
    <div className="w-full bg-white shadow rounded-xl overflow-hidden relative flex flex-col-reverse md:flex-row md:h-72 gap-12 md:gap-0 p-8">
      <div className="col-span-2 border-l-2 border-gray-100 pl-3 h-20 w-full ">
        <h2 className="font-display text-3xl capitalize text-primary font-light flex-col flex">
          Editar{" "}
          <span className="font-display text-5xl capitalize text-gray-500 font-medium">
            Evento
          </span>
        </h2>
        <button className="button-primary" onClick={set(!state)}>Cancelar</button>
      </div>
    </div>
  );
};

export const StateBar = () => {
  const [state, setState] = useState(0)
  const { event } = EventContextProvider();
  const seatedGuests: number = event?.invitados_array?.filter(
    (item) => item?.nombre_mesa?.toLowerCase() !== "no asignado"
  )?.length;
  let count: any

  if (event?.presupuesto_objeto?.coste_estimado) {
    if (event.invitados_array.length) {
      if (seatedGuests !== 0) {
        count = state + 3
        console.log("el state esta en: ", state + 3)
      } else {
        count = state + 2
        console.log("el state esta en: ", state + 2)
      }
    } else {
      count = state + 1
      console.log("el state esta en: ", state + 1)
    }
  } else {
    console.log("no haz iniciado los preparativos del evento")
  }

  return (
    <>
      {(() => {
        if (count >= 1) {
          if (count >= 2) {
            if (count >= 3) {
              return (
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden ">
                  <svg className="bg-primary h-full" width="100%" />
                </div>
              )
            } else {
              return (
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <svg className="bg-primary h-full" width="70%" />
                </div>
              )
            }
          } else {
            return (
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <svg className="bg-primary h-full" width="50%" />
              </div>
            )
          }
        } else {
          return (
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <svg className="bg-rosa h-full" width="20%" />
            </div>
          )
        }
      })()}
    </>
  )
}