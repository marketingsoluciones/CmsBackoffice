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


type Context = {
  socket: Socket | null;
  //setSocket : Dispatch<SetStateAction<Socket | null>>
};

const initialContext: Context = {
  socket: null,
  //setSocket : () => {}
};

const SocketContext = createContext<Context>(initialContext);

const SocketProvider: FC<any> = ({ children }): JSX.Element => {
  const { user, config } = AuthContextProvider()
  const [socket, setSocket] = useState<Socket | null>(initialContext.socket);

  useEffect(() => {
    const token = Cookies.get("idToken")
    if (token && !socket?.connected) {
      console.log("Conecta...")
      setSocket(api.socketIO({ token, development: config?.name }))
    }
    if (!token && socket) {
      console.log("=======> desconecta...")
      socket.disconnect();
    }
  }, [user])

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

const SocketContextProvider = () => useContext(SocketContext)

export { SocketProvider, SocketContextProvider };
