export const MarketplaceC = () => {
    const dataArry = [
        {
            img: "/marketplace/corazonGlobo.png",
            text: "Publica tus servicios en la tienda y amplia tus oportunidades de negocio"
        },
        {
            img: "/marketplace/usuarioMira.png",
            text: "Llega al público que necesita que le ayudes con tus servicios creativos."
        },
        {
            img: "/marketplace/manos.png",
            text: "Facilitamos tus procesos de contratación y pagos en nuestra plataforma."
        }
    ]
    return (
        <div className="p-[0.5rem] h-[100vh]">
            <p className="text-3xl text-rosa first-letter:uppercase ">
                tienda
            </p>
            <div className="bg-white h-[calc(100%-100px)] rounded-lg ">
                <div className="flex flex-col items-center py-4 space-y-4 px-5 justify-center h-full">
                    <div>
                        <img src="/marketplace/logoMarket.png" alt="alta" className="" />
                    </div>

                    <div className="flex flex-col items-center">
                        <h1 className="text-rosa md:text-3xl text-xl">Aumenta tu visibilidad y haz crecer tus ganancias.</h1>
                        <h3 className="text-base text-gray-600">Vende tus servicios en nuestra tienda exclusiva para proveedores de bodas y eventos</h3>
                    </div>

                    <div className="md:grid md:grid-cols-3 justify-items-center space-y-2 md:space-y-0  ">
                        {dataArry.map((item, idx) => {
                            return (
                                <div className="pl-5 text-base flex items-center space-x-2" key={idx}>
                                    <div>
                                        <img src={item.img} alt="imgs data" />
                                    </div>
                                    <p className="text-gray-700 pr-5* ">{item.text}</p>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        </div>
    )
}