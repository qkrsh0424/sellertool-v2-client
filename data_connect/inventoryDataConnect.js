import { axiosAuthInterceptor } from "./axiosInterceptors"
import withMainApiCsrfWrapper from "../utils/withMainApiCsrfWrapper";

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress;

export const InventoryDataConnect = {
    baseInventoryPage: baseInventoryPage
}

function baseInventoryPage() {
    const BASE_URL = `${API_ADDRESS}/page-api/inventory/v1/inventories`;

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
                () => axiosAuthInterceptor.post(`${BASE_URL}/search/stocks`, body, {
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
         * @param {date} body.startDateTime
         * @param {date} body.endDateTime
         * @param {object} headers 
         * @param {string} headers.wsId
         * @returns 
         */
        searchRegisteredStocks: async function (body, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${BASE_URL}/search/registeredStocks`, body, {
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
            return await axiosAuthInterceptor.get(`${BASE_URL}/search/stockRegisterStatus`, {
                headers: headers,
                params: params,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
    }
}

export const inventoryDataConnect = () => {
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
         * @param {object} params 
         * @param {number} params.size
         * @param {number} params.page
         * @param {string} params.assetType required [PROPERTY_PRICE, ESTIMATE_SALES_PRICE, STOCK_UNIT]
         * @param {string} params.orderType required [ASC, DESC]
         * @param {object} headers 
         * @param {string} headers.wsId
         * @returns 
         */
        searchStockAssetsSlice: async function (params, headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/inventory/search/stockAssets/slice`, {
                headers: headers,
                params: params,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            });
        },
        inventoryStockCyclePage: async function (params, headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/inventory/search/stockCycle/page`, {
                headers: headers,
                params: params,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            });
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
        },
        /**
         * 
         * @param {object} params
         * @param {int} params.page
         * @param {string} params.assetType
         * @param {string} params.orderType
         * @param {object} headers
         * @param {string} headers.wsId
         * @returns 
         */
        searchRankedInventory: async function (params, headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/inventory/search/stockAssets/slice`, {
                params,
                headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}