import axios from "axios"
import { axiosAuthInterceptor } from "./axiosInterceptors"
import { csrfDataConnect } from "./csrfDataConnect"
import qs from 'qs';

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress
const SCP_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.scpApiAddress : process.env.production.scpApiAddress

const erpItemSameReceiverDataConnect = () => {
    return {
        count: async function (body) {
            return await axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/erp-item-same-receivers/search/count`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN',
                paramsSerializer: params => {
                    return qs.stringify(params, { arrayFormat: 'brackets' })
                }
            })
        }
    }
}

export {
    erpItemSameReceiverDataConnect
}