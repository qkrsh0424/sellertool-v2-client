import axios from "axios"
import { axiosAuthInterceptor } from "./axiosInterceptors"

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress
const SCP_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.scpApiAddress : process.env.production.scpApiAddress

const optionDataConnect = () => {
    return {
        /**
         * 
         * @param {uuid} workspaceId required
         * @param {uuid} productId required
         * @returns 
         */
        searchListByProductId: async function (workspaceId, productId) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/options/products/${productId}`, {
                params: {
                    workspaceId: workspaceId
                },
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        createOne: async function (workspaceId, productId, body) {
            return await axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/options/products/${productId}`, body, {
                params: {
                    workspaceId: workspaceId
                },
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        updateOne: async function (workspaceId, body) {
            return await axiosAuthInterceptor.put(`${API_ADDRESS}/api/v1/options/${body.id}`, body, {
                params: {
                    workspaceId: workspaceId
                },
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        deleteOne: async function (workspaceId, optionId) {
            return await axiosAuthInterceptor.delete(`${API_ADDRESS}/api/v1/options/${optionId}`, {
                params: {
                    workspaceId: workspaceId
                },
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    optionDataConnect
}