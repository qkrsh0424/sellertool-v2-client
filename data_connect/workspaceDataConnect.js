import axios from "axios"
import { axiosAuthInterceptor } from "./axiosInterceptors"
import { csrfDataConnect } from "./csrfDataConnect"
import withMainApiCsrfWrapper from "../utils/withMainApiCsrfWrapper"

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress
const SCP_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.scpApiAddress : process.env.production.scpApiAddress
const AUTH_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.authApiAddress : process.env.production.authApiAddress
const STORE_RANK_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.storeRankApiAddress : process.env.production.storeRankApiAddress

const workspaceDataConnect = () => {
    return {
        getWorkspace: async function (workspaceId) {
            return await axiosAuthInterceptor.get(`${AUTH_API_ADDRESS}/auth/v1/workspaces/${workspaceId}`, {
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        getWorkspaces: async function () {
            return await axiosAuthInterceptor.get(`${AUTH_API_ADDRESS}/auth/v1/workspaces`, {
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        createPrivate: async function ({ body }) {
            await csrfDataConnect().getAuthCsrf();
            return await axiosAuthInterceptor.post(`${AUTH_API_ADDRESS}/auth/v1/workspaces/private`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {Object} body 
         * @param {String} body.id
         * @param {String} body.name
         * @param {Object} headers
         * @param {string} headers.wsId
         * @returns 
         */
        patchWorkspaceName: async function (body, headers) {
            await csrfDataConnect().getAuthCsrf();
            return await axiosAuthInterceptor.patch(`${AUTH_API_ADDRESS}/auth/v1/workspaces/target:name`, {
                ...body
            }, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        deleteWorkspace: async function (headers) {
            await csrfDataConnect().getAuthCsrf();
            return await axiosAuthInterceptor.delete(`${AUTH_API_ADDRESS}/auth/v1/workspaces`, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        getNRankSearchInfo: async function (headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.get(`${STORE_RANK_API_ADDRESS}/api/v1/workspaces/nrank-search-info`, {
                    headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        }
    }
}

export {
    workspaceDataConnect
}