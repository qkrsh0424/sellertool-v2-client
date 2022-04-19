import axios from "axios";
import { axiosAuthInterceptor } from "./axiosInterceptors";

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress
const SCP_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.scpApiAddress : process.env.production.scpApiAddress
const AUTH_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.authApiAddress : process.env.production.authApiAddress

const userDataConnect = () => {
    return {
        getInfoOwn: async function () {
            return await axiosAuthInterceptor.get(`${AUTH_API_ADDRESS}/auth/v1/user/info/own`, {
                withCredentials: true,
                xsrfCookieName: 'auth_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        checkUsernameDuplicate: async function ({ username }) {
            return await axiosAuthInterceptor.get(`${AUTH_API_ADDRESS}/auth/v1/user/check/username-duplicate`, {
                params: {
                    username
                },
                withCredentials: true
            })
        },
        updateInfo: async function (body) {
            return await axiosAuthInterceptor.put(`${AUTH_API_ADDRESS}/auth/v1/user/info/own`, body, {
                withCredentials: true,
                xsrfCookieName: 'auth_csrf',
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
        changePassword: async function(body){
            return await axiosAuthInterceptor.patch(`${AUTH_API_ADDRESS}/auth/v1/user/password`, body, {
                withCredentials: true,
                xsrfCookieName: 'auth_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    userDataConnect
}