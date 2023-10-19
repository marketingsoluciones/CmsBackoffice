export const SelectIcon =({ resultadoIcon, setOpenIcon, openIcon}) => {
    return (
        <>
            
                {(() => {
                    if (resultadoIcon != null) {
                        return (
                            <div className='cursor-pointer ' onClick={() => setOpenIcon(!openIcon)}> 
                                {resultadoIcon?.icon}
                            </div>
                        )
                    } else {
                        return (
                            <div className='cursor-pointer flex items-center justify-center w-16' onClick={() => setOpenIcon(!openIcon)}>
                                click
                            </div>
                        )
                    }
                })()}
        </>
    )
}