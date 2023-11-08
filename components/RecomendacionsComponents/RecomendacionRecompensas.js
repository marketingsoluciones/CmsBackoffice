import { CompartirIcon, CorreoIcon, FacebookIcon, InAzulIcon } from "../Icons/index"

export const RecomendacionRecompensas = () => {
    const dataArry = [
        {
            img: "/recomendaciones/compartir.png",
            icono: "1",
            title: "Comparte tu enlace",
            text: "Comparte tu enlace de recomendación único con quien quieras (una única persona, un grupo o en las redes sociales). ¡Cuantas más veces lo compartas, mayores serán tus posibilidades! ",
        },
        {
            img: "/recomendaciones/strellas.png",
            icono: "2",
            title: "Gana crédito con los registros",
            text: "Obtén un crédito de $10 por cada 3 nuevos dominios de empresa que se registren para una prueba gratuita con tu enlace.",
        },
        {
            img: "/recomendaciones/bolsaDinero.png",
            icono: "3",
            title: "Consigue una recompensa de $100",
            text: "Gana $100 cada vez que un nuevo dominio de la empresa se suscriba usando tu enlace de recomendación.",
        }
    ]

    const DataButtons = [
        {
            icono: <CorreoIcon />,
            texto: "Compartir por correo electrónico",
            rout: null,
            style: "flex items-center text-base space-x-2 bg-rosa rounded-md text-white p-1",
        },
        {
            icono: <CompartirIcon />,
            texto: "Copiar invitación link",
            rout: null,
            style: " flex items-center text-base space-x-2 bg-white rounded-md p-1 border border-gray-200",
        },

    ]

    const RRSSbuttons = [
        {
            icono: <InAzulIcon />,
            texto: null,
            rout: null,
            style: "flex items-center bg-white rounded-md p-1",
        },
        {
            icono: <FacebookIcon />,
            texto: null,
            rout: null,
            style: "flex items-center bg-white rounded-md p-1",
        },
        {
            icono: <FacebookIcon />,
            texto: null,
            rout: null,
            style: "flex items-center bg-white rounded-md p-1",
        },
    ]

    return (
        <div className="flex flex-col space-y-3 items-center">
            <h1 className="text-rosa text-xl">
                ¿Cómo funciona?
            </h1>
            <div className="grid grid-cols-3">
                {dataArry.map((item, idx) => {
                    return (
                        <div key={idx} className="flex flex-col justify-center items-center space-y-2">
                            <div>
                                <img src={`${item.img}`} alt={item.title} />
                            </div>
                            <div className="flex text-base items-center justify-center space-x-2">
                                <div className="bg-rosa rounded-full px-2 text-white">
                                    {item.icono}
                                </div>
                                <div className="text-rosa">
                                    {item.title}
                                </div>
                            </div>
                            <div className="text-base px-24 h-full">
                                {item.text}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="flex flex-col items-center space-y-1">
                <h2 className="text-rosa ">
                    ¡Y vuelve a empezar!
                </h2>
                <p className="text-center text-base w-[50%]">
                    Haz correr la voz y obtén más premios a medida que crece tu base de recomendaciones.
                </p>
            </div>
            <p className="text-base">
                Para más información, lee nuestros <span className="font-semibold"> Términos y condiciones</span>
            </p>
            <div className="bg-gray-100 w-full flex flex-col items-center space-y-3 py-3">
                <p className="text-base font-semibold">
                    ¿Todo listo para empezar a recomendar?
                </p>
                <div className="flex space-x-2">
                    {
                        DataButtons.map((item, idx) => {
                            return (
                                <button key={idx} className={`${item.style}`}>
                                    <div >
                                        {item?.icono}
                                    </div>
                                    <p>
                                        {item?.texto}
                                    </p>
                                </button>
                            )
                        })
                    }
                </div>
                <p className="text-base">
                    o publícalo en las redes sociales
                </p>
                <div className="flex space-x-2">
                    {
                        RRSSbuttons.map((item, idx) => {
                            return (
                                <button key={idx} className={`${item.style}`}>
                                    <div >
                                        {item?.icono}
                                    </div>
                                    <p>
                                        {item?.texto}
                                    </p>
                                </button>
                            )
                        })
                    }
                </div>
            </div>
            <h1 className="text-xl">
                Tus recomendaciones y recompensas
            </h1>

            <p className="border-b text-base px-20 w-[60%] text-center">
                Aquí puedes seguir tu progreso de recomendaciones,
                incluyendo registros, suscriptores y recompensas pendientes.
            </p>
            <div className="grid grid-cols-2 justify-items-center px-56 pb-10">
                <div className="flex flex-col items-rigth justify-center w-[50%]*">
                    <h1 className="text-rosa">
                        Tus registros
                    </h1>
                    <p className="text-base pr-5">
                        Obtienes una pieza diferente del puzzle por
                        cada registro de dominio de empresa.
                        Consigue las 3 piezas para reclamar un
                        crédito de $10.
                    </p>
                </div>
                <div>
                    <img src="/recomendaciones/puzzle.png" />
                </div>
            </div>
        </div>
    )
}