import axios from "axios"
import { axiosAuthInterceptor } from "./axiosInterceptors";
import { csrfDataConnect } from "./csrfDataConnect";

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress

// UPDATED wsId -> headers
const erpcExcelDownloadFormDataConnect = () => {
    return {
        /**
         * 
         * @param {object} headers 
         * @param {string} headers.wsId
         * @returns 
         */
        searchList: async function (headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/erpc-excel-download-forms`, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} params
         * @param {string} params.erpcExcelDownloadFormId
         * @param {object} headers
         * @param {string} headers.wsId
         * @returns 
         */
        searchRelatedFormDetails: async function (params, headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/erpc-excel-download-forms/${params.erpcExcelDownloadFormId}/related:formDetails`, {
                headers: headers,
                params: params,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body 
         * @param {string} body.name
           @param {string} body.description
           @param {string} body.erpcExcelDownloadFormDetails
           @param {string} body.workspaceId
         * @returns 
         */
        create: async function (body) {
            let headers = {
                wsId: body.workspaceId
            }
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/erpc-excel-download-forms`, body, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body 
         * @param {string} body.id
           @param {string} body.name
           @param {string} body.description
           @param {string} body.erpcExcelDownloadFormDetails
           @param {string} body.workspaceId
         * @returns 
         */
        update: async function (body) {
            let headers = {
                wsId: body.workspaceId
            }
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.put(`${API_ADDRESS}/api/v1/erpc-excel-download-forms/${body.id}`, body, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * @param {object} body 
         * @param {string} body.id
         * @param {string} body.workspaceId
         * @returns 
         */
        delete: async function (body) {
            let headers = {
                wsId: body.workspaceId
            }
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.delete(`${API_ADDRESS}/api/v1/erpc-excel-download-forms/${body.id}`, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {string} erpcExcelDownloadFormId 
         * @param {object} downloadItems 
         * @param {object} headers 
         * @param {string} headers.wsId
         * @returns 
         */
        actionExcelDownload: async function (erpcExcelDownloadFormId, downloadItems, headers) {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/erpc-excel-download-forms/${erpcExcelDownloadFormId}/action:download`, downloadItems, {
                headers: headers,
                responseType: 'blob',
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    erpcExcelDownloadFormDataConnect
}