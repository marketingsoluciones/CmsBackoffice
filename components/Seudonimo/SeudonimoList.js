import { Avatar } from "@chakra-ui/react";

export const SeudonimoList = ({  listDown, setListDown, setFoundList,nickNames  }) => {
    return (
        <>
            <div className="bg-white rounded-xl p-3 space-y-0.5 w-[200px]  overflow-auto  h-[11rem] shadow-xl">
                {nickNames.map((item, idx) => {
                    return(
                    <div
                        key={idx}
                        onClick={() => [setListDown(!listDown), setFoundList(item?.nickName)]}
                        className="flex  items-center gap-3 cursor-pointer hover:bg-gray-300 rounded-xl p-2  ">
                        <div >
                            {item?.icon?item.imgAvatar: <Avatar h={"35px"} w={"35px"}/>}
                        </div>
                        <span
                            className="text-sm truncate"
                        > {item?.nickName}</span>
                    </div>
                    )
                })}
            </div>
        </>
    )
}
