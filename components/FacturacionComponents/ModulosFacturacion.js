import { useEffect, useState } from "react"
import { InfoModuloFacturacion } from "./InfoModuloFacturacion"
import { InfoModulos } from "./InfoModulos"
import { DetalladoCompra } from "./DetalladoCompra"
import { DatosFacturacion } from "./DatosFacturacion"
import { fetchApi, queries } from "../../utils/Fetching"
import { AuthContextProvider } from "../../context/AuthContext"
import { useRouter } from "next/router"

export const ModulosFacturacion = () => {
    const { config } = AuthContextProvider();
    const [optionSelect, setOptionSelect] = useState(-1)
    const [data, setData] = useState({})
    const router = useRouter()
    const { state } = router?.query

    useEffect(() => {
        if (state) {
            setOptionSelect(state)
        }
    }, [])


    useEffect(() => {
        fetchApi({
            query: queries.getAllProducts,
            variables: { grupo: "cms" },
            development: config?.name
        }).then(result => {
            const data = JSON.parse(result)
            const asd = data?.reduce((acc, item) => {
                if (!acc.modulos.includes(item.metadata.segmento)) {
                    acc.modulos.push(item.metadata.segmento)
                }
                return acc
            }, { modulos: [] })
            setData({ data, ...asd })
            if (data.length) {
                setOptionSelect(0)
            }
        })
    }, [])

    const dataComponents = [
        {
            component: <InfoModulos data={data} setOptionSelect={setOptionSelect} />
        },
        {
            component: <InfoModuloFacturacion data={data} actionButtton={setOptionSelect} />
        },
        {
            component: <DetalladoCompra actionButtton={setOptionSelect} />
        },
        {
            component: <DatosFacturacion actionButtton={setOptionSelect} />
        }
    ]

    return (

        <div className="bg-red">
            {optionSelect > -1 && dataComponents[optionSelect]?.component}
        </div>
    )
}

