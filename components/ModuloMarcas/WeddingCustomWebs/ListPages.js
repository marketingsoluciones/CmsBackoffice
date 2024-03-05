import { useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { IoCloseSharp } from "react-icons/io5";


export const ListPages = ({ item, app, pages, setPages, isPageSelect, setIsPageSelect }) => {
  const [showRename, setShowRename] = useState(false);
  const [value, setValue] = useState(item?.name ? item?.name : "");

  const handleOnBlur = () => {
    app.methods.renamePage(item?.id, value)
    const f1 = pages.findIndex(elem => elem.id === item.id)
    pages[f1].name = value
    setPages([...pages])
  }

  return (
    <ClickAwayListener onClickAway={() => setShowRename(false)} >
      <div onDoubleClick={() => setShowRename(true)} className={`${isPageSelect === item?.id ? "bg-gray-500" : "bg-gray-800"} h-7 w-full selected flex items-center justify-center text-white text-xs hover:bg-gray-600 pl-1`}>
        {!showRename
          ? <span className="flex-1 select-none flex items-center" onClick={() => {
            app?.methods?.selectPage(item?.id)
            setIsPageSelect(item?.id)
          }} >
            {item?.name}
          </span> :
          <input onBlur={() => handleOnBlur()} type="text" value={value} onChange={(e) => setValue(e.target.value)} className="text-gray-800 w-24 select-none" onClick={() => { app?.methods?.selectPage(item?.id); }} />
        }
        {!showRename && <span
          className="flex justify-center w-5 h-5 cursor-pointer"
          onClick={() => {
            app.methods.renamePage(item?.id)
            // !app.methods.isSelected(item) &&
            //   app.methods.removePage(item?.id);
          }}
        >
          {<IoCloseSharp className={`x-6 h-6 ${isPageSelect !== item?.id ? "text-white" : "text-gray-400"}`} />}
        </span>}
      </div>
    </ClickAwayListener >
  );
};
