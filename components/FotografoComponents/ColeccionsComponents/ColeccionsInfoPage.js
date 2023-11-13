import { DescargaIcon, DiamanteIcon, FotoBgIcon } from "../../Icons/index"
import { useRouter } from "next/router"

export const ColeccionesInfoPage = () => {
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
        <>
            <p className=" text-slate-600 mt-1 text-3xl text-rosa">
                Colecciones
            </p>
            <div className="bg-white rounded-lg">
                <div className="grid grid-cols-2 px-10 py-10">
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
                                        producto: "weddingPlanner",
                                        plan: "premium"
                                    }
                                })}>PREMIUM</span>
                            </p>
                        </div>
                        {/* <button className="bg-rosa rounded-lg px-4 py-0.5 text-white text-base">
                            Crear Colección
                        </button> */}
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
                <div className="grid grid-cols-2 px-10 py-10 space-x-5">
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
        </>
    )
}