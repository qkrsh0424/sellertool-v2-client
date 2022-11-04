import { axiosAuthInterceptor } from "./axiosInterceptors"
import { csrfDataConnect } from "./csrfDataConnect"

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress
const SCP_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.scpApiAddress : process.env.production.scpApiAddress

const excelTranslatorHeaderDataConnect = () => {
    return {
        /**
         * 
         * @param {object} params 
         * @param {string} workspaceId
         */
        searchListByWorkspaceId: async function (params) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/excel-translator-headers/workspaces/${params.workspaceId}`, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body 
         * @param {string} body.uploadHeaderTitle
         * @param {string} body.downloadHeaderTitle
         * @param {number} body.rowStartNumber
         * @returns 
         */
        createOne: async function (body) {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/excel-translator-headers`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body 
         * @param {string} body.id
         * @param {string} body.uploadHeaderTitle
         * @param {string} body.downloadHeaderTitle
         * @param {number} body.rowStartNumber
         */
        changeTitle: async function (body) {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.patch(`${API_ADDRESS}/api/v1/excel-translator-headers/${body.id}/target:title`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * @param {object} body
         * @param {string} body.id
         * @param {string} body.uploadHeaderDetail
         */
        changeUploadHeaderDetail: async function (body) {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.patch(`${API_ADDRESS}/api/v1/excel-translator-headers/${body.id}/target:uploadHeaderDetail`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * @param {object} body
         * @param {string} body.id
         * @param {string} body.downloadHeaderDetail
         */
        changeDownloadHeaderDetail: async function (body) {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.patch(`${API_ADDRESS}/api/v1/excel-translator-headers/${body.id}/target:downloadHeaderDetail`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * @param {object} body
         * @param {string} body.id
         */
        delete: async function (body) {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.delete(`${API_ADDRESS}/api/v1/excel-translator-headers/${body.id}`, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {FormData} formData
         * @param {object} formData.file
         * @param {string} formData.filePassword
         * @param {int} formData.rowStartNumber
         * @returns 
         */
        uploadSampleExcelForUploadHeaderDetail: async function (formData) {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/excel-translator-headers/target:uploadHeaderDetail/action:upload-sample`, formData, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {FormData} formData
         * @param {object} formData.file
         * @param {string} formData.filePassword
         * @param {int} formData.rowStartNumber
         * @returns 
         */
         uploadSampleExcelForDownloadHeaderDetail: async function (formData) {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/excel-translator-headers/target:downloadHeaderDetail/action:upload-sample`, formData, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    excelTranslatorHeaderDataConnect
}