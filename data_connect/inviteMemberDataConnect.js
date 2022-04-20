import axios from "axios"
import { axiosAuthInterceptor } from "./axiosInterceptors"

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress
const SCP_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.scpApiAddress : process.env.production.scpApiAddress

const inviteMemberDataConnect = () => {
    return {
        searchListByWorkspaceId: async function (workspaceId) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/invite-members/workspaces/${workspaceId}`, {
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        searchListByRequested: async function () {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/invite-members/requested`, {
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        createOne: async function (body) {
            return await axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/invite-members/one`, body, {
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        deleteByWorkspaceIdAndInviteMemberId: async function (workspaceId, inviteMemberId) {
            return await axiosAuthInterceptor.delete(`${API_ADDRESS}/api/v1/invite-members/workspaces/${workspaceId}/invite-members/${inviteMemberId}`, {
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        actionAccept: async function ({ inviteMemberId }) {
            return await axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/invite-members/${inviteMemberId}/action-accept`, null, {
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        actionReject: async function ({ inviteMemberId }) {
            return await axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/invite-members/${inviteMemberId}/action-reject`, null, {
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    inviteMemberDataConnect
}