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
        loginLocal: async ({ body }) => {
            await csrfDataConnect().getAuthCsrf();
            return await axios.post(`${AUTH_API_ADDRESS}/auth/v1/users/login/local`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        logoutLocal: async function () {
            await csrfDataConnect().getAuthCsrf();
            return await axiosAuthInterceptor.post(`${AUTH_API_ADDRESS}/auth/v1/users/logout/local`, null, {
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        getInfoOwn: async function () {
            return await axiosAuthInterceptor.get(`${AUTH_API_ADDRESS}/auth/v1/users/info`, {
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
            await csrfDataConnect().getAuthCsrf();
            return await axiosAuthInterceptor.put(`${AUTH_API_ADDRESS}/auth/v1/users/info/own`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body
         * @param {string} body.nickname
         * @returns 
         */
        changeNickname: async function (body) {
            await csrfDataConnect().getAuthCsrf();
            return await axiosAuthInterceptor.patch(`${AUTH_API_ADDRESS}/auth/v1/users/nickname`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body
         * @param {string} body.name
         * @returns 
         */
        changeName: async function (body) {
            await csrfDataConnect().getAuthCsrf();
            return await axiosAuthInterceptor.patch(`${AUTH_API_ADDRESS}/auth/v1/users/name`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body
         * @param {string} body.phoneNumber
         * @param {string} body.phoneNumberValidationCode
         * @returns 
         */
        changePhoneNumber: async function (body) {
            await csrfDataConnect().getAuthCsrf();
            return await axiosAuthInterceptor.patch(`${AUTH_API_ADDRESS}/auth/v1/users/phoneNumber`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body
         * @param {string} body.email
         * @param {string} body.emailValidationCode
         * @returns 
         */
        changeEmail: async function (body) {
            await csrfDataConnect().getAuthCsrf();
            return await axiosAuthInterceptor.patch(`${AUTH_API_ADDRESS}/auth/v1/users/email`, body, {
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
         * @param {string} body.newPasswordChecker
         * @returns 
         */
        changePassword: async function (body) {
            await csrfDataConnect().getAuthCsrf();
            return await axiosAuthInterceptor.patch(`${AUTH_API_ADDRESS}/auth/v1/users/password`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body 
         * @param {string} body.phoneNumber
         * @param {string} body.phoneNumberValidationCode
         * @returns 
         */
        findUsernameByPhoneNumberValidation: async function (body) {
            await csrfDataConnect().getAuthCsrf();
            return await axios.post(`${AUTH_API_ADDRESS}/auth/v1/users/find/username/validation:phoneNumber`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body 
         * @param {string} body.email
         * @param {string} body.emailValidationCode
         * @returns 
         */
        findUsernameByEmailValidation: async function (body) {
            await csrfDataConnect().getAuthCsrf();
            return await axios.post(`${AUTH_API_ADDRESS}/auth/v1/users/find/username/validation:email`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body 
         * @param {string} body.username
         * @param {string} body.phoneNumber
         * @param {string} body.phoneNumberValidationCode
         */
        findPasswordByPhoneNumberValidation: async function (body) {
            await csrfDataConnect().getAuthCsrf();
            return await axios.post(`${AUTH_API_ADDRESS}/auth/v1/users/find/password/validation:phoneNumber`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body 
         * @param {string} body.username
         * @param {string} body.email
         * @param {string} body.emailValidationCode
         */
        findPasswordByEmailValidation: async function (body) {
            await csrfDataConnect().getAuthCsrf();
            return await axios.post(`${AUTH_API_ADDRESS}/auth/v1/users/find/password/validation:email`, body, {
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