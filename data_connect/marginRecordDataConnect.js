import axios from "axios"
import { axiosAuthInterceptor } from "./axiosInterceptors"
import { csrfDataConnect } from "./csrfDataConnect"

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress
const SCP_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.scpApiAddress : process.env.production.scpApiAddress

const marginRecordDataConnect = () => {
    return {
        /**
         * 
         * @param {object} params 
         * @param {string} params.workspaceId
         * @returns 
         */
        searchList: async function (params) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/margin-records/workspaces/${params.workspaceId}`, {
                params: params,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} params 
         * @param {string} params.marginRecordId
         * @returns 
         */
        searchMarginRecord: async function (params) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/margin-records/${params.marginRecordId}`, {
                params: params,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} params
         * @param {string} params.marginRecordId
         * @param {string} params.openKey
         * @returns 
         */
        searchMarginRecordViewer: async function (params) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/margin-records/viewer`, {
                params: params,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        createMarginRecord: async function (body) {
            return await axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/margin-records`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body 
         * @param {string} body.id
         * @returns 
         */
        updateMarginRecord: async function (body) {
            return await axiosAuthInterceptor.put(`${API_ADDRESS}/api/v1/margin-records/${body.id}`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body 
         * @param {string} body.marginRecordId
         * @returns 
         */
        deleteMarginRecord: async function (body) {
            return await axiosAuthInterceptor.delete(`${API_ADDRESS}/api/v1/margin-records/${body.marginRecordId}`, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    marginRecordDataConnect
}