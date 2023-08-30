import withMainApiCsrfWrapper from "../utils/withMainApiCsrfWrapper";
import { axiosAuthInterceptor } from "./axiosInterceptors";
import qs from 'qs';

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress;

const marginRecordDataConnect = () => {
    return {
        /**
         * 
         * @param {object} headers 
         * @param {string} headers.wsId
         * @returns 
         */
        searchList: async function (options = { headers, params }) {
            const { headers, params } = options;
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/margin-records`, {
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
        /**
         * 
         * @param {object} body [...moreItems]
         * @param {object} headers 
         * @param {string} headers.wsId
         * @returns 
         */
        createOne: async function (options = { body, headers }) {
            const { headers, body } = options;
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/margin-records`, body, {
                    headers: headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        updateOneV3: async function (options = { body, headers }) {
            const { headers, body } = options;
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.put(`${API_ADDRESS}/api/v1/margin-records`, body, {
                    headers: headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        /**
         * 
         * @param {object} body 
         * @param {string} body.id
         * @param {object} headers
         * @param {string} headers.wsId
         * @returns 
         */
        updateMarginRecord: async function (body, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.put(`${API_ADDRESS}/api/v1/margin-records/${body.id}`, body, {
                    headers: headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        /**
         * 
         * @param {object} body 
         * @param {string} body.marginRecordId
         * @param {object} headers
         * @param {string} headers.wsId
         * @returns 
         */
        deleteMarginRecord: async function (body, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.delete(`${API_ADDRESS}/api/v1/margin-records/${body.marginRecordId}`, {
                    headers: headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        }
    }
}

const MarginRecordDataConnect = marginRecordDataConnect;
export {
    MarginRecordDataConnect,
    marginRecordDataConnect
}