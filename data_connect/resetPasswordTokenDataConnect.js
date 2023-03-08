import axios from "axios";
import { csrfDataConnect } from "./csrfDataConnect";

const AUTH_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.authApiAddress : process.env.production.authApiAddress

const resetPasswordTokenDataConnect = () => {
    return {
        checkTokenValid: async ({ resetToken }) => {
            return await axios.get(`${AUTH_API_ADDRESS}/auth/v1/reset-password-tokens/${resetToken}`, {
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        changePassword: async (body) => {
            await csrfDataConnect().getAuthCsrf();
            return await axios.post(`${AUTH_API_ADDRESS}/auth/v1/reset-password-tokens/reset`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    resetPasswordTokenDataConnect
}