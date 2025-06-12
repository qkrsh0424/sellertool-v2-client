import { axiosAuthInterceptor } from "./axiosInterceptors"
import qs from 'qs';

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress


export const ErpActionLogDataConnect = () => {
    return {
        getLogs: async function ({ params, headers }) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/erp-action-logs`, {
                headers: headers,
                params: params,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN',
                paramsSerializer: params => {
                    return qs.stringify(params, { arrayFormat: 'brackets' })
                }
            })
        },
    }
}