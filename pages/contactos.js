import { useRouter } from "next/router"
import { useEffect, useState, useMemo } from "react"
import { ContactosComponent, EmpresasComponent, InfoContactosPage } from "../components/ContactosComponents"
import { BodyStaticAPP } from "../utils/schemas"

// Mapeo de componentName a componentes reales
const componentMap = {
    ContactosComponent: ContactosComponent,
    EmpresasComponent: EmpresasComponent,
    InfoContactosPage: InfoContactosPage,
}

const contactosPage = () => {
    const [optionSelect, setOptionSelect] = useState(0)
    const router = useRouter()
    const { subComponent, stateOriginPath } = router?.query

    // Obtener el schema de "Contactos" desde BodyStaticAPP
    const contactosSchema = useMemo(() => {
        const chatGroup = BodyStaticAPP.find(group => group.title === "Chat en línea")
        if (!chatGroup?.children) return null
        
        return chatGroup.children.find(child => child.route === "contactos")
    }, [])

    // Construir dataComponents dinámicamente desde el schema
    const dataComponents = useMemo(() => {
        if (!contactosSchema?.subComponents) {
            return [
                {
                    icon: null,
                    title: "Personas",
                    componentName: "ContactosComponent"
                },
                {
                    icon: null,
                    title: "Empresas",
                    componentName: "EmpresasComponent"
                },
                {
                    componentName: "InfoContactosPage",
                    hidden: true
                },
            ]
        }

        return contactosSchema.subComponents
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
    }, [contactosSchema])

    // Renderizar el componente actual dinámicamente (memorizado)
    const currentComponentElement = useMemo(() => {
        const current = dataComponents[optionSelect]
        if (!current) return null

        const Component = componentMap[current.componentName]
        if (!Component) return null

        // Renderizar el componente con las props necesarias
        if (current.componentName === "ContactosComponent") {
            return <Component setOptionSelect={setOptionSelect} />
        } else if (current.componentName === "EmpresasComponent") {
            return <Component setOptionSelect={setOptionSelect} />
        } else if (current.componentName === "InfoContactosPage") {
            return <Component />
        }

        return null
    }, [dataComponents, optionSelect])

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
        
        // Por defecto, mostrar InfoContactosPage si existe, sino el primero
        const infoIndex = dataComponents.findIndex(item => item.componentName === "InfoContactosPage")
        if (infoIndex !== -1) {
            setOptionSelect(infoIndex)
        } else if (dataComponents.length > 0) {
            setOptionSelect(0)
        }
    }, [subComponent, stateOriginPath, dataComponents])

    const currentComponent = dataComponents[optionSelect]
    
    return (
        <>
            <div className="w-full h-full flex">
                {currentComponentElement}
            </div>
        </>
    )
}

export default contactosPage