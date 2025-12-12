import { useRouter } from "next/router"
import { useEffect, useState, useMemo } from "react"
import { InfoLugaresBodas, ItinerarioLugaresBodas, PlantillaSalon } from "../components/LugaresBodasComponents"
import { IframeApp } from "../layouts/IframeApp"
import { SubmenuComponent } from "../components/CateringBodasComponents/SubmenuComponent"
import { Modal } from "../components/modals/Modal"
import { ContactarGold } from "../components/formularios/ContactarGold"
import { BodyStaticAPP } from "../utils/schemas"

const LugaresBodasPage = () => {
    const [optionSelect, setOptionSelect] = useState(4)
    const [modalContacto, setModalContacto] = useState(false)
    const router = useRouter()
    const { stateOriginPath } = router?.query
    
    // Buscar el schema de "Lugares para bodas"
    const lugaresBodasSchema = useMemo(() => {
        const modulo = BodyStaticAPP.find(elem => elem.title === "Módulos")
        return modulo?.children?.find(elem => elem.route === "lugaresBodas")
    }, [])

    useEffect(() => {
        if (stateOriginPath) {
            setOptionSelect(stateOriginPath)
        }
    }, [])

    // Construir dataComponents desde el schema
    const dataComponents = useMemo(() => {
        if (!lugaresBodasSchema?.subComponents) return []
        
        // Función helper para obtener el componente según su nombre (dentro del useMemo para tener acceso a los estados)
        const getComponentByName = (componentName, props = {}) => {
            const componentMap = {
                PlantillaSalon: <PlantillaSalon componentState={optionSelect} setComponentState={setOptionSelect} {...props} />,
                IframeApp: <IframeApp route={props.route} {...props} />,
                ItinerarioLugaresBodas: <ItinerarioLugaresBodas setComponentState={setOptionSelect} {...props} />,
                InfoLugaresBodas: <InfoLugaresBodas setOptionSelect={setOptionSelect} modalContacto={modalContacto} setModalContacto={setModalContacto} {...props} />,
            }
            return componentMap[componentName] || null
        }
        
        return lugaresBodasSchema.subComponents.map((subComp) => {
            const component = subComp.componentName 
                ? getComponentByName(subComp.componentName, { route: subComp.route })
                : null
            
            return {
                icon: subComp.icon,
                title: subComp.title,
                component: component,
                type: subComp.type,
                hidden: subComp.hidden,
            }
        })
    }, [lugaresBodasSchema, optionSelect, modalContacto])

    // Inicializar optionSelect al último índice si no hay stateOriginPath
    useEffect(() => {
        if (!stateOriginPath && dataComponents.length > 0) {
            setOptionSelect(dataComponents.length - 1)
        }
    }, [dataComponents.length, stateOriginPath])

    const handleClickOption = (idx) => {
        setOptionSelect(idx);
    };

    // Filtrar componentes ocultos para el submenu (no mostrar el último que es InfoLugaresBodas)
    const newArryDataComponents = dataComponents.filter(comp => !comp.hidden)

    if (!dataComponents.length) return null

    return (
        <>
            <div className={`md:flex h-full ${dataComponents[optionSelect]?.type !== "iframe" && "w-full"}`}>
                <SubmenuComponent dataComponents={newArryDataComponents} optionSelect={optionSelect} onClick={handleClickOption} />
                <div className="md:flex-1">
                    {dataComponents[optionSelect]?.component}
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