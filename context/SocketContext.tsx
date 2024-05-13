import {
  createContext,
  FC,
  useState,
  useEffect,
  useContext,
} from "react";
import { Socket } from "socket.io-client";
import { AuthContextProvider } from ".";
import { api } from '../utils/api';
import Cookies from "js-cookie";
import { nanoid } from 'nanoid'
import { parseJwt } from "../utils/Authentication";


type Context = {
  socket: Socket | null;
  fatherID: string;
  //setSocket : Dispatch<SetStateAction<Socket | null>>
};

const initialContext: Context = {
  socket: null,
  fatherID: nanoid()
  //setSocket : () => {}
};

const SocketContext = createContext<Context>(initialContext);

const SocketProvider: FC<any> = ({ children }): JSX.Element => {
  const { user, config } = AuthContextProvider()
  const [socket, setSocket] = useState<Socket | null>(initialContext.socket);
  const [fatherID, setfatherID] = useState<string>(initialContext.fatherID);

  useEffect(() => {
    const token = Cookies.get("idTokenV0.1.0")
    if (token && !socket?.connected) {
      setSocket(api.socketIO({
        token,
        development: config?.name,
        father: initialContext?.fatherID,
        origin: window?.origin
      }))
    }
    if (!token && socket) {
      socket.disconnect();
    }
  }, [user])

 /*  useEffect(() => {
    socket?.on("connect", () => {
    })
    socket?.on("disconnect", (reason) => {
      console.log(1.00003, "Desconectado", new Date().toLocaleString('es-VE', { timeZone: 'america/Caracas' }),
        reason)
    })
    socket?.on("connect_error", (error) => {
      console.log(1.00003, "Connect_error", new Date().toLocaleString('es-VE', { timeZone: 'america/Caracas' }),
        error)
    })
    socket?.io.on("ping", () => { console.log(1.00003, "ping", new Date().toLocaleString('es-VE', { timeZone: 'america/Caracas' })) })
    socket?.io.on("reconnect", (attempt) => {
      console.log(1.00003, "ping", new Date().toLocaleString('es-VE', { timeZone: 'america/Caracas' }),
        attempt)
    })
    socket?.io.on("reconnect_attempt", (attempt) => {
      console.log(1.00003, "ping", new Date().toLocaleString('es-VE', { timeZone: 'america/Caracas' }),
        attempt)
    })
    socket?.io.on("reconnect_error", (error) => {
      console.log(1.00003, "ping", new Date().toLocaleString('es-VE', { timeZone: 'america/Caracas' }),
        error)
    })
    socket?.io.on("reconnect_failed", () => {
      console.log(1.00003, "ping", new Date().toLocaleString('es-VE', { timeZone: 'america/Caracas' }))
    })

  }, [socket]) */

  return (
    <SocketContext.Provider value={{ socket, fatherID }}>
      {children}
    </SocketContext.Provider>
  );
};

const SocketContextProvider = () => useContext(SocketContext)

export { SocketProvider, SocketContextProvider };
