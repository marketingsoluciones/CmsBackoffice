import { useRouter } from "next/router"
import { InvitadosCatering, ItinerarioCatering, MenuCatering, PlatillOpenCatering, PlatilloCloseCatering } from "../components/Icons/index"
import { useEffect, useState, useMemo } from "react"
import { CartaProducto, InfoCateringBodas, ItinerarioC, MenuEmpresa, PlantillaMenu } from "../components/CateringBodasComponents"
import { IframeApp } from "../layouts/IframeApp"
import { Modal } from "../components/modals/Modal"
import { ContactarGold } from "../components/formularios/ContactarGold"
import { BodyStaticAPP } from "../utils/schemas"

// Mapeo de componentName a componentes reales
const componentMap = {
    CartaProducto: CartaProducto,
    PlantillaMenu: PlantillaMenu,
    MenuEmpresa: MenuEmpresa,
    IframeApp: IframeApp,
    ItinerarioC: ItinerarioC,
    InfoCateringBodas: InfoCateringBodas,
}

const CateringBodasPage = () => {
    const [optionSelect, setOptionSelect] = useState(0)
    const [modalContacto, setModalContacto] = useState(false)
    const router = useRouter()
    const { subComponent, stateOriginPath } = router?.query

    // Obtener el schema de "Catering de bodas" desde BodyStaticAPP
    const cateringBodasSchema = useMemo(() => {
        const modulosGroup = BodyStaticAPP.find(group => group.title === "Módulos")
        if (!modulosGroup?.children) return null
        
        return modulosGroup.children.find(child => child.route === "cateringBodas")
    }, [])

    // Construir dataComponents dinámicamente desde el schema (sin crear los componentes JSX)
    const dataComponents = useMemo(() => {
        if (!cateringBodasSchema?.subComponents) {
            return [
                {
                    icon: <PlatillOpenCatering />,
                    title: "Carta de productos",
                    componentName: "CartaProducto"
                },
                {
                    icon: <MenuCatering />,
                    title: "Plantillas de menú",
                    componentName: "PlantillaMenu"
                },
                {
                    icon: <PlatilloCloseCatering />,
                    title: "Menú",
                    componentName: "MenuEmpresa"
                },
                {
                    icon: <InvitadosCatering />,
                    title: "Lista de Invitados",
                    type: "iframe",
                    route: "invitados",
                    componentName: "IframeApp"
                },
                {
                    icon: <ItinerarioCatering />,
                    title: "Itinerarios",
                    componentName: "ItinerarioC"
                },
                {
                    componentName: "InfoCateringBodas",
                    hidden: true
                },
            ]
        }

        return cateringBodasSchema.subComponents
            .map((sub, originalIdx) => {
                const Component = componentMap[sub.componentName]
                
                // Si no existe el componente en el mapa, retornar null
                if (!Component) return null

                return {
                    icon: sub.icon,
                    title: sub.title,
                    type: sub.type,
                    route: sub.route,
                    componentName: sub.componentName,
                    originalIndex: originalIdx,
                    hidden: sub.hidden
                }
            })
            .filter(item => item !== null) // Filtrar nulls
    }, [cateringBodasSchema])

    // Renderizar el componente actual dinámicamente (memorizado)
    const currentComponentElement = useMemo(() => {
        const current = dataComponents[optionSelect]
        if (!current) return null

        const Component = componentMap[current.componentName]
        if (!Component) return null

        // Renderizar el componente con las props necesarias
        if (current.componentName === "CartaProducto") {
            return <Component setComponentState={setOptionSelect} />
        } else if (current.componentName === "PlantillaMenu") {
            return <Component setComponentState={setOptionSelect} />
        } else if (current.componentName === "MenuEmpresa") {
            return <Component setComponentState={setOptionSelect} />
        } else if (current.componentName === "IframeApp") {
            return <Component route={current.route} />
        } else if (current.componentName === "ItinerarioC") {
            return <Component setComponentState={setOptionSelect} />
        } else if (current.componentName === "InfoCateringBodas") {
            return <Component setOptionSelect={setOptionSelect} modalContacto={modalContacto} setModalContacto={setModalContacto} />
        }

        return null
    }, [dataComponents, optionSelect, modalContacto])

    // Determinar qué componente mostrar basado en query params o ruta
    useEffect(() => {
        if (subComponent) {
            // Buscar el índice del subComponent por route o componentName
            const foundIndex = dataComponents.findIndex(
                item => item.route === subComponent || item.componentName === subComponent
            )
            if (foundIndex !== -1) {
                setOptionSelect(foundIndex)
                return
            }
        }
        
        if (stateOriginPath) {
            // Mantener compatibilidad con stateOriginPath (índice numérico)
            const parsed = parseInt(stateOriginPath)
            if (!isNaN(parsed) && parsed >= 0 && parsed < dataComponents.length) {
                setOptionSelect(parsed)
                return
            }
        }
        
        // Por defecto, mostrar InfoCateringBodas si existe, sino el primero
        const infoIndex = dataComponents.findIndex(item => item.componentName === "InfoCateringBodas")
        if (infoIndex !== -1) {
            setOptionSelect(infoIndex)
        } else if (dataComponents.length > 0) {
            setOptionSelect(0)
        }
    }, [subComponent, stateOriginPath, dataComponents])

    const currentComponent = dataComponents[optionSelect]
    
    return (
        <>
            <div className={`h-full ${!currentComponent?.type || currentComponent.type !== "iframe" ? "w-full" : ""}`}>
                {currentComponentElement}
            </div>
            {
                modalContacto ? (
                    <Modal classe={"w-[28%] h-[86%]"}>
                        <ContactarGold openModal={modalContacto} setOpenModal={setModalContacto} />
                    </Modal>
                ) :
                    null
            }
        </>
    )
}

export default CateringBodasPage