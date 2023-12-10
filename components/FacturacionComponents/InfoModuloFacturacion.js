import { useEffect, useState } from "react"
import { ArrowLeft, ExclamacionIcon, VideoIcon } from "../Icons/index"
import ClickAwayListener from "react-click-away-listener";
import Link from "next/link";
import { LiaCartArrowDownSolid } from "react-icons/lia"
import { ModuloFacturacion } from "./ModuloFacturacion";
import { fetchApi, queries } from "../../utils/Fetching";
import { AuthContextProvider } from "../../context/AuthContext";
import { useRouter } from "next/router";
import { ArrowBackComponent } from "../ToolsComponents";

export const InfoModuloFacturacion = ({ data, actionButtton }) => {
    const { user } = AuthContextProvider()
    const [viewInfo, setViewInfo] = useState()
    const [products, setProducts] = useState([])
    const [optionSelect, setOptionSelect] = useState(null)
    const router = useRouter()
    const { originPath, stateOriginPath, product } = router?.query
    const idProduct = product
    const findProducto = data?.data?.find(product => (product.id === idProduct))
    console.log("data 1", data)
    console.log(findProducto)
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

    const handleCheckout = () => {
        fetchApi({
            query: queries.createCheckoutSession,
            variables: {
                pricesIDs: products?.map(elem => elem?.priceID),
                email: user?.email,
                cancel_url: `${window.location.href}/?stage=1`
            },
        }).then((result) => {
            router.push(result)
        })
    }

    const actionBut = () => {
        if (originPath) {
            router.push({
                pathname: `/${originPath}`,
                query: { stateOriginPath: stateOriginPath }
            })
        }
        else { actionButtton(0) }
    }

    return (
        <div className="h-[100vh] relative">
            <div className="bg-white rounded-lg px-10 py-5 mb-3 flex justify-between">
                <div className="absolute z-10 top-2 left-3">
                    <ArrowBackComponent action={actionBut} />
                </div>
                <div className="">
                    <p className="text-xl text-gray-600">Mejora tu organización con los módulos especiales </p>
                    <p className="text-base text-gray-700"> Si se suscribe en la mitad del ciclo de facturación, se le cobrará un monto parcial.</p>
                </div>
                <div className="relative flex">
                    {products?.length > 0 && <span className="bg-rosa w-5 h-5 absolute z-10 rounded-full border-2 border-rosa flex items-center justify-center text-white translate-x-4 translate-y-1">{products?.length}</span>}
                    <LiaCartArrowDownSolid className="w-12 h-12 text-rosa" />
                    <button
                        onClick={handleCheckout}
                        className={`${products.length ? "bg-rosa" : "bg-gray-300"} text-white rounded-lg capitalize px-4 m-2`}
                        disabled={!products.length}>
                        pagar
                    </button>
                </div>
            </div>
            <div className="space-y-4 h-[calc(100%-175px)] overflow-auto">
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
                        {/* <div className="flex items-center justify-center space-x-2 text-base">
                            <VideoIcon />
                            <p>
                                Ver video (00:30)
                            </p>
                        </div> */}
                    </div>
                </div>
                {data?.modulos?.map((elem, idx) => {
                    return (
                        <ModuloFacturacion key={idx} data={data} elem={elem} products={products} setProducts={setProducts} idProduct={product} />
                    )
                })
                }
            </div>
        </div >
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
            <div className="bg-white border  border-rosa rounded-lg p-2 shadow-lg text-base absolute z-50">
                {data.texto}
            </div>
        </ClickAwayListener>
    )
}

