import { ItinerarioInfoPage } from "./ItinerarioComponents/ItinerarioInfoPage"
import { EventsGroupContextProvider } from "../../context/EventsGroupContext"
import { SocketContextProvider } from "../../context"

export const ItinerarioWeddingPlanner = ({ setComponentState }) => {
    const { eventsGroup } = EventsGroupContextProvider()
    const { fatherID } = SocketContextProvider()
    const path = window?.origin?.includes("://testcms.") ? process.env.NEXT_PUBLIC_EVENTSAPP?.replace("//", "//test") ?? "" : process.env.NEXT_PUBLIC_EVENTSAPP ?? ""
    return (
        eventsGroup.length !== 0
            ? < div className="h-full " >
                <iframe src={`${path}/itinerario/?show=iframe&father=${fatherID}`} width={"100%"} className="h-[89vh] md:h-[100%]"></iframe>
            </div >
            : <ItinerarioInfoPage setComponentState={setComponentState} idxComponent={4} />
    )
}