import { ArrowLeft, DescargaIcon, DiamanteIcon, FotoBgIcon } from "../../Icons/index"
import { useRouter } from "next/router"

export const ColeccionesInfoPage = ({ setComponentState }) => {
    const router = useRouter()
    const dataArry = [
        {
            icon: <DescargaIcon />,
            span: "Ofrece valor a tus usuarios ",
            text: "al agregar un enlace de descarga a las fotos."
        },
        {
            icon: <FotoBgIcon />,
            span: "Crea cuantas colecciones quieras",
            text: "y potencia tu presencia online."
        },
    ]
    return (
        <div className="h-[100vh]">
            <div onClick={() => setComponentState(2)} className="w-5 h-5 absolute* z-10 top-2 left-3 text-gray-700 cursor-pointer">
                <ArrowLeft />
            </div>
            <p className="  mt-1 text-3xl text-rosa">
                Colecciones
            </p>
            <div className="bg-white rounded-lg md:h-[calc(100%-110px)] h-[calc(100%-220px)] overflow-auto">
                <div className="md:grid md:grid-cols-2 px-10 py-10">
                    <div>
                        <p className="text-xl">
                            <span className="text-rosa"> Amplia tu exposición y atrae más clientes </span> con tus colecciones de fotos
                        </p>
                        <div className="text-yellow-500 flex items-center space-x-1 my-2  text-base cursor-default">
                            <div>
                                <DiamanteIcon />
                            </div>
                            <p>
                                Activar la versión <span className="font-semibold cursor-pointer" onClick={() => router.push({
                                    pathname: "/facturacion",
                                    query: {
                                        state: 1,
                                        product: "prod_OxV4HJxhbtL5wU",
                                        plan: "Premium",
                                        originPath: "fotografo",
                                        stateOriginPath: "0"
                                    }
                                })}>PREMIUM</span>
                            </p>
                        </div>
                        <button onClick={() => router.push({
                            pathname: "/facturacion",
                            query: {
                                state: 1,
                                product: "prod_OxV4HJxhbtL5wU",
                                plan: "Premium",
                                originPath: "fotografo",
                                stateOriginPath: "0"
                            }
                        })} className="bg-rosa rounded-lg px-4 py-0.5 text-white text-base">
                            Crear Colección
                        </button>
                    </div>
                    <div>
                        <img src="coleccionesFoto.png" alt="colecciones fotografo" />
                    </div>
                </div>
                <div className="bg-gray-100 px-16 py-5">
                    <p className="text-base text-center">
                        <span className="text-rosa">Publicar las colecciones de fotos y videos de tus eventos </span> es una forma estratégica de destacar tu talento fotográfico. Más aún, si lo hacen dentro de canales como tu EventosOrganizador.
                    </p>
                </div>
                <div className="md:grid md:grid-cols-2 px-10 py-10 md:space-x-5 space-y-5 md:space-y-0">
                    {
                        dataArry.map((item, idx) => {
                            return (
                                <div key={idx} className="flex items-center space-x-3">
                                    <div>
                                        {item.icon}
                                    </div>
                                    <p className="text-base">
                                        <span className="font-semibold"> {item.span}</span> {item.text}
                                    </p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}