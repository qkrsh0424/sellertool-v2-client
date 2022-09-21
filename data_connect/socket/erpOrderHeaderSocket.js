import axios from "axios";
import { axiosAuthInterceptor } from "../axiosInterceptors"

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress

const erpOrderHeaderSocket = () => {
    return {
        /**
         * 
         * @param {object} params 
         * @param {string} params.workspaceId
         * @param {Object} body 
         * @returns 
         */
        createOne: async function (params, body) {
            return await axiosAuthInterceptor.post(`${API_ADDRESS}/ws/v1/erp-order-headers`, body, {
                params: params,
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} params 
         * @param {string} params.workspaceId
         * @param {Object} body 
         * @returns 
         */
        updateOne: async function (params, body) {
            return await axiosAuthInterceptor.put(`${API_ADDRESS}/ws/v1/erp-order-headers`, body, {
                params: params,
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    erpOrderHeaderSocket
}