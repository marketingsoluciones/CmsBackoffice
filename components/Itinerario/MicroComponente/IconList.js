export const IconList = ({ IterArry , openIcon ,setOpenIcon, setSelectIcon }) => {
    return (
        <>
            <div className="grid grid-cols-4">
                {
                    IterArry.map((item, idx) => (
                        <div key={idx}>
                            <button onClick={() => {setOpenIcon(!openIcon), setSelectIcon(item.id) }}>
                                {item.icon}
                            </button>
                        </div>
                    ))
                }
            </div>
        </>
    )
}