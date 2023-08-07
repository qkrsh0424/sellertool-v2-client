import { csrfDataConnect } from "./csrfDataConnect"
import { axiosAuthInterceptor } from "./axiosInterceptors"

const AUTH_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.authApiAddress : process.env.production.authApiAddress

export const PaymentDataConnect = () => {
    return {
        preparePayments: preparePayments,
        searchPaidPaymentList: searchPaidPaymentList
    }
}

const preparePayments = async (body) => {
    await csrfDataConnect().getAuthCsrf();
    return await axiosAuthInterceptor.post(`${AUTH_API_ADDRESS}/auth/v1/payments/prepare`, body, {
        withCredentials: true,
        xsrfCookieName: 'x_auth_csrf_token',
        xsrfHeaderName: 'X-XSRF-TOKEN'
    })
}

const searchPaidPaymentList = async () => {
    return await axiosAuthInterceptor.get(`${AUTH_API_ADDRESS}/auth/v1/payments/getPaidList`, {
        withCredentials: true,
        xsrfCookieName: 'x_auth_csrf_token',
        xsrfHeaderName: 'X-XSRF-TOKEN'
    })
}