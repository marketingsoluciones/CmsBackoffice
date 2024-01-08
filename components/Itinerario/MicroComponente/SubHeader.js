import { Switch } from "@chakra-ui/react"
import { SwitchField } from "../../formularios/Inputs/SwitchField"
export const SubHeader = ({ title, time }) => {

    const handleChange = (e) => {
        const stateButton = e.target.checked
    }

    return (
        <div className="w-full px-10 py-4" >
            <div className="space-y-2" >
                <div className="flex w-full justify-between">
                    <span className="text-[14px]">Fecha boda: <span className="text-rosa">{time}</span></span>
                    <div className="flex space-x-4 text-[14px]">

                        <div className="flex items-center space-x-2">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" className="sr-only peer" onChange={(e) => { handleChange(e) }} />
                                <div className="w-11 h-6 bg-gray-400 border rounded-full peer:bg-rosa dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-rosa"></div>
                            </label>
                        </div>
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