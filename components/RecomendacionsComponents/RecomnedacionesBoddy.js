import { GananciasCard, FondosCard } from "../RecomendacionsComponents"

export const RecomendacionesBoddy = () => {
    return (
        <>
            <div className="flex  justify-between">
                <FondosCard />
                <GananciasCard />
            </div>

        </>
    )
}