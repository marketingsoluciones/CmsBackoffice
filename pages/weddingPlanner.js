import { useRouter } from "next/router"
import { CorreoIcon, InvitadosCatering, ItinerarioCatering, PresupuestoIcon, Webs } from "../components/Icons/index"
import { useEffect, useState, useMemo } from "react"
import { InfoWeddinPlannrePage, ItinerarioWeddingPlanner } from "../components/WeddingPlannerComponents"
import { CustomWebsTable } from "../components/ModuloMarcas/WeddingCustomWebs"
import { IframeApp } from "../layouts/IframeApp"
import { Modal } from "../components/modals/Modal"
import { ContactarGold } from "../components/formularios/ContactarGold"
import { BodyStaticAPP } from "../utils/schemas"

// Mapeo de componentName a componentes reales
const componentMap = {
    IframeApp: IframeApp,
    ItinerarioWeddingPlanner: ItinerarioWeddingPlanner,
    CustomWebsTable: CustomWebsTable,
    InfoWeddinPlannrePage: InfoWeddinPlannrePage,
}

const WeddingPlannerPage = () => {
    const [optionSelect, setOptionSelect] = useState(0)
    const [modalContacto, setModalContacto] = useState(false)
    const router = useRouter()
    const { subComponent, stateOriginPath } = router?.query

    // Obtener el schema de "Wedding Planner" desde BodyStaticAPP
    const weddingPlannerSchema = useMemo(() => {
        const modulosGroup = BodyStaticAPP.find(group => group.title === "Módulos")
        if (!modulosGroup?.children) return null
        
        return modulosGroup.children.find(child => child.route === "weddingPlanner")
    }, [])

    // Construir dataComponents dinámicamente desde el schema (sin crear los componentes JSX)
    const dataComponents = useMemo(() => {
        if (!weddingPlannerSchema?.subComponents) {
            return [
                {
                    icon: <InvitadosCatering />,
                    title: "Lista de invitados",
                    type: "iframe",
                    route: "invitados",
                    componentName: "IframeApp"
                },
                {
                    icon: <PresupuestoIcon />,
                    title: "Presupuesto",
                    type: "iframe",
                    route: "presupuesto",
                    componentName: "IframeApp"
                },
                {
                    icon: <CorreoIcon />,
                    title: "Invitaciones",
                    type: "iframe",
                    route: "invitaciones",
                    componentName: "IframeApp"
                },
                {
                    icon: <ItinerarioCatering />,
                    title: "Intinerarios",
                    componentName: "ItinerarioWeddingPlanner"
                },
                {
                    icon: <Webs />,
                    title: "Mis Webs",
                    componentName: "CustomWebsTable"
                },
                {
                    componentName: "InfoWeddinPlannrePage",
                    hidden: true
                },
            ]
        }

        return weddingPlannerSchema.subComponents
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
    }, [weddingPlannerSchema])

    // Renderizar el componente actual dinámicamente (memorizado)
    const currentComponentElement = useMemo(() => {
        const current = dataComponents[optionSelect]
        if (!current) return null

        const Component = componentMap[current.componentName]
        if (!Component) return null

        // Renderizar el componente con las props necesarias
        if (current.componentName === "IframeApp") {
            return <Component route={current.route} />
        } else if (current.componentName === "ItinerarioWeddingPlanner") {
            return <Component setComponentState={setOptionSelect} />
        } else if (current.componentName === "CustomWebsTable") {
            return <Component setComponentState={setOptionSelect} />
        } else if (current.componentName === "InfoWeddinPlannrePage") {
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
        
        // Por defecto, mostrar InfoWeddinPlannrePage si existe, sino el primero
        const infoIndex = dataComponents.findIndex(item => item.componentName === "InfoWeddinPlannrePage")
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

export default WeddingPlannerPage