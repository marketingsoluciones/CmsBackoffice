import { useState } from "react";
import { PlusIcon, PlusCirculoIcon } from "../Icons/index"
import DatatableGroup from "./DataTableGroups"


export const BlockPlantillaMenu = ({ addProducto, setAddProducto, addCategoria, setAddCategoria }) => {
  /* const { event } = EventContextProvider(); */
  const [isMounted, setIsMounted] = useState(false);
  /* const shouldRenderChild = useDelayUnmount(isMounted, 500); */
  const [invitadoSelected, setSelected] = useState(null);
  /* const toast = useToast() */

  /* const handleClick = (e, click) => {
    e.preventDefault();
    set({ state: !state, click: click });
  }; */


  return (
    <div className="bg-white  w-full shadow-lg rounded-xl h-[calc(100%-190px)] px-6 pt-6 pb-28 mb-32 md:mb-0 md:p-12 relative">
      <div className="flex gap-4 items-center pb-10">
        <button
          onClick={() => setAddProducto(!addProducto)}
          /* onClick={(e) => handleClick(e, "invitado")} */
          className="focus:outline-none bg-rosa px-2 py-1 flex gap-2 text-white  text-sm rounded-lg items-center "
        >
          <PlusCirculoIcon />
          Producto
        </button>
        <button
          onClick={() => setAddCategoria(!addCategoria)}
          /* onClick={(e) => handleClick(e, "grupo")} */
          className="focus:outline-none bg-rosa px-2 py-1 flex gap-2 items-center  text-white  text-sm rounded-lg    "
        >
          <PlusCirculoIcon />
          Categoria
        </button>

      </div>
      {/* {shouldRenderChild && (
        <ModalBottom state={isMounted} set={setIsMounted}>
          <div className="flex justify-center w-full gap-6">
            <div className="w-full md:w-5/6">
              <div className="border-l-2 border-gray-100 pl-3 my-6 w-full ">
                <h2 className="font-display text-2xl capitalize text-primary font-light">
                  Editar <br />
                  <span className="font-display text-4xl capitalize text-gray-500 font-medium">
                    Invitado
                  </span>
                </h2>
              </div>
              {invitadoSelected !== "" ? (
                <FormEditarInvitado
                  //ListaGrupos={event?.grupos_array}
                  invitado={event.invitados_array.find(
                    (guest) => guest._id === invitadoSelected
                  )}
                  setInvitadoSelected={setSelected}
                  state={isMounted}
                  set={setIsMounted}
                />
              ) : (
                <div className="w-full h-full grid place-items-center">
                  {" "}
                  <p className="font-display text-lg text-gray-100">
                    No hay invitado seleccionado
                  </p>
                </div>
              )}
            </div>
          </div>
        </ModalBottom>
      )} */}
      <div className="relative overflow-x-auto md:overflow-x-visible overflow-auto h-[calc(100%-30px)] ">
        <DatatableGroup
          GruposArray={""}
          setSelected={setSelected}
          isMounted={isMounted}
          setIsMounted={setIsMounted}
        />
      </div>
      {/* <SentarBlock /> */}
      {/* {createPDF ? (
        <ModalPDF createPDF={createPDF} setCreatePDF={setCreatePDF} Data={event}  />
      ) : null} */}
    </div>
  );
};


