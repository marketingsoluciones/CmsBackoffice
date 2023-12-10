import { ArrowLeft } from "../Icons/index"

export const ArrowBackComponent = ({action}) => {
    return (
        <div onClick={() => action() } className="w-5 h-5 absolute* z-10 top-2 left-3 text-gray-700 cursor-pointer">
            <ArrowLeft />
        </div>
    )
}