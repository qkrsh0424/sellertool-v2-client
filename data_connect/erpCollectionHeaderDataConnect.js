import axios from "axios"
import { axiosAuthInterceptor } from "./axiosInterceptors";
import { csrfDataConnect } from "./csrfDataConnect";

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress

// UPDATED wsId -> headers
const erpCollectionHeaderDataConnect = () => {
    return {
        /**
         * 
         * @param {object} params 
         * @param {string} params.erpCollectionHeaderId
         * @param {object} headers 
         * @param {string} headers.wsId
         * @returns 
         */
        searchRelatedErpCollectionHeaderDetails: async function (params, headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/erp-collection-headers/${params.erpCollectionHeaderId}`, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * @param {object} headers 
         * @param {string} headers.wsId
         * @returns 
         */
        searchList: async function (headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/erp-collection-headers`, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * @param {object} body
         * @param {string} body.name
         * @param {string} body.description
         * @param {string} body.workspaceId
         * @param {Array} body.erpCollectionHeaderDetails
         * @returns 
         */
        create: async function (body) {
            let headers = {
                wsId: body.workspaceId
            }

            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/erp-collection-headers`, body, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body 
         * @param {string} body.id,
         * @param {string} body.name
         * @param {string} body.description
         * @param {string} body.workspaceId
         * @param {Array} body.erpCollectionHeaderDetails
         * @returns 
         */
        update: async function (body) {
            let headers = {
                wsId: body.workspaceId
            }
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.put(`${API_ADDRESS}/api/v1/erp-collection-headers/${body.id}`, body, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body 
         * @param {string} body.id
         * @param {string} body.workspaceId
         * @returns 
         */
        delete: async function (body) {
            let headers = {
                wsId: body.workspaceId
            }
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.delete(`${API_ADDRESS}/api/v1/erp-collection-headers/${body.id}`, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    erpCollectionHeaderDataConnect
}