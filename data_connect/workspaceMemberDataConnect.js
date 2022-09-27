import axios from "axios"
import { axiosAuthInterceptor } from "./axiosInterceptors"

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress
const SCP_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.scpApiAddress : process.env.production.scpApiAddress

const workspaceMemberDataConnect = () => {
    return {
        searchList: async function (workspaceId) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/workspace-members/workspaces/${workspaceId}`, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body
         * @param {string} body.workspaceId
         * @param {string} body.workspaceMemberId
         */
        deleteOne: async function (body) {
            return await axiosAuthInterceptor.delete(`${API_ADDRESS}/api/v1/workspace-members/${body.workspaceMemberId}/workspaces/${body.workspaceId}`, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 워크스페이스 멤버의 권한을 업데이트 한다.
         * @param {object} body workspaceMemberDto
         */
        changePermissions: async function (body) {
            return await axiosAuthInterceptor.patch(`${API_ADDRESS}/api/v1/workspace-members/${body.id}/permissions`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    workspaceMemberDataConnect
}