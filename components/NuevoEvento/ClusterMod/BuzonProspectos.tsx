import { FC, useState } from "react";
import { OptionsTable, RcDataTable } from "../../RecomendacionsComponents"
import { columnsRCRC } from "../../ui"
import { AuthContextProvider } from "../../../context";
import { ModalRight } from "../../modals/ModalRight";
import {FormDataProspecto} from "../../formularios/FormDataProspecto"

interface propsBuzonProspectos {
  componentState: any;
  setComponentState: any;

}

export const BuzonProspectos: FC<propsBuzonProspectos> = ({ componentState, setComponentState }) => {
  const { openModalRight, setOpenModalRight } = AuthContextProvider()
  const [optionSelect, setOptionSelect] = useState(0)
  const DataOptionsTable = [
    {
      componente: <RcDataTable columns={columnsRCRC} />
    },
  ]

  const handleClickOption = (idx) => {
    setOptionSelect(idx);
  };

  return (
    <>
      <div className="space-y-3">

        <div className="bg-white px-4 py-4" >
          <div className="w-full h-[64.5px] flex flex-row bg-white items-center justify-between p-4 box-border gap-[20px] max-w-full text-center text-sm text-[#21232C] font-semibold">


            <div className="self-stretch w-auto flex flex-row items-center justify-start gap-[8px] max-w-full">

              <div className="flex flex-col items-start justify-start text-left text-sm-9">
                <div className="relative leading-[21px] inline-block font-semibold text-xl text-gray-800">
                  Buzon de prospectos
                </div>
              </div>


            </div>

            <div className="cursor-pointer py-0 pr-2 pl-0 bg-[transparent] flex flex-row items-start justify-start gap-2">
              <div className="self-stretch flex-1 rounded bg-rosa shadow-[0px_1px_2px_rgba(42,_54,_71,_0.05)] flex flex-row items-center justify-center py-1.5 px-1 box-border min-w-[32px]">
                <img
                  className="h-4 w-4 relative overflow-hidden shrink-0"
                  alt=""
                  src="ModuloEvento/b3.svg"
                />
                <div className="flex-1 overflow-hidden flex flex-col items-center justify-start py-0 pr-3 pl-1">
                  <div className="self-stretch relative text-sm leading-[20px] font-semibold text-white text-center inline-block min-w-[70px]">
                    Prospecto
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start">
                <div className="flex flex-col items-start justify-start">
                  <div className="w-[34px] h-8 rounded bg-slate-100 shadow-[0px_1px_2px_rgba(42,_54,_71,_0.05)] box-border flex flex-row items-center justify-center py-2 px-1 min-w-[32px] border-[1px] border-solid border-carbonaphrd-pipedrive-com-leads-web-visitors-1318x573-default-shark-24">
                    <img
                      className="h-4 w-6 relative overflow-hidden shrink-0"
                      loading="lazy"
                      alt=""
                      src="ModuloEvento/trespuntos.svg"
                    />
                  </div>
                </div>
              </div>
            </div>



          </div>
          <OptionsTable DataOptionsTable={DataOptionsTable} onClick={handleClickOption} optionSelect={optionSelect} />

          {DataOptionsTable[optionSelect].componente}
        </div>
      </div>
      {
        openModalRight.state ?
          <ModalRight state={openModalRight} set={setOpenModalRight}>
            <FormDataProspecto data={openModalRight.data}/>
          </ModalRight>
          : null
      }
    </>

  )
}