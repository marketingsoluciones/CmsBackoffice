export const MenuOptions = ({ DataOptionsArry, optionSelect, onClick }) => {
    return (
        <div className="flex space-x-20 w-full items-center justify-center border-b pt-3 *pb-1">
            {
                DataOptionsArry.map((item, idx) => {
                    return (
                        <div key={idx} onClick={() => onClick(idx)} className={`flex items-center space-x-1 pb-0.5 cursor-pointer ${optionSelect === idx ? " border-b-2 border-rosa text-rosa" : "text-gray-400"} `}>
                            <div>
                                {item.icon}
                            </div>
                            <div>
                                {item.title}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}