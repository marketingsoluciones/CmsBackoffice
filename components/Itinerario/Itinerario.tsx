import { BoddyIter } from "./BoddyIter"
import { HeaderIter } from "./HeaderIter"

export const Itinerario = () => {
    return (<>
        <div className="space-y-4">
            <HeaderIter />
            <BoddyIter />
        </div>
    </>)
}