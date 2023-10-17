export const OptionsButtons = ({ optionsArry,optionSelect,onClick }) => {
    return (
        <>

            {
                optionsArry.map((item, idx) => {
                    return (
                        <button  key={idx} onClick={() => onClick(idx)} className={`${optionSelect === idx ? "text-rosa" : ""}`}>
                            {item.icon}
                        </button>
                    )
                })
            }


        </>
    )

}