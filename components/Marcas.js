import { CorazonBodasICon } from "../components/Icons/index"
import { useRouter } from "next/router"
export const Marcas = () => {
    const router = useRouter()
    const dataArry = [
        {
            icon: <CorazonBodasICon />,
            text: " que Bodas de Hoy tiene para ti, incluso puedes solicitar nuevas funcionalidades que nos permita mejorar tu experiencia.",
            textResaltado: "Tener acceso a los productos"
        },
        {
            icon: <CorazonBodasICon />,
            text: " que desees desde nuestro organizador y gestionar cada fase.",
            textResaltado: "Crear todos los eventos"

        },
        {
            icon: <CorazonBodasICon />,
            text: " a una amplia comunidad de novios.",
            textResaltado: "Promocionar tus servicios"
        },
        {
            icon: <CorazonBodasICon />,
            text: " e indirecto para que le saques el mayor provecho a cada uno de tus clientes.",
            textResaltado: "Mantener el contacto directo"
        }
    ]
    return (
        <div className="p-[0.5rem] h-[100vh]">
            <p className=" text-3xl text-rosa">
                Marcas
            </p>
            <div className="bg-white h-[calc(100%-30px)] md:h-[calc(100%-45px)] rounded-lg ">
                <div className="grid md:grid-cols-2 justify-items-center bg-grayInformativo rounded-t-lg py-7 md:py-14 px-5 md:px-20 space-y-3 md:space-y-0 " >
                    <div className="text-[20px] md:text-[24px] text-azulCorporativo">
                        <span className="text-rosa font-semibold">Registra</span> tu empresa de bodas
                    </div>
                    <div>
                        <p className="font-semibold text-[15px] text-azulCorporativo text-center md:text-left" >
                            Aumenta tu cartera de clientes cada mes.
                        </p>
                        <p className="text-sm text-azulCorporativo text-center md:text-left">
                            Llega a más novios y personas interesadas con nuestro directorio.
                        </p>
                    </div>
                    <div>
                        <button onClick={() => router.push("/business")} className="bg-rosa px-2 py-1 rounded-lg text-white text-sm shadow-md ">
                            Añadir marca
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-center py-4 space-y-4 px-5">
                    <div className="flex items-center justify-center text-rosa md:text-xl ">
                        <p className="md:block hidden" >Ser parte de  </p>
                        <img src="/logo.webp" alt="alta" className=" md:w-28 h-4 md:ml-2 md:mr-2" />
                        <p className="md:block hidden">te permite:</p>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center px-7 ">
                        <div className="grid grid-cols-1 md:grid-cols-2 space-y-2 md:space-y-0  ">
                            {dataArry.map((item, idx) => {
                                return (
                                    <div className="text-base flex md:pb-10 " key={idx}>
                                        <div className="text-rosa mr-1">
                                            {item.icon}
                                        </div>
                                        <p className="md:text-[15px] text-azulCorporativo">
                                            <span className="font-semibold">{item.textResaltado}</span>
                                            {item.text}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="pt-3 md:pt-0">
                            <img src="/marca.png" alt="alta" className="" />
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )


}