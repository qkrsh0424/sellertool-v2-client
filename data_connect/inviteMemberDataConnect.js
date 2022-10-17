import axios from "axios"
import { axiosAuthInterceptor } from "./axiosInterceptors"
import { csrfDataConnect } from "./csrfDataConnect"

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress
const AUTH_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.authApiAddress : process.env.production.authApiAddress
const SCP_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.scpApiAddress : process.env.production.scpApiAddress

const inviteMemberDataConnect = () => {
    return {
        searchListByWorkspaceId: async function ({ workspaceId }) {
            return await axiosAuthInterceptor.get(`${AUTH_API_ADDRESS}/auth/v1/invite-members/workspaces/${workspaceId}`, {
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body
         * @param {string} body.workspaceId
         * @param {string} body.username
         * @returns 
         */
        createOne: async function ({ body }) {
            await csrfDataConnect().getAuthCsrf();
            return await axiosAuthInterceptor.post(`${AUTH_API_ADDRESS}/auth/v1/invite-members`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body
         * @param {string} body.inviteMemberId
         * @returns 
         */
        deleteOne: async function ({ body }) {
            await csrfDataConnect().getAuthCsrf();
            return await axiosAuthInterceptor.delete(`${AUTH_API_ADDRESS}/auth/v1/invite-members/${body.inviteMemberId}`, {
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body
         * @param {string} body.inviteMemberId
         */
        retryInviteMember: async function ({ body }) {
            await csrfDataConnect().getAuthCsrf();
            return await axiosAuthInterceptor.post(`${AUTH_API_ADDRESS}/auth/v1/invite-members/${body.inviteMemberId}/action:retry`, null, {
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    inviteMemberDataConnect
}