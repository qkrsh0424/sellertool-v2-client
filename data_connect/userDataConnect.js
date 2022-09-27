import axios from "axios";
import { axiosAuthInterceptor } from "./axiosInterceptors";
import { csrfDataConnect } from "./csrfDataConnect";

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress
const SCP_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.scpApiAddress : process.env.production.scpApiAddress
const AUTH_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.authApiAddress : process.env.production.authApiAddress

const userDataConnect = () => {
    return {
        signup: async ({ body }) => {
            await csrfDataConnect().getAuthCsrf();
            return await axios.post(`${AUTH_API_ADDRESS}/auth/v1/users/signup/local`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        login: async ({ body }) => {
            await csrfDataConnect().getAuthCsrf();
            return await axios.post(`${AUTH_API_ADDRESS}/auth/v1/users/login/local`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        getInfoOwn: async function () {
            return await axiosAuthInterceptor.get(`${AUTH_API_ADDRESS}/auth/v1/users/info/own`, {
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        checkUsernameDuplicate: async function ({ username }) {
            return await axiosAuthInterceptor.get(`${AUTH_API_ADDRESS}/auth/v1/users/target:username/action:check-duplicate`, {
                params: {
                    username
                },
                withCredentials: true
            })
        },
        updateInfo: async function (body) {
            return await axiosAuthInterceptor.put(`${AUTH_API_ADDRESS}/auth/v1/users/info/own`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {Object} body
         * @param {string} body.currentPassword
         * @param {string} body.newPassword
         * @param {string} body.checkPassword
         * @returns 
         */
        changePassword: async function (body) {
            return await axiosAuthInterceptor.patch(`${AUTH_API_ADDRESS}/auth/v1/users/password`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    userDataConnect
}