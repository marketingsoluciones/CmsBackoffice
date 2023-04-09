import axios from "axios"
import Cookies from 'js-cookie';

const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL })

export const api = {
    GraphQL: async (data, config) => {
        console.log(12300002, data)
        console.log(12300006, config)
        const tokenFinal = Cookies.get("idToken")
        console.log(12300008, tokenFinal)
        return await instance.post("/graphql", data, {
            headers: {
                Authorization: `Bearer ${tokenFinal}`,
                Development: "bodasdehoy"
            }
        })
    },
    getAllCountries: async () => {
        return await axios.get('https://restcountries.com/v3.1/all')
    }
}