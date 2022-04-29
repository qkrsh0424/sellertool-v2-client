import axios from "axios"
import { axiosAuthInterceptor } from "./axiosInterceptors"

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress
const SCP_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.scpApiAddress : process.env.production.scpApiAddress

const productDataConnect = () => {
    return {
        /**
         * 
         * @param {uuid} workspaceId required
         * @param {uuid} categoryId required
         * @returns 
         */
        searchListByCategoryId: async function (workspaceId, categoryId) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/products/categories/${categoryId}`, {
                params: {
                    workspaceId: workspaceId
                },
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        createOne: async function (workspaceId, categoryId, body) {
            return await axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/products/categories/${categoryId}`, body, {
                params: {
                    workspaceId: workspaceId
                },
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        deleteOne: async function (workspaceId, productId) {
            return await axiosAuthInterceptor.delete(`${API_ADDRESS}/api/v1/products/${productId}`, {
                params: {
                    workspaceId: workspaceId
                },
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        updateOne: async function (workspaceId, body) {
            return await axiosAuthInterceptor.put(`${API_ADDRESS}/api/v1/products/${body.id}`, body, {
                params: {
                    workspaceId: workspaceId
                },
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    productDataConnect
}