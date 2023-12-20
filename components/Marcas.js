import { CorazonBodasICon } from "../components/Icons/index"
import { useRouter } from "next/router"
export const Marcas = () => {
    const router = useRouter()
    const dataArry = [
        {
            icon: <CorazonBodasICon />,
            title: "",
            text: "Tener acceso a los productos que Bodas de Hoy tiene para ti, incluso puedes solicitar nuevas funcionalidades que nos permita mejorar tu experiencia.",
        },
        {
            icon: <CorazonBodasICon />,
            title: "",
            text: "Crear todos los eventos que desees desde nuestro organizador y gestionar cada fase.",
        },
        {
            icon: <CorazonBodasICon />,
            title: "",
            text: "Promocionar tus servicios a una amplia comunidad de novios.",
        },
        {
            icon: <CorazonBodasICon />,
            title: "",
            text: "Mantener el contacto directo e indirecto para que le saques el mayor provecho a cada uno de tus clientes.",
        }
    ]
    return (
        <div className="p-[0.5rem] h-full">
            <p className=" text-slate-600 text-3xl text-rosa">
                Marcas
            </p>
            <div className="bg-white h-[92%] rounded-lg ">

                <div className="grid grid-cols-2 justify-items-center bg-gray-100 rounded-t-lg py-14" >
                    <div>
                        <p>
                            <span className="text-rosa font-semibold">Registra</span> tu empresa de bodas
                        </p>
                    </div>
                    <div>
                        <p className="font-semibold text-sm" >
                            Aumenta tu cartera de clientes cada mes.
                        </p>
                        <p className="text-sm">
                            Llega a más novios y personas interesadas con nuestro directorio.
                        </p>
                    </div>
                    <div>
                        <button onClick={()=> router.push("/business")} className="bg-rosa px-2 py-1 rounded-lg text-white text-sm shadow-md ">
                            Añadir marca
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-center py-4 space-y-4 px-5">
                    <div className="flex items-center justify-center text-rosa text-xl ">
                        <p>Ser parte de  </p>
                        <img src="/logo.webp" alt="alta" className=" w-28 h-4 ml-2 mr-2" />
                        <p>te permite:</p>

                    </div>

                    <div className="grid grid-cols-2 justify-items-center ">

                        <div className="grid grid-cols-2  ">
                            {dataArry.map((item, idx) => {
                                return (
                                    <div className="pl-5 text-base flex" key={idx}>
                                        <div className="text-rosa mr-1">
                                            {item.icon}
                                        </div>
                                        <p>{item.text}</p>
                                    </div>
                                )
                            })}

                        </div>

                        <div>
                            <img src="/Marca.png" alt="alta" className="" />
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )


}