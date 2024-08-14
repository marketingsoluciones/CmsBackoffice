import Link from "next/link"
import { useState } from "react"
import ClickAwayListener from "react-click-away-listener"
import { ExclamacionIcon } from "../Icons/index"
import { InfoItemsFacturation } from "../../utils/schemas"


export const ModuloFacturacion = ({ data, elem, products, setProducts }) => {
  const [optionSelect, setOptionSelect] = useState("basic")
  const [viewInfo, setViewInfo] = useState()

  const item = data?.data?.find(el => (el.metadata.segmento === elem && el.metadata.tipo === optionSelect))

  return (
    <>
      {
        item != undefined ? (
          < div className="md:h-[200px] flex md:flex-row flex-col items-center md:items-start  justify-center bg-white rounded-lg px-5 py-5 md:space-x-4 md:space-y-0 space-y-3">

            <div>
              <img src={item?.images[0]} alt={item?.name} />
            </div>

            <div className="md:border-r-2 border-b-2 md:border-b-0 md:w-[70%] space-y-2 pb-3 md:pb-0 ">

              <div className="md:flex md:space-x-3 justify-between">

                <p className="text-xl">{item?.name}</p>

                <div className="text-base flex items-center md:pr-14 ">
                  <button onClick={() => setOptionSelect("basic")} className={`capitalize border rounded-l-md p-1 ${optionSelect !== "premium" ? "border-rosa text-rosa bg-gray-100  transition delay-80" : ""}`}>
                    básico
                  </button>
                  <button onClick={() => setOptionSelect("premium")} className={`capitalize border rounded-r-md p-1 ${optionSelect == "premium" ? "text-white bg-rosa" : ""}`}>
                    premium
                  </button>
                </div>

              </div>

              <p className="text-base">{item?.description}</p>

              <div className="w-full relative">

                <div className="w-full md:grid md:grid-cols-3 space-y-3 md:space-y-0">
                  {item?.metadata?.includes?.split(", ").map((el, idx) => {
                    return <InfoModulos key={idx} item={el} viewInfo={viewInfo} setViewInfo={setViewInfo} />
                  })}
                </div>

                {/* <ModalInfoModulo data={item} setViewInfo={setViewInfo} viewInfo={viewInfo} /> Módulo Lugares para Bodas */}
              </div>
            </div>
            <div className="flex flex-col justify-between space-y-2 items-end pl-16">
              <div className="flex flex-col justify-between items-end md:my-6  h-full">
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
                      const f1 = old.findIndex(elem => elem?.segmento === item?.metadata?.segmento)
                      if (f1 > -1) {
                        old?.splice(f1, 1)
                      }
                      old = [...old, { id: item?.id, name: item?.name, priceID: item?.prices[0]?.id, segmento: item?.metadata?.segmento }]
                      return old
                    }
                    const f1 = old.findIndex(elem => elem?.id === item?.id)
                    old?.splice(f1, 1)
                    return [...old]
                  })
                }}
                className={`text-base w-48 ${products?.map(elem => elem.id).includes(item?.id) ? "bg-white text-rosa" : "bg-rosa text-white"} border-2 border-rosa rounded-lg py-0.5`}>
                {products?.map(elem => elem.id).includes(item?.id) ? "- Quitar complemento" : "+ Añadir complemento"}
              </button>
            </div>
          </div >
        ) :
          null
      }

    </>
  )

}


const InfoModulos = ({ item, viewInfo, setViewInfo }) => {
  const [showInfo, setShowInfo] = useState(false)
  return (
    < div className="text-base flex items-center space-x-2 mb-0.5 cursor-default" >
      <ClickAwayListener onClickAway={() => setShowInfo(false)}>
        <div className="relative">
          {showInfo && <div className="bg-white w-[220px] top-5 left-5 border  border-rosa rounded-lg p-2 shadow-lg text-base absolute z-50">
            {InfoItemsFacturation.find(elem => elem?.title === item)?.texto}
          </div>}
          <p className={`cursor-pointer ${showInfo ? "text-rosa" : ""}`} onClick={() => setShowInfo(true)}>
            <ExclamacionIcon />
          </p>
        </div>
      </ClickAwayListener>
      <p>
        {item}
      </p>
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
