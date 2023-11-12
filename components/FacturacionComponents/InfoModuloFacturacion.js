import { useEffect, useState } from "react"
import { ExclamacionIcon, VideoIcon } from "../Icons/index"
import ClickAwayListener from "react-click-away-listener";
import Link from "next/link";

export const InfoModuloFacturacion = ({ dataArry, actionButtton, producto , plan }) => {
    const [viewInfo, setViewInfo] = useState()
    const [optionSelect, setOptionSelect] = useState(null)
    

    const info = [
        {
            id: "34356",
            icon: <ExclamacionIcon />,
            title: "Publicar marcas",
            texto: "Aumenta alcance de tu marca con novias y proveedores de servicios; y convierte más al publicar en bodasdehoy."
        },
        {
            id: "34367",
            icon: <ExclamacionIcon />,
            title: "Visor de eventos",
            texto: "Visualiza los elementos para organizar tu evento, así es más fácil organizar tu evento con el tema que deseas."
        },
        {
            id: "34378",
            icon: <ExclamacionIcon />,
            title: "Publica artículos",
            texto: "Conecta con tu comunidad con artículos que demuestren tu experiencia y te ayuden a ganar su confianza."
        },
    ]

    return (
        <>
            <div className="bg-white rounded-lg px-10 py-5 mb-3">
                <p className="text-xl text-gray-600">Mejora tu organización con los módulos especiales </p>
                <p className="text-base text-gray-700"> Si se suscribe en la mitad del ciclo de facturación, se le cobrará un monto parcial.</p>
            </div>
            <div className="space-y-4">

                <div className="flex justify-center bg-white rounded-lg px-5 py-5 space-x-4 ">
                    <div>
                        <img src="/Facturacion/corazonCuadro.png" alt="corazonCuadro" />
                    </div>
                    <div className="border-r-2 w-[70%] space-y-2 ">
                        <div className="flex space-x-3 w-[50%] justify-between">
                            <p className="text-xl">Panel de gestión para empresas</p>
                        </div>
                        <p className="text-base w-[80%]">Coordina desde tu panel de gestión para empresas tus publicaciones en Bodas de Hoy y tus eventos activos en el EventosOrganizador. </p>
                        <div className="grid grid-cols-3">
                            {
                                info.map((item, idx) => {
                                    return (
                                        <div key={idx} className="relative"  >
                                            <InfoModulos data={item} viewInfo={viewInfo} setViewInfo={setViewInfo} />
                                            {
                                                viewInfo == item.id ? (
                                                    <ModalInfoModulo data={item} setViewInfo={setViewInfo} viewInfo={viewInfo} />
                                                ) : null
                                            }

                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>
                    <div className="flex flex-col justify-center space-y-2 items-end pl-16 w-64">
                        <p>
                            Gratis
                        </p>
                        <p className="text-base">
                            Incluido con tu registro
                        </p>
                        <div className="flex items-center justify-center space-x-2 text-base">
                            <VideoIcon />
                            <p>
                                Ver video (00:30)
                            </p>
                        </div>
                    </div>
                </div>

                {
                    dataArry.map((item, idx) => {
                        return (
                            <div key={idx} className="flex justify-center bg-white rounded-lg px-5 py-5 space-x-4">
                                {(() => {
                                    if (optionSelect !== item.idPremium) {
                                        return (
                                            <div>
                                                <img src={item.icon} alt={item.title} />
                                            </div>
                                        )
                                    }
                                    if (optionSelect == item.idPremium) {
                                        return (
                                            <div>
                                                <img src={item.iconPremium} alt={item.title} />
                                            </div>
                                        )
                                    }
                                })()}

                                <div className="border-r-2 w-[70%] space-y-2 ">
                                    <div className="flex space-x-3 w-[50%] justify-between">
                                        <p className="text-xl">{item.title}</p>
                                        <div className="text-base flex items-center ">
                                            <button onClick={() => setOptionSelect(item.idBasco)} className={` border rounded-l-md p-1 ${optionSelect !== item.idPremium ? "border-rosa text-rosa bg-gray-100  transition delay-80" : ""}`}>
                                                basico
                                            </button>
                                            <button onClick={() => setOptionSelect(item.idPremium)} className={` border rounded-r-md p-1 ${optionSelect == item.idPremium ? "text-white bg-rosa" : ""}`}>
                                                premium
                                            </button>
                                        </div>
                                    </div>
                                    {(() => {
                                        if (optionSelect !== item.idPremium) {
                                            return (
                                                <p className="text-base">{item.text}</p>
                                            )
                                        }
                                        if (optionSelect == item.idPremium) {
                                            return (
                                                <p className="text-base w-[80%]">{item.textPremium}</p>
                                            )
                                        }
                                    })()}

                                    {(() => {
                                        if (optionSelect !== item.idPremium) {
                                            return (
                                                <div className="grid grid-cols-3">
                                                    {
                                                        item?.infoBasico?.map((item, idx) => {
                                                            return (
                                                                <div key={idx} className="relative"  >
                                                                    <InfoModulos data={item} viewInfo={viewInfo} setViewInfo={setViewInfo} />
                                                                    {
                                                                        viewInfo == item.id ? (

                                                                            <ModalInfoModulo data={item} setViewInfo={setViewInfo} viewInfo={viewInfo} />
                                                                        ) : null
                                                                    }
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            )
                                        }
                                        if (optionSelect == item.idPremium) {
                                            return (
                                                <div className="grid grid-cols-3">
                                                    {
                                                        item?.infoPremium?.map((item, idx) => {

                                                            return (
                                                                <div key={idx} className="relative" >
                                                                    <InfoModulos data={item} viewInfo={viewInfo} setViewInfo={setViewInfo} />
                                                                    {
                                                                        viewInfo == item.id ? (

                                                                            <ModalInfoModulo data={item} setViewInfo={setViewInfo} viewInfo={viewInfo} />
                                                                        ) : null
                                                                    }
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            )
                                        }
                                    })()}

                                </div>
                                <div className="flex flex-col justify-center space-y-2 items-end pl-16">
                                    {(() => {
                                        if (optionSelect !== item.idPremium) {
                                            return (
                                                <>
                                                    <p className="text-end w-40 text-base">
                                                        {item.tituloEstatus}
                                                    </p>
                                                    <p className="text-base font-semibold">
                                                        {item.precio}
                                                    </p>
                                                </>
                                            )
                                        }
                                        if (optionSelect == item.idPremium) {
                                            return (
                                                <p className="">
                                                    {item.precioPremium}
                                                </p>
                                            )
                                        }
                                    })()}

                                    {(() => {
                                        if (optionSelect !== item.idPremium) {
                                            return (
                                                <Link href={`${item.pagoBasico}`} _blank>
                                                    <button className="text-base w-48 bg-rosa text-white rounded-lg  py-0.5">
                                                        {
                                                            item.buttonAdd
                                                        }
                                                    </button>
                                                </Link>
                                            )
                                        }
                                        if (optionSelect == item.idPremium) {
                                            return (
                                                <Link href={`${item.pagoPremium}`} _blank>
                                                    <button className="text-base w-48 bg-rosa text-white rounded-lg  py-0.5">
                                                        {
                                                            item.buttonAdd
                                                        }
                                                    </button>
                                                </Link>
                                            )
                                        }
                                    })()}

                                    <div className="flex items-center justify-center space-x-2 text-base">
                                        {item.iconoVideo}
                                        <p>
                                            {item.video}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="bg-white rounded-lg px-5 py-3 mt-3 flex justify-between">
                <button onClick={() => actionButtton(0)} className="border border-rosa rounded-lg py-1 px-3 text-rosa text-base">
                    volver
                </button>
              {/*   <div>
                    <button className="bg-rosa rounded-lg px-7 py-1 text-white text-base" onClick={() => actionButtton(2)}>
                        Revisar compra
                    </button>
                </div> */}
            </div>
        </>
    )
}

const InfoModulos = ({ data, viewInfo, setViewInfo }) => {
    return (
        <div className="text-base flex items-center space-x-2 mb-0.5 cursor-default ">
            <p className={`  cursor-pointer ${viewInfo == data.id ? "text-rosa" : ""}`} onClick={() => setViewInfo(data?.id)}>
                {data?.icon}
            </p>
            <p>
                {data?.title}
            </p>
        </div>
    )
}

const ModalInfoModulo = ({ data, setViewInfo, viewInfo }) => {
    return (
        <ClickAwayListener onClickAway={() => viewInfo && setViewInfo(false)}>
            <div className="bg-white border  border-rosa rounded-lg p-2 shadow-lg text-base absolute z-10">
                {data.texto}
            </div>
        </ClickAwayListener>
    )
}

