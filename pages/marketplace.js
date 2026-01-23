import { useRouter } from "next/router"
import { useEffect, useState, useMemo } from "react"
import { MarketPlaceManager } from "../components/MarketPlace"
import { CustomWebsControl } from "../components/ModuloMarcas/WeddingCustomWebs"
import { BodyStaticAPP } from "../utils/schemas"

// Mapeo de componentName a componentes reales
const componentMap = {
    CustomWebsNovios: CustomWebsControl,
    CustomWebsEmpresa: CustomWebsControl,
    MarketPlaceManager: MarketPlaceManager,
}

const Marketplace = () => {
    const [optionSelect, setOptionSelect] = useState(0)
    const [page, setPage] = useState("principal")
    const router = useRouter()
    const { subComponent, stateOriginPath } = router?.query

    // Obtener el schema de "Tienda" desde BodyStaticAPP
    const marketplaceSchema = useMemo(() => {
        const marketplaceGroup = BodyStaticAPP.find(group => group.title === "Marketplace")
        if (!marketplaceGroup?.children) return null
        
        return marketplaceGroup.children.find(child => child.route === "marketplace")
    }, [])

    // Construir dataComponents dinámicamente desde el schema
    const dataComponents = useMemo(() => {
        if (!marketplaceSchema?.subComponents) {
            return [
                {
                    title: "Novios",
                    componentName: "CustomWebsNovios"
                },
                {
                    title: "empresa",
                    componentName: "CustomWebsEmpresa"
                },
                {
                    componentName: "MarketPlaceManager",
                    hidden: true
                },
            ]
        }

        return marketplaceSchema.subComponents
            .map((sub, originalIdx) => {
                const Component = componentMap[sub.componentName]
                
                // Si no existe el componente en el mapa, retornar null
                if (!Component) return null

                return {
                    icon: sub.icon,
                    title: sub.title,
                    componentName: sub.componentName,
                    originalIndex: originalIdx,
                    hidden: sub.hidden
                }
            })
            .filter(item => item !== null) // Filtrar nulls
    }, [marketplaceSchema])

    // Renderizar el componente actual dinámicamente (memorizado)
    const currentComponentElement = useMemo(() => {
        const current = dataComponents[optionSelect]
        if (!current) return null

        const Component = componentMap[current.componentName]
        if (!Component) return null

        // Renderizar el componente con las props necesarias
        if (current.componentName === "CustomWebsNovios") {
            return <Component setPage={setPage} page={page} type={"novios"} />
        } else if (current.componentName === "CustomWebsEmpresa") {
            return <Component setPage={setPage} page={page} type={"empresa"} />
        } else if (current.componentName === "MarketPlaceManager") {
            return <Component />
        }

        return null
    }, [dataComponents, optionSelect, page])

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
        
        // Por defecto, mostrar MarketPlaceManager si existe, sino el primero
        const managerIndex = dataComponents.findIndex(item => item.componentName === "MarketPlaceManager")
        if (managerIndex !== -1) {
            setOptionSelect(managerIndex)
        } else if (dataComponents.length > 0) {
            setOptionSelect(0)
        }
    }, [subComponent, stateOriginPath, dataComponents])
    
    return (
        <div className="h-full w-full">
            {currentComponentElement}
        </div>
    )
}

export default Marketplace