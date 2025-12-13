import { useRouter } from "next/router"
import { InvitadosCatering, ItinerarioCatering, MesasICon, PlanoEventoIcon } from "../components/Icons/index"
import { useEffect, useState, useMemo } from "react"
import { InfoLugaresBodas, ItinerarioLugaresBodas, PlantillaSalon } from "../components/LugaresBodasComponents"
import { IframeApp } from "../layouts/IframeApp"
import { SubmenuComponent } from "../components/CateringBodasComponents/SubmenuComponent"
import { Modal } from "../components/modals/Modal"
import { ContactarGold } from "../components/formularios/ContactarGold"
import { BodyStaticAPP } from "../utils/schemas"

// Mapeo de componentName a componentes reales
const componentMap = {
    PlantillaSalon: PlantillaSalon,
    IframeApp: IframeApp,
    ItinerarioLugaresBodas: ItinerarioLugaresBodas,
    InfoLugaresBodas: InfoLugaresBodas,
}

const LugaresBodasPage = () => {
    const [optionSelect, setOptionSelect] = useState(0)
    const [modalContacto, setModalContacto] = useState(false)
    const router = useRouter()
    const { subComponent, stateOriginPath } = router?.query

    // Obtener el schema de "Lugares para bodas" desde BodyStaticAPP
    const lugaresBodasSchema = useMemo(() => {
        const modulosGroup = BodyStaticAPP.find(group => group.title === "Módulos")
        if (!modulosGroup?.children) return null
        
        return modulosGroup.children.find(child => child.route === "lugaresBodas")
    }, [])

    // Construir dataComponents dinámicamente desde el schema
    const dataComponents = useMemo(() => {
        if (!lugaresBodasSchema?.subComponents) {
            // Fallback al array original si no hay schema
            return [
                {
                    icon: <MesasICon />,
                    title: "Plantillas del salón",
                    component: <PlantillaSalon componentState={optionSelect} setComponentState={setOptionSelect} />,
                    componentName: "PlantillaSalon"
                },
                {
                    icon: <PlanoEventoIcon />,
                    title: "Plano del evento",
                    component: <IframeApp route="mesas" />,
                    type: "iframe",
                    route: "mesas",
                    componentName: "IframeApp"
                },
                {
                    icon: <InvitadosCatering />,
                    title: "Lista de invitados",
                    component: <IframeApp route="invitados" />,
                    type: "iframe",
                    route: "invitados",
                    componentName: "IframeApp"
                },
                {
                    icon: <ItinerarioCatering />,
                    title: "Intinerarios",
                    component: <ItinerarioLugaresBodas setComponentState={setOptionSelect} />,
                    componentName: "ItinerarioLugaresBodas"
                },
                {
                    component: <InfoLugaresBodas setOptionSelect={setOptionSelect} modalContacto={modalContacto} setModalContacto={setModalContacto} />,
                    componentName: "InfoLugaresBodas"
                },
            ]
        }

        return lugaresBodasSchema.subComponents
            .map((sub, originalIdx) => {
                const Component = componentMap[sub.componentName]
                
                // Si no existe el componente en el mapa, retornar null
                if (!Component) return null

                // Renderizar el componente con las props necesarias
                let componentElement = null
                
                if (sub.componentName === "PlantillaSalon") {
                    componentElement = <Component componentState={optionSelect} setComponentState={setOptionSelect} />
                } else if (sub.componentName === "IframeApp") {
                    componentElement = <Component route={sub.route} />
                } else if (sub.componentName === "ItinerarioLugaresBodas") {
                    componentElement = <Component setComponentState={setOptionSelect} />
                } else if (sub.componentName === "InfoLugaresBodas") {
                    componentElement = <Component setOptionSelect={setOptionSelect} modalContacto={modalContacto} setModalContacto={setModalContacto} />
                }

                return {
                    icon: sub.icon,
                    title: sub.title,
                    component: componentElement,
                    type: sub.type,
                    route: sub.route,
                    componentName: sub.componentName,
                    originalIndex: originalIdx,
                    hidden: sub.hidden
                }
            })
            .filter(item => item !== null) // Filtrar nulls
    }, [lugaresBodasSchema, optionSelect, modalContacto])

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
        
        // Por defecto, mostrar InfoLugaresBodas si existe, sino el primero
        const infoIndex = dataComponents.findIndex(item => item.componentName === "InfoLugaresBodas")
        if (infoIndex !== -1) {
            setOptionSelect(infoIndex)
        } else if (dataComponents.length > 0) {
            setOptionSelect(0)
        }
    }, [subComponent, stateOriginPath, dataComponents])

    const handleClickOption = (idx) => {
        setOptionSelect(idx)
        // Actualizar la URL sin recargar la página
        const selectedComponent = dataComponents[idx]
        if (selectedComponent?.route) {
            router.push({
                pathname: router.pathname,
                query: { ...router.query, subComponent: selectedComponent.route }
            }, undefined, { shallow: true })
        } else if (selectedComponent?.componentName) {
            router.push({
                pathname: router.pathname,
                query: { ...router.query, subComponent: selectedComponent.componentName }
            }, undefined, { shallow: true })
        }
    }

    // Filtrar componentes para el submenu (excluir InfoLugaresBodas y hidden)
    const newArryDataComponents = useMemo(() => {
        return dataComponents.filter(item => 
            item.componentName !== "InfoLugaresBodas" && !item.hidden
        )
    }, [dataComponents])
    
    // Ajustar optionSelect cuando se filtra el array para el submenu
    const adjustedOptionSelect = useMemo(() => {
        const selectedComponent = dataComponents[optionSelect]
        if (!selectedComponent) return 0
        
        // Si el componente seleccionado está oculto o es InfoLugaresBodas, buscar el índice en el array filtrado
        if (selectedComponent.hidden || selectedComponent.componentName === "InfoLugaresBodas") {
            // Mantener el componente seleccionado pero ajustar el índice para el submenu
            return optionSelect
        }
        
        // Encontrar el índice en el array filtrado
        const indexInFiltered = newArryDataComponents.findIndex(
            item => item.componentName === selectedComponent.componentName || item.route === selectedComponent.route
        )
        return indexInFiltered !== -1 ? indexInFiltered : 0
    }, [optionSelect, dataComponents, newArryDataComponents])

    // Función para manejar clicks en el submenu que mapea índices correctamente
    const handleSubmenuClick = (filteredIndex) => {
        const selectedComponent = newArryDataComponents[filteredIndex]
        if (!selectedComponent) return
        
        // Encontrar el índice real en dataComponents
        const realIndex = dataComponents.findIndex(
            item => item.componentName === selectedComponent.componentName || item.route === selectedComponent.route
        )
        if (realIndex !== -1) {
            handleClickOption(realIndex)
        }
    }
    
    const currentComponent = dataComponents[optionSelect]
    
    return (
        <>
            <div className={`md:flex h-full ${!currentComponent?.type || currentComponent.type !== "iframe" ? "w-full" : ""}`}>
                <SubmenuComponent 
                    dataComponents={newArryDataComponents} 
                    optionSelect={adjustedOptionSelect} 
                    onClick={handleSubmenuClick} 
                />
                <div className="md:flex-1">
                    {currentComponent?.component}
                </div>
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

export default LugaresBodasPage