import { AddIcon } from "../../Icons/index"

export const SelectIcon =({ resultadoIcon, setOpenIcon, openIcon}) => {
    return (
        <>
            
                {(() => {
                    if (resultadoIcon != null) {
                        return (
                            <div className='cursor-pointer flex items-center justify-center w-[100px] ' onClick={() => setOpenIcon(!openIcon)}> 
                                {resultadoIcon?.icon}
                            </div>
                        )
                    } else {
                        return (
                            <div className='cursor-pointer flex items-center justify-center w-[100px] w-12*  text-gray-600 hover:text-gray-800' onClick={() => setOpenIcon(!openIcon)}>
                                <AddIcon/>
                            </div>
                        )
                    }
                })()}
        </>
    )
}