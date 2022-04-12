import axios from "axios"
import { axiosAuthInterceptor } from "./axiosInterceptors"

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress
const SCP_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.scpApiAddress : process.env.production.scpApiAddress

const workspaceDataConnect = () => {
    return {
        getWorkspace: async function (workspaceId) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/workspaces/${workspaceId}`, {
                withCredentials: true,
                xsrfCookieName: 'auth_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        getWorkspaces: async function () {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/workspaces`, {
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        createPrivate: async function (body) {
            return await axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/workspaces/private`, body, {
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    workspaceDataConnect
}