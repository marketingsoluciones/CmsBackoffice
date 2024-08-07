import axios from "axios"
import { getAuth } from "firebase/auth";
import Cookies from 'js-cookie';
import { Manager, io } from "socket.io-client";
import { parseJwt } from "./Authentication";

const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL })
const instanceAPP = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL_APP })

export const api = {
    ApiBodas: async (data, development) => {
        const domain = `.${development}`
        let idToken = Cookies.get("idTokenV0.1.0")
        try {
            if (getAuth().currentUser) {
                if (!idToken) {
                    idToken = await getAuth().currentUser?.getIdToken(true)
                    const dateExpire = new Date(parseJwt(idToken ?? "").exp * 1000)
                    Cookies.set("idTokenV0.1.0", idToken ?? "", { domain, expires: dateExpire })
                }
            }
        } catch (error) {
            //
        }
        if (!development) {
            development = data?.variables?.domain
        }
        return await instance.post("/graphql", data, {
            headers: {
                Authorization: `Bearer ${idToken}`,
                Development: development,
                IsProduction: process?.env?.NEXT_PUBLIC_PRODUCTION
            }
        })
    },

    ApiApp: async (params, domain) => {
        let idToken = Cookies.get("idTokenV0.1.0")
        try {
            if (getAuth().currentUser) {
                if (!idToken) {
                    idToken = await getAuth().currentUser?.getIdToken(true)
                    const dateExpire = new Date(parseJwt(idToken ?? "").exp * 1000)
                    Cookies.set("idTokenV0.1.0", idToken ?? "", { domain, expires: dateExpire })
                }
            }
        } catch (error) {
            //
        }
        return await instanceAPP.post("/graphql", params, {
            headers: {
                Authorization: `Bearer ${idToken}`,
            }
        });
    },

    getAllCountries: async () => {
        return await axios.get('https://restcountries.com/v3.1/all')
    },

    socketIO: ({ token, development, father, origin }) => {
        if (!development) return
        const manager = new Manager(process.env.NEXT_PUBLIC_BASE_URL ?? "", {
            closeOnBeforeunload: true
        })
        const socket = manager.socket("/", {
            auth: {
                token: `Bearer ${token}`,
                development,
                father,
                origin
            }
        })
        return socket
    },
}