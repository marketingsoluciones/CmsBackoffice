import { FC } from "react";
import { AuthContextProvider } from "../../../context";
import { ModalRight } from "../../modals/ModalRight";
import { FormDataProspecto } from "../../formularios/FormDataProspecto"
import TableCompleto from "../../TableJF/TableCompleto";

interface propsBuzonProspectos {
  

}

export const BuzonProspectos: FC<propsBuzonProspectos> = ({  }) => {
  const { openModalRight, setOpenModalRight } = AuthContextProvider()

  return (
    <>
      <h1 className="text-[20px] pb-2 ">Tus Prospectos</h1>
      <TableCompleto />
      {
        openModalRight?.state ?
          <ModalRight state={openModalRight} set={setOpenModalRight} styles={"px-3 py-[10px]"}>
            <FormDataProspecto data={openModalRight.data} />
          </ModalRight>
          : null
      }
    </>

  )
}