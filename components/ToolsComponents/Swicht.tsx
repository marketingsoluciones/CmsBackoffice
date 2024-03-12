
export const SwichtC = () => {
    const handleChange = (e) => {
        const stateButton = e.target.checked
        if (stateButton === true) {}
    }
    return (
        <>
                <div className="flex items-center space-x-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" onChange={(e) => { handleChange(e) }} />
                        <div className="w-11 h-6 bg-gray-400 border rounded-full peer:bg-rosa dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-rosa"></div>
                     </label>
                </div>
        </>
    )
}