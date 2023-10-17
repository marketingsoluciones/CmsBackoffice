export const SubmenuComponent = ({dataComponents,optionSelect,onClick }) => {
    return (
        <>
            <div className=" hidden md:block bg-gray-200 px-4 py-10 space-y-5 col-span-1">
                {
                    dataComponents.map((item, idx) => {
                        return (
                            <div  key={idx} onClick={() => onClick(idx)} className={`${optionSelect === idx ? " text-rosa ": ""}flex  items-center  space-x-3 cursor-pointer  `}>
                                <div className="h-full">
                                    {
                                        item.icon
                                    }
                                </div>
                                <div className="text-sm">
                                    {
                                        item.title
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </>
    )
}