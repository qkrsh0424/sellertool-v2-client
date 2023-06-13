import axios from "axios"
import { csrfDataConnect } from "./csrfDataConnect";

const AUTH_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.authApiAddress : process.env.production.authApiAddress

const validationDataConnect = () => {
    return {
        /**
         * 
         * @param {object} body
         * @param {string} body.validationType Required
         * @param {string} body.phoneNumber Required
         * @param {string} body.username Option
         * @returns 
         */
        sendPhoneNumberValidationCode: async (body) => {
            await csrfDataConnect().getAuthCsrf();
            return await axios.post(`${AUTH_API_ADDRESS}/auth/v1/validations/phone/validation-code/action:send`, body, {
                params: {
                    validationType: body?.validationType || null
                },
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body
         * @param {string} body.validationType Required
         * @param {string} body.email Required
         * @param {string} body.username Option
         * @returns 
         */
        sendEmailValidationCode: async (body) => {
            await csrfDataConnect().getAuthCsrf();
            return await axios.post(`${AUTH_API_ADDRESS}/auth/v1/validations/email/validation-code/action:send`, body, {
                params: {
                    validationType: body?.validationType || null
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