import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { PiCheckFatBold } from "react-icons/pi";
import { FaCheck, FaRegCopy } from "react-icons/fa";


export const SharedUrl = ({ link }) => {
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex flex-col space-y-1 w-full h-32">
      <textarea
        type="text"
        style={{ resize: 'none' }}
        rows={5}
        value={link}
        className="border-[1px] border-gray-300 h-20 w-full text-[10px] text-gray-700 px-2 py-1 flex items-center rounded-sm"
      />
      <ClickAwayListener
        onClickAway={() => {
          setCopied(false);
        }}
      >
        <div>
          <CopyToClipboard text={link}>
            <div
              onClick={() => setCopied(true)}
              className="text-white flex space-x-1 items-center cursor-pointer text-sm w-fit"
            >
              <span className="text-xs py-2">{!copied ? "Copiar enlace" : "Enlace copiado"} </span>
              {!copied ? <FaRegCopy /> : <PiCheckFatBold />}
            </div>
          </CopyToClipboard>
        </div>
      </ClickAwayListener>
    </div>
  );
};
