import { AuthContextProvider } from "../../context"
import { fetchApi, queries } from "../../utils/Fetching"
import { ArrowLeft, DiamanteIcon } from "../Icons/index"


export const InfoPageMetricool = () => {
    const { user, setUser, development, config } = AuthContextProvider()
    console.log("console del user", user.authDevelopments)

    const ActivateMetricool = () => {
        fetchApi({
            query: queries.updateMetricol,
            variables: {
                uid: user?.uid
            },
            development: config?.name
        }).then((result) => {
            setUser((old) => {
                const f1 = old?.authDevelopments?.findIndex((element) => element.title === development)
                old.authDevelopments[f1].metricol = result
                return { ...old }
            })
        })
    }


    return (
        <div  >
            {/* <div className="w-5 h-5 absolute* z-10 top-2 left-3 text-gray-700 cursor-pointer">
                <ArrowLeft />
            </div> */}
            <p className="mt-1 text-3xl text-rosa font-semibold">
                Metricas
            </p>
            <div className="bg-white rounded-lg h-[calc(100vh-145px)] flex flex-col items-center justify-center overflow-y-auto">
                <div className="text-[23px] text-center text-rosa font-semibold">
                    ¡Una para todas y todas en una!
                </div>
                <div className="grid grid-cols-2 justify-items-center items-center relative px-10 py-5">
                    <div className="text-[15px] text-azulCorporativo space-y-2">
                        <p>
                            Una sola herramienta para todas las tareas de cualquier red social y para todas las personas, sean cuales sean tus habilidades, conocimientos y recursos.
                        </p>
                        <p>
                            Alcance, interacciones, comentarios, engagement, rendimiento, número de seguidores, visualizaciones…. Datos, datos, datos… Y si lo multiplicas por cada red social o canal publicitario, es abrumador.
                        </p>
                    </div>
                    <div className="-my-[80px]" >
                        <img src="/homeMetricas.webp" className="h-[450px]" />
                    </div>
                </div>
                <div className="bg-rosa text-base text-white px-2 py-1 rounded-lg flex items-center cursor-pointer z-50" onClick={() => ActivateMetricool()}>
                    Inicia prueba gratis de 15 días
                    <div className="text-amarillo pl-2">
                        <DiamanteIcon />
                    </div>
                </div>
            </div>
        </div >
    )
}