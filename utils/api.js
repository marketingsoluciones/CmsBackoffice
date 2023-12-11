import axios from "axios"
import Cookies from 'js-cookie';
import { io } from "socket.io-client";

const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL })
const instanceAPP = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL_APP })


export const api = {
    GraphQL: async (data, development, config) => {
        if (!development) {
            development = data?.variables?.domain
        }
        const tokenFinal = Cookies.get("idToken")
        return await instance.post("/graphql", data, {
            headers: {
                Authorization: `Bearer ${tokenFinal}`,
                Development: development
            }
        })
    },

    ApiApp: async (params, token) => {
        const token_final = token || Cookies.get("idToken")
        return await instanceAPP.post("/graphql", params, {
            headers: {
                Authorization: `Bearer ${token_final}`,
            }
        });
    },

    getAllCountries: async () => {
        return await axios.get('https://restcountries.com/v3.1/all')
    },

    socketIO: ({ token, development, father }) => {
        const socket = io(process.env.NEXT_PUBLIC_BASE_URL ?? "", {
            auth: {
                token: `Bearer ${token}`,
                development,
                father
            }
        })
        return socket
    },
}