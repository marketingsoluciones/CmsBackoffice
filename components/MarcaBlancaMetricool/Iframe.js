import { InfoPageMetricool } from "./InfoPageMetricool"

export const IframeMetricool = ({ dataMetricool }) => {
    return (
        <div className="h-full"  >
            {
                dataMetricool != undefined ?
                    <iframe src={dataMetricool && dataMetricool?.whiteLabelLink} width={"100%"} className="h-[89vh] md:h-[100%]"></iframe> :
                    <InfoPageMetricool  />
            }
        </div>
    )
}