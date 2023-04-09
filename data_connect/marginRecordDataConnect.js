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
        searchList: async function (headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/margin-records`, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} params
         * @param {number} params.size
         * @param {number} params.page
         * @param {object} headers 
         * @param {string} headers.wsId
         * @returns 
         */
        searchPage: async function (params, headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/margin-records/page`, {
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
         * @param {object} params 
         * @param {string} params.marginRecordId
         * @param {object} headers 
         * @param {string} headers.wsId
         * @returns 
         */
        searchMarginRecord: async function (params, headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/margin-records/${params.marginRecordId}`, {
                headers: headers,
                params: params,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} params
         * @param {string} params.marginRecordId
         * @param {string} params.openKey
         * @returns 
         */
        searchMarginRecordViewer: async function (params) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/margin-records/viewer`, {
                params: params,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body [...moreItems]
         * @param {object} headers 
         * @param {string} headers.wsId
         * @returns 
         */
        createMarginRecord: async function (body, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/margin-records`, body, {
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

export {
    marginRecordDataConnect
}