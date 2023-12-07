import Link from "next/link"
import { useState } from "react"
import ClickAwayListener from "react-click-away-listener"
import { ExclamacionIcon } from "../Icons"

export const ModuloFacturacion = ({ data, elem, products, setProducts }) => {
  const [optionSelect, setOptionSelect] = useState("basic")
  const [viewInfo, setViewInfo] = useState()
  const findProducto = {}

  const item = data?.data.find(el => (el.metadata.grupo === elem && el.metadata.tipo === optionSelect))

  return (
    < div className="h-[200px] flex justify-center bg-white rounded-lg px-5 py-5 space-x-4">

      <div>
        <img src={item?.images[0]} alt={item?.name} />
      </div>

      <div className="border-r-2 w-[70%] space-y-2 ">
        <div className="flex space-x-3 justify-between">
          <p className="text-xl">{item?.name}</p>
          <div className="text-base flex items-center pr-14">
            <button onClick={() => setOptionSelect("basic")} className={` border rounded-l-md p-1 ${optionSelect !== "premium" ? "border-rosa text-rosa bg-gray-100  transition delay-80" : ""}`}>
              basico
            </button>
            <button onClick={() => setOptionSelect("premium")} className={` border rounded-r-md p-1 ${optionSelect == "premium" ? "text-white bg-rosa" : ""}`}>
              premium
            </button>
          </div>
        </div>
        <p className="text-base">{item?.description}</p>
        <div className="w-full relative">
          <InfoModulos item={item} viewInfo={viewInfo} setViewInfo={setViewInfo} />
          {/* <ModalInfoModulo data={item} setViewInfo={setViewInfo} viewInfo={viewInfo} /> Módulo Lugares para Bodas */}
        </div>
      </div>
      <div className="flex flex-col justify-between space-y-2 items-end pl-16">
        <div className="flex flex-col justify-between items-end my-6 h-full">
          <p className="text-end w-40 text-base">
            {optionSelect === "basic" && "Gratis durante el período de prueba"}
          </p>
          <p className={`font-semibold`}>
            {`${item?.prices[0]?.currency === "usd" ? "$" : item?.prices[0]?.currency} ${item?.prices[0]?.unit_amount / 100} al mes`}
          </p>
        </div>
        <button
          onClick={() => {
            setProducts(old => {
              if (!products?.map(elem => elem.id).includes(item?.id)) {
                const f1 = old.findIndex(elem => elem?.grupo === item?.metadata?.grupo)
                if (f1 > -1) {
                  old?.splice(f1, 1)
                }
                old = [...old, { id: item?.id, name: item?.name, priceID: item?.prices[0]?.id, grupo: item?.metadata?.grupo }]
                return old
              }
              const f1 = old.findIndex(elem => elem?.id === item?.id)
              old?.splice(f1, 1)
              console.log(old)
              return [...old]
            })
          }}
          className={`text-base w-48 ${products?.map(elem => elem.id).includes(item?.id) ? "bg-white text-rosa" : "bg-rosa text-white"} border-2 border-rosa rounded-lg py-0.5`}>
          {products?.map(elem => elem.id).includes(item?.id) ? "- Quitar complemento" : "+ Añadir complemento"}
        </button>
      </div>
    </div >
  )
}
//Especial para fotógrafos. Brinda a tus clientes una plataforma óptima e intuitiva para descargar las fotografías de su eventos además de organizar tus proyectos, facturas y contratos.
//Gestiona la descarga de fotográfias de tus eventos además automatiza tus presupuestos y contratos.

const InfoModulos = ({ item, viewInfo, setViewInfo }) => {
  return (
    <div className="w-full grid grid-cols-3">
      {item?.metadata?.includes?.split(", ").map((el, idx) => {
        return (
          < div key={idx} className="text-base flex items-center space-x-2 mb-0.5 cursor-default" >
            <p className={`  cursor-pointer ${viewInfo == item.id ? "text-rosa" : ""}`} onClick={() => setViewInfo(item?.id)}>
              <ExclamacionIcon />
            </p>
            <p>
              {el}
            </p>
          </div>
        )
      })}
    </div>
  )
}

const ModalInfoModulo = ({ data, setViewInfo, viewInfo }) => {
  return (
    <ClickAwayListener onClickAway={() => viewInfo && setViewInfo(false)}>
      <div className="bg-white border  border-rosa rounded-lg p-2 shadow-lg text-base absolute z-50">
        {data.texto}
      </div>
    </ClickAwayListener>
  )
}
