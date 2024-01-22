import { createContext, useContext, useState, useEffect, useCallback, useReducer } from "react";
import { getAuth, signInWithCustomToken } from 'firebase/auth'
import Cookies from 'js-cookie'
import { developments } from "../firebase";
import { fetchApi, queries } from "../utils/Fetching";
import { boolean } from "yup";
import { initializeApp } from "firebase/app";
import { parseJwt } from "../utils/Authentication";



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
  const [user, setUser] = useState(initialContext.user);
  const [verificationDone, setVerificationDone] = useState(false);
  const [verificandoCookie, setVerificandoCookie] = useState(null);
  const [state, dispatch] = useReducer(reducer, new Action("view", {}));
  const [development, setDevelopment] = useState();
  const [domain, setDomain] = useState();
  const [config, setConfig] = useState();
  const [changedForm, setChangedForm] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [geoInfo, setGeoInfo] = useState();


  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true)
    }
    return () => {
      setIsMounted(false)
    }
  }, [])



  //let auth = undefined
  let resp
  useEffect(() => {
    // if (isMounted) {

    const path = window.location.hostname
    //const path = "https://www.bodasdehoy.com"
    const c = path?.split(".")
    const idx = c?.findIndex(el => el === "com")
    /*--------------------------------------------------------------------*/
    const devDomain = ["bodasdehoy", "diariocivitas"]
    const domainDevelop = !!idx && idx !== -1 ? c[idx - 1] : devDomain[0] /*<<<<<<<<<*/
    /*--------------------------------------------------------------------*/
    resp = developments.filter(elem => elem.name === domainDevelop)[0]


    //const domainDevelop = window.location.hostname.split(".")[1]
    const resp = developments.filter(elem => elem.name === domainDevelop)[0]
    if (!resp?.cookie) resp = developments[0]


    setDevelopment(resp.name)
    if (idx === -1 || window.origin.includes("://test")) {
      setDomain(`${process.env.NEXT_PUBLIC_DOMINIO}`)
    } else {
      setDomain(`.${resp.name}.com`)
    }
    try {
      const firebaseClient = initializeApp(resp.fileConfig);
      firebaseClient
    } catch (error) {
      console.log(90001, error)
    }
    //auth = getAuth()
    setConfig(resp)
    // }

  }, [])

  useEffect(() => {
    fetchApi({
      query: queries.getGeoInfo,
      variables: {},
    }).then((geoInfo) => setGeoInfo(geoInfo)).catch((err) => console.log(err))
  }, [])


  useEffect(() => {
    try {
      getAuth().onAuthStateChanged(async (user) => {
        const sessionCookie = Cookies.get(config?.cookie);
        const asd = parseJwt(sessionCookie)
        console.info(8000042, "Verificando cookie", user?.uid, asd?.user_id);
        if (user?.uid !== asd?.user_id) {
          console.log("entro para loguear de nuevo")
          fetchApi({
            query: queries.authStatus,
            variables: { sessionCookie },
            development: config?.name
          }).then((asdf) => {
            console.log(11145, "asdf", asdf)
            const customToken = asdf?.customToken
            console.info("Llamo con mi sessionCookie para traerme customToken");
            console.info("Custom token", customToken)
            customToken && signInWithCustomToken(getAuth(), customToken).then(
              setVerificandoCookie(true)
            )
            console.info("Hago sesion con el custom token****");
          })
        }
        if (sessionCookie) {
          console.info("Tengo cookie de sesion", user);
          if (user) {
            console.info("Tengo user de contexto firebase");
            await fetchApi({
              query: queries.getUser,
              variables: { uid: user?.uid },
              development: config?.name
            }).then((moreInfo) => {
              moreInfo && console.info("Tengo datos de la base de datos");
              setUser({ ...user, ...moreInfo });
              console.info("Guardo datos en contexto react");
              setTimeout(() => {
                setVerificandoCookie(true)
              }, 50);
            })
          } else {
            console.info("NO tengo user de contexto de firebase");
            fetchApi({
              query: queries.authStatus,
              variables: { sessionCookie },
              development: config?.name
            }).then((asdf) => {
              const customToken = asdf?.customToken
              console.info("Llamo con mi sessionCookie para traerme customToken");
              console.info("Custom token", customToken)
              customToken && signInWithCustomToken(getAuth(), customToken).then(
                setVerificandoCookie(true)
              )
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
    } catch (error) {
      console.log(90002, error)
    }

  }, [config]);

  useEffect(() => {
    getAuth().onIdTokenChanged(async user => {
      const sessionCookie = Cookies.get(config?.cookie);
      if (user && sessionCookie) {
        const idToken = await user.getIdToken()
        const dateExpire = new Date(parseJwt(idToken ?? "").exp * 1000)
        Cookies.set("idTokenV0.1.0", idToken, { domain: domain, expires: dateExpire })
      }
    })
  }, [config])



  return (
    <AuthContext.Provider value={{ user, setUser, verificationDone, setVerificationDone, state, dispatch, development, setDevelopment, domain, config, verificandoCookie, setVerificandoCookie, changedForm, setChangedForm, geoInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthContextProvider = () => useContext(AuthContext)
export { AuthContextProvider, AuthProvider };
