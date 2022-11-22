import axios from "axios"
import { axiosAuthInterceptor } from "./axiosInterceptors"
import { csrfDataConnect } from "./csrfDataConnect"

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress
const SCP_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.scpApiAddress : process.env.production.scpApiAddress

const productDataConnect = () => {
    return {
        searchList: async function (params, headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/products`, {
                params: params,
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} params 
         * @param {string} params.productId
         * @param {object} headers 
         * @param {string} headers.wsId 
         * @returns 
         */
        searchForUpdate: async function (params, headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/products/${params?.productId}`, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body
         * @param {any} body.productFields
         * @param {array} body.productOptions
         * @param {string} body.productSubCategoryId
         * @param {string} body.workspaceId
         * @returns 
         */
        createOne: async function (body) {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/products`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body
         * @param {any} body.productFields
         * @param {array} body.productOptions
         * @param {string} body.productSubCategoryId
         * @param {string} body.workspaceId
         * @returns 
         */
        update: async function (body) {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.put(`${API_ADDRESS}/api/v1/products/${body.id}`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body 
         * @param {string} body.productId
         * @param {string} body.workspaceId
         * @param {string} body.stockManagementYn
         */
        changeStockManagement: async function (body) {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.patch(`${API_ADDRESS}/api/v1/products/${body.productId}/target:stockManagementYn`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body 
         * @param {string} body.productId
         * @param {object} headers 
         * @param {string} headers.wsId
         * @returns 
         */
        delete: async function (body, headers) {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.delete(`${API_ADDRESS}/api/v1/products/${body.productId}`, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    productDataConnect
}