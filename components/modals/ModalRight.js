import React, { useEffect, useState } from 'react'
import ClickAwayListener from 'react-click-away-listener'

export const ModalRight = ({ children, state, styles, set, ...rest }) => {
  const [initial, setInitial] = useState("translate-x-full")
  const newState = state.state
  console.log("555", newState)
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
          className={`${styles} w-full sm:w-3/4 lg:w-1/4 z-50 absolute bg-white  top-0 right-0 h-full md:rounded-r-2xl shadow-lg flex flex-col  transform transition duration-300  ${state ? initial : "-translate-x-full"} `} {...rest} >
          <span
            onClick={() => set(false)}
            className="font-display text-gray-500 hover:text-gray-300 transition cursor-pointer text-2xl absolute top-5 left-5 ">X</span>
          {children}
        </div>
      </ClickAwayListener>

    </>
  )
}

