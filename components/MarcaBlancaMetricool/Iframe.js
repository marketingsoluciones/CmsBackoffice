import { InfoPageMetricool } from "./InfoPageMetricool"

export const IframeMetricool = ({ dataMetricool }) => {
    console.log("Metricol", dataMetricool)

    return (
        <div className="h-full w-full"  >
            {
                dataMetricool != undefined ?
                    <iframe src={dataMetricool && dataMetricool?.whiteLabelLink} width={"100%"} className="h-[89vh] md:h-[100%]"></iframe> :
                    <InfoPageMetricool />
            }
        </div>
    )
}