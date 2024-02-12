export const InfoPageChat = () => {
    const dataArry = [
        {
            icon: "chat1.png",
            text: "Comunicación e interacción con otros organizadores de eventos, clientes, visitantes."
        },
        {
            icon: "chat2.png",
            text: "Comunicación e interacción con otros organizadores de eventos, clientes, visitantes."
        },
    ]
    return (
        <div >
            <p className=" mt-1 text-3xl text-rosa font-semibold">
                Chat
            </p>

            <div className="bg-white rounded-lg h-[calc(100vh-125px)] flex flex-col items-center justify-center space-y-5 py-[400px] px-5 md:px-0 md:py-0" >
                <div>
                    <img src="ChatIcon.png" />
                </div>
                <div className="flex flex-col items-center justify-center space-y-2">
                    <h1 className="text-rosa text-[26px] md:text-[30px] font-semibold">Chat en tiempo real</h1>
                    <p className="text-azulCorporativo text-center md:text-left">Tu EventosOrganizador facilita las comunicaciones con todos los participantes de tu evento.</p>
                    <div className="grid md:grid-cols-2  ">
                        {
                            dataArry.map((item, idx) => {
                                return (
                                    <div className="flex items-center justify-center space-x-3 space-y-2 md:space-y-0 mx-[20%]">
                                        <img src={item.icon} alt={"chat" + idx} />
                                        <p className="text-azulCorporativo">{item.text}</p>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
                <button className="bg-rosa rounded-lg text-white px-8 py-1.5">
                    Inicar Chat
                </button>

            </div>
        </div>
    )
}