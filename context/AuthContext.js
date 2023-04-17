import { createContext, useContext, useState, useEffect, useCallback, useReducer } from "react";
import { signInWithCustomToken } from 'firebase/auth'
import Cookies from 'js-cookie'
import { auth, developments } from "../firebase";
import { fetchApi, queries } from "../utils/Fetching";
import { boolean } from "yup";
import { useRouter } from "next/router";


class Action {
  type;
  data;
  constructor(type, data) {
    this.type = type;
    this.data = data;
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case "VIEW":
      return new Action("view", action.payload);
    case "VIEWW":
      return new Action("vieww", action.payload);
    case "EDIT":
      return new Action("edit", action.payload);
    case "CREATE":
      return new Action("create", action.payload);
    case "DELETE":
      return new Action("delete", action.payload);
    default:
      break;
  }
};

const initialContext = {
  user: null,
  setUser: () => null,
  verificationDone: boolean,
  setVerificationDone: () => false
}

const AuthContext = createContext(initialContext);


const AuthProvider = ({ children }) => {
  const r = useRouter()
  //if (r?.query?.d === "app") {
  //}
  const [user, setUser] = useState(initialContext.user);
  const [verificationDone, setVerificationDone] = useState(false);
  const [verificandoCookie, setVerificandoCookie] = useState(null);
  const [state, dispatch] = useReducer(reducer, new Action("view", {}));
  const [development, setDevelopment] = useState(null);
  let resp = undefined
  useEffect(() => {
    const domain = window.location.hostname.split(".")[1]
    resp = developments.filter(elem => elem.name === domain)[0]
    if (!resp?.cookie) {
      console.log(70000, "no hay resp.cookie")
      resp = { cookie: "sessionBodas", name: "bodasdehoy" }
    }
    setDevelopment(resp.name)
    console.log(70001, resp?.cookie)
    auth(resp.name).onAuthStateChanged(async (user) => {
      console.log(70002, user)
      const sessionCookie = Cookies.get(resp?.cookie);
      console.info("Verificando cookie", sessionCookie);
      if (sessionCookie) {
        console.info("Tengo cookie de sesion", user);
        if (user) {
          console.info("Tengo user de contexto firebase");
          await fetchApi({
            query: queries.getUser,
            variables: { uid: user?.uid }
          }).then((moreInfo) => {
            setVerificandoCookie(true)
            console.log(8877, moreInfo)
            moreInfo && console.info("Tengo datos de la base de datos");
            setUser({ ...user, ...moreInfo });
            console.info("Guardo datos en contexto react");
          })
        } else {
          console.info("NO tengo user de contexto de firebase");
          await fetchApi({
            query: queries.authStatus,
            variables: { sessionCookie }
          }).then((asdf) => {
            setVerificandoCookie(true)
            console.log(333, asdf)
            const customToken = asdf?.customToken
            console.info("Llamo con mi sessionCookie para traerme customToken");
            console.info("Custom token", customToken)
            customToken && signInWithCustomToken(auth, customToken);
            console.info("Hago sesion con el custom token");
          })
        }
      } else {
        setVerificandoCookie(true)
      }
      setTimeout(() => {
        setVerificationDone(true)
      }, 800);
    });
  }, []);

  useEffect(() => {
    auth(resp.name).onIdTokenChanged(async user => {
      const sessionCookie = Cookies.get(resp.cookie);
      if (user && sessionCookie) {
        console.log(1111111, "Cookies.set: idToken en ", process.env.NEXT_PUBLIC_DOMINIO ?? "")
        Cookies.set("idToken", await user.getIdToken())
      }
    })
  }, [])


  return (
    <AuthContext.Provider value={{ user, setUser, verificationDone, setVerificationDone, state, dispatch, development, setDevelopment, verificandoCookie, setVerificandoCookie, }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthContextProvider = () => useContext(AuthContext)
export { AuthContextProvider, AuthProvider };
