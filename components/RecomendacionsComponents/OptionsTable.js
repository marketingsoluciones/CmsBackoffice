export const OptionsTable = ({DataOptionsTable,optionSelect , onClick}) => {

    

    return (
        <div className="bg-white flex space-x-3 ">
            {
                DataOptionsTable.map((item, idx) => {
                    return (
                            <div onClick={()=> onClick(idx)} key={idx} className={`text-[15px] cursor-pointer ${optionSelect === idx  ? "text-rosa border-b border-rosa":""} `}>
                                {item.title}
                            </div>
                    )
                })
            }

        </div>
    )
}