import { useEffect, useState } from "react"
import { ExclamacionIcon, VideoIcon } from "../Icons/index"
import { InfoModuloFacturacion } from "./InfoModuloFacturacion"
import { InfoModulos } from "./InfoModulos"
import { DetalladoCompra } from "./DetalladoCompra"
import { DatosFacturacion } from "./DatosFacturacion"
import { fetchApi, queries } from "../../utils/Fetching"
import { AuthContextProvider } from "../../context/AuthContext"
import { useRouter } from "next/router"

export const ModulosFacturacion = () => {
    const { config } = AuthContextProvider();
    const [optionSelect, setOptionSelect] = useState(null)
    const [data, setData] = useState({})
    const router = useRouter()
    const { state } = router?.query
    console.log("=>>>>>>>",data)

    useEffect(() => {
        if (state) {
            setOptionSelect(state)
        } else {
            setOptionSelect(0)
        }
    }, [])

    useEffect(async () => {
        const data = JSON.parse(await fetchApi({
            query: queries.getAllProducts,
            variables: {},
            development: config?.name
        }));
        const asd = data.reduce((acc, item) => {
            if (!acc.modulos.includes(item.metadata.grupo)) {
                acc.modulos.push(item.metadata.grupo)
            }
            return acc
        }, { modulos: [] })
        setData({ data, ...asd })
    }, [optionSelect])

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
        <div>
            {optionSelect > -1 && dataComponents[optionSelect]?.component}
        </div>
    )
}

