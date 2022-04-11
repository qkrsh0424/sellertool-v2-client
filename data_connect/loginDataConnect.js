import axios from "axios"
import { axiosAuthInterceptor } from "./axiosInterceptors"

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress
const SCP_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.scpApiAddress : process.env.production.scpApiAddress
const AUTH_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.authApiAddress : process.env.production.authApiAddress

const loginDataConnect = () => {
    return {
        login: async function (params) {
            return await axios.post(`${AUTH_API_ADDRESS}/auth/v1/login`, params, {
                withCredentials: true,
                xsrfCookieName: 'auth_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        logout: async function () {
            return await axiosAuthInterceptor.post(`${AUTH_API_ADDRESS}/auth/v1/logout`, {}, {
                withCredentials: true,
                xsrfCookieName: 'auth_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    loginDataConnect
}