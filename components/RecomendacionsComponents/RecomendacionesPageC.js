import { useState } from "react";
import { OptionsTable, RcDataTable, RecomendacionesBoddy, RecomendacionesHeader } from "."

export const RecomendacionesPageC = () => {
    const [optionSelect, setOptionSelect] = useState(0)
    const DataOptionsTable = [
        {
            title: "Recomendaciones y recompensas",
            componente: <RcDataTable/>
        },
        {
            title: "Historial de actividad",
            componente: <RcDataTable/>
        },
        {
            title: "Estado de referidos",
            componente: <RcDataTable/>
        },
        {
            title: "Monedero",
            componente: <RcDataTable/>
        },
        {
            title: "Facturación de eventos",
            componente: <RcDataTable/>
        },
    ]
    
    const handleClickOption = (idx) => {
        setOptionSelect(idx);
    };
    
    return (
        <div className="space-y-3">
            <RecomendacionesHeader />
            <RecomendacionesBoddy />

            <div className="bg-white px-4 py-4 space-y-4" >
                <OptionsTable DataOptionsTable={DataOptionsTable} onClick={handleClickOption}  optionSelect={optionSelect}/>

                {DataOptionsTable[optionSelect].componente}
            </div>
        </div>
    )
}