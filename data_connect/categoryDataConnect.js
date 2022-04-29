import axios from "axios"
import { axiosAuthInterceptor } from "./axiosInterceptors"

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress
const SCP_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.scpApiAddress : process.env.production.scpApiAddress

const categoryDataConnect = () => {
    return {
        searchListByWorkspaceId: async function (workspaceId) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/categories/workspaces/${workspaceId}`, {
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        createOne: async function (workspaceId, body) {
            return await axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/categories/workspaces/${workspaceId}`, body, {
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        updateOne: async function (workspaceId, body) {
            return await axiosAuthInterceptor.put(`${API_ADDRESS}/api/v1/categories/workspaces/${workspaceId}`, body, {
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        deleteOne: async function (workspaceId, categoryId) {
            return await axiosAuthInterceptor.delete(`${API_ADDRESS}/api/v1/categories/${categoryId}/workspaces/${workspaceId}`, {
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    categoryDataConnect
}