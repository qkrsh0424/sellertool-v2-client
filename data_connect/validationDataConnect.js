import axios from "axios"
import { csrfDataConnect } from "./csrfDataConnect";

const AUTH_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.authApiAddress : process.env.production.authApiAddress

const validationDataConnect = () => {
    return {
        sendPhoneNumberValidationCode: async ({ phoneNumber, validationType }) => {
            await csrfDataConnect().getAuthCsrf();
            return await axios.post(`${AUTH_API_ADDRESS}/auth/v1/validations/phone/validation-code/action:send`, {
                phoneNumber: phoneNumber
            }, {
                params: {
                    validationType: validationType || null
                },
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        sendEmailValidationCode: async ({ email, validationType }) => {
            await csrfDataConnect().getAuthCsrf();
            return await axios.post(`${AUTH_API_ADDRESS}/auth/v1/validations/email/validation-code/action:send`, {
                email: email
            }, {
                params: {
                    validationType: validationType || null
                },
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        checkPhoneValidationCodeValid: async ({ phoneNumber, validationCode }) => {
            await csrfDataConnect().getAuthCsrf();
            return await axios.post(`${AUTH_API_ADDRESS}/auth/v1/validations/phone/validation-code/action:check-validation`, {
                phoneNumber: phoneNumber,
                validationCode: validationCode
            }, {
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    validationDataConnect
}