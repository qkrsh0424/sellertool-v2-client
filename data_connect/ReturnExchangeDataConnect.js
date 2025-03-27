import { axiosAuthInterceptor } from "./axiosInterceptors"
import { csrfDataConnect } from "./csrfDataConnect"
import qs from 'qs';
import withMainApiCsrfWrapper from "../utils/withMainApiCsrfWrapper";

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress

export const ReturnExchangeDataConnect = () => {
    return {
        searchList: async function ({ params, headers }) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/return-exchanges`, {
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
        bulkRegister: async function ({ body, headers }) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/return-exchanges/from-erp`, body, {
                    headers: headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        bulkUpdate: async function ({ body, headers }) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.put(`${API_ADDRESS}/api/v1/return-exchanges`, body, {
                    headers: headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        }
    }
}