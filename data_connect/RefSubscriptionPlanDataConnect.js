import axios from "axios"

const AUTH_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.authApiAddress : process.env.production.authApiAddress

export const RefSubscriptionPlanDataConnect = () => {
    return {
        searchOne: searchOne,
        searchList: searchList
    }
}

const searchList = async () => {
    return await axios.get(`${AUTH_API_ADDRESS}/auth/v1/ref-subscription-plans`, {
        withCredentials: true,
        xsrfCookieName: 'x_auth_csrf_token',
        xsrfHeaderName: 'X-XSRF-TOKEN'
    })
}

const searchOne = async (params) => {
    return await axios.get(`${AUTH_API_ADDRESS}/auth/v1/ref-subscription-plans/${params?.subscriptionPlanId}`, {
        withCredentials: true,
        xsrfCookieName: 'x_auth_csrf_token',
        xsrfHeaderName: 'X-XSRF-TOKEN'
    })
}

