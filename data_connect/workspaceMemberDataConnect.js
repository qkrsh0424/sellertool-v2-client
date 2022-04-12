import axios from "axios"
import { axiosAuthInterceptor } from "./axiosInterceptors"

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress
const SCP_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.scpApiAddress : process.env.production.scpApiAddress

const workspaceMemberDataConnect = () => {
    return {
        searchList: async function (workspaceId) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/workspace-members/workspaces/${workspaceId}`, {
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    workspaceMemberDataConnect
}