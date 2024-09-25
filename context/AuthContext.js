import { createContext, useContext, useState, useEffect, useCallback, useReducer } from "react";
import { getAuth, signInWithCustomToken } from 'firebase/auth'
import Cookies from 'js-cookie'
import { developments } from "../firebase";
import { fetchApi, queries } from "../utils/Fetching";
import { boolean } from "yup";
import { initializeApp } from "firebase/app";
import { parseJwt } from "../utils/Authentication";
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
  console.log(10011, action)
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
    case "VIEW_DATAILS":
      return new Action("view_details", action.payload);
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
  const [showApp, setShowApp] = useState(false);
  const [pathArray, setPathArray] = useState([]);
  const [openModalRight, setOpenModalRight] = useState({ data: {}, state: false });
  const router = useRouter()

  let valirTimeout = null


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
    }
    setConfig(resp)

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
        if (user?.uid !== asd?.user_id) {
          fetchApi({
            query: queries.authStatus,
            variables: { sessionCookie },
            development: config?.name
          }).then((asdf) => {
            const customToken = asdf?.customToken
            customToken && signInWithCustomToken(getAuth(), customToken).then(
              setVerificandoCookie(true)
            )
          })
        }
        if (sessionCookie) {
          if (user) {
            await fetchApi({
              query: queries.getUser,
              variables: { uid: user?.uid },
              development: config?.name
            }).then((moreInfo) => {
              /* moreInfo && console.info("Tengo datos de la base de datos"); */
              setUser({ ...user, ...moreInfo });
              setTimeout(() => {
                setVerificandoCookie(true)
              }, 50);
            })
          } else {
            fetchApi({
              query: queries.authStatus,
              variables: { sessionCookie },
              development: config?.name
            }).then((asdf) => {
              const customToken = asdf?.customToken
              customToken && signInWithCustomToken(getAuth(), customToken).then(
                setVerificandoCookie(true)
              )
            })
          }
        } else {
          setVerificandoCookie(true)
        }
        // setTimeout(() => {
        if (isMounted) {
          if (!user) {
            const ID = setTimeout(() => {
              const path = `${window.origin.includes("://test.") ? process.env.NEXT_PUBLIC_DIRECTORY?.replace("//", "//test") : process.env.NEXT_PUBLIC_DIRECTORY}`
              const pathEnd = `${window.origin.includes("://test.") ? process.env.NEXT_PUBLIC_CMS?.replace("//", "//test") : process.env.NEXT_PUBLIC_CMS}`
              router.push(`${path}/login?d=cms&end=${pathEnd}${router?.asPath.slice(1)}`)
            }, 2000);
            valirTimeout = ID
          }
          else {
            clearTimeout(valirTimeout)
            setVerificationDone(true)
          }
        }

      });
    } catch (error) {
      console.log(90002, error)
    }

  }, [config, isMounted]);

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
    <AuthContext.Provider value={{ openModalRight, setOpenModalRight, user, setUser, pathArray, setPathArray, verificationDone, setVerificationDone, state, dispatch, development, setDevelopment, domain, config, verificandoCookie, setVerificandoCookie, changedForm, setChangedForm, geoInfo, showApp, setShowApp }}>
      {verificationDone ? children : null}
    </AuthContext.Provider>
  );
};

const AuthContextProvider = () => useContext(AuthContext)
export { AuthContextProvider, AuthProvider };
