import { useEffect, useState } from "react"
import { SocketContextProvider, AuthContextProvider } from "../context"


export const IframeApp = ({ route }) => {
  const [isMounted, setIsMounted] = useState(false)
  const { setShowApp } = AuthContextProvider()
  const { socket, fatherID } = SocketContextProvider()
  const [prevRoute, setPrevRoute] = useState("")

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true)
      setShowApp(true)
    }
    return () => {
      if (isMounted) {
        setShowApp(false)
      }
    }
  }, [isMounted])

  useEffect(() => {
    if (prevRoute !== route) {
      socket?.emit(`cms:message`, {
        emit: fatherID,
        receiver: fatherID,
        type: "setRoute",
        payload: {
          action: "setRoute",
          value: route
        }
      });
      setPrevRoute(route)
    }
  }, [route])

  return (
    <></>
  )
}