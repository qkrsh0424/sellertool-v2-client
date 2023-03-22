import { axiosAuthInterceptor } from "./axiosInterceptors"
import withMainApiCsrfWrapper from "../utils/withMainApiCsrfWrapper";

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress;

const inventoryDataConnect = () => {
    return {
        /**
         * 
         * @param {object} body 
         * @param {string[]} body.productOptionIds
         * @param {object} headers 
         * @param {string} headers.wsId
         * @returns 
         */
        searchList: async function (body, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/inventory/search/stocks`, body, {
                    headers: headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        /**
         * 
         * @param {object} params 
         * @param {string} params.productOptionId
         * @param {date} params.startDateTime
         * @param {date} params.endDateTime
         * @param {object} headers 
         * @param {string} headers.wsId
         * @returns 
         */
        searchInventoryStockRegisterStatuses: async function (params, headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/inventory/search/stockRegisterStatus`, {
                headers: headers,
                params: params,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body 
         * @param {date} body.startDateTime
         * @param {date} body.endDateTime
         * @param {object} headers 
         * @param {string} headers.wsId
         * @returns 
         */
        searchRegisteredStocks: async function (body, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/inventory/search/registeredStocks`, body, {
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
         * @param {string[]} body.erpItemIds
         * @param {string} body.memo
         * @param {object} headers 
         * @param {string} headers.wsId
         * @returns 
         */
        createReleaseByErpItems: async function (body, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/inventory/create/release/by-erp`, body, {
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
         * @param {string[]} body.erpItemIds
         * @param {object} headers 
         * @param {string} headers.wsId
         * @returns 
         */
        cancelReleaseByErpItems: async function (body, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/inventory/cancel/release/by-erp`, body, {
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
    inventoryDataConnect
}