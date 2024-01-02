import { Switch } from "@chakra-ui/react"
import { SwitchField } from "../../formularios/Inputs/SwitchField"
export const SubHeader = ({ title, time }) => {
    return (
        <div className="w-full px-10 py-4" >
            <div className="space-y-2" >
                <div className="flex w-full justify-between">
                    <span className="text-[14px]">Fecha boda: <span className="text-rosa">{time}</span></span>
                    <div className="flex space-x-4 text-[14px]">
                    
                            <Switch />
                            <span >
                                Reloj se 24 horas
                            </span>
                    
                        <span className="text-rosa cursor-pointer hover:text-pink-500" > Restablecer todo el itinerario</span>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <span className="text-[40px] font-title text-rosa">{title}</span>
                    <div className="w-[70px] bg-rosa h-1 rounded-md" />
                </div>
            </div>
        </div >
    )
}