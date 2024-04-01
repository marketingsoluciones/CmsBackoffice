import React, { useEffect, useState } from 'react'
import ClickAwayListener from 'react-click-away-listener'

export const ModalRight = ({ children, state, set, ...rest }) => {
  const [initial, setInitial] = useState("translate-x-full")
  const newState = state.state
  console.log("555",newState)
  useEffect(() => {
    let timeout = setTimeout(() => {
      setInitial("translate-x-0")
    }, 100);
    return () => {
      clearTimeout(timeout)
    }
  }, [])


  return (
    <>
      <div className={`z-40 fixed top-0 left-0 w-full h-screen backdrop-filter  `} />
      <ClickAwayListener onClickAway={() => newState && set(false)} >
        <div
          className={`w-full sm:w-3/4 lg:w-1/3 z-50 absolute bg-white p-10 top-0 right-0 h-full md:rounded-r-2xl shadow-lg flex flex-col items-center justify-center transform transition duration-300  ${state ? initial : "-translate-x-full"} `} {...rest} >
          <span
            onClick={() => set(false)}
            className="font-display text-gray-500 hover:text-gray-300 transition cursor-pointer text-2xl absolute top-5 left-5">X</span>
          {children}
        </div>
      </ClickAwayListener>
      <style jsx>
        {`
              .backlayout::before {
                content:"";
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.5);
                position: absolute;
                z-index: 70;
                top: 0;
                left: 0;
              }

              

              
              `}
      </style>
    </>
  )
}

