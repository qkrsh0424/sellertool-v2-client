import withMainApiCsrfWrapper from "../utils/withMainApiCsrfWrapper"
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
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/excel-translator-headers`, body, {
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
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
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.patch(`${API_ADDRESS}/api/v1/excel-translator-headers/${body.id}/target:title`, body, {
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        /**
         * @param {object} body
         * @param {string} body.id
         * @param {string} body.uploadHeaderDetail
         */
        changeUploadHeaderDetail: async function (body) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.patch(`${API_ADDRESS}/api/v1/excel-translator-headers/${body.id}/target:uploadHeaderDetail`, body, {
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        /**
         * @param {object} body
         * @param {string} body.id
         * @param {string} body.downloadHeaderDetail
         */
        changeDownloadHeaderDetail: async function (body) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.patch(`${API_ADDRESS}/api/v1/excel-translator-headers/${body.id}/target:downloadHeaderDetail`, body, {
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        /**
         * @param {object} body
         * @param {string} body.id
         */
        delete: async function (body) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.delete(`${API_ADDRESS}/api/v1/excel-translator-headers/${body.id}`, {
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
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
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/excel-translator-headers/target:uploadHeaderDetail/action:upload-sample`, formData, {
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
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
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/excel-translator-headers/target:downloadHeaderDetail/action:upload-sample`, formData, {
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        /**
         * 
         * @param {string} excelTranslatorHeaderId 
         * @param {FormData} formData
         * @param {object} formData.file
         * @param {string} formData.filePassword
         * @param {int} formData.rowStartNumber
         * @returns 
         */
        uploadData: async function (excelTranslatorHeaderId, formData) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/excel-translator-headers/${excelTranslatorHeaderId}/action:upload-data`, formData, {
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        /**
         * 
         * @param {string} excelTranslatorHeaderId 
         * @param {object} body
         * @returns 
         */
        downloadData: async function (excelTranslatorHeaderId, body) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/excel-translator-headers/${excelTranslatorHeaderId}/action:download-data`, body, {
                    responseType: 'blob',
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        /**
         * 
         * @param {object} body 
         * @param {string} body.excelTranslatorHeaderId
         * @returns 
         */
        downloadSampleExcelForUploadHeader: async function (body) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/excel-translator-headers/${body.excelTranslatorHeaderId}/target:uploadHeader/action:download-sample`, null, {
                    responseType: 'blob',
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        /**
         * 
         * @param {object} body 
         * @param {string} body.excelTranslatorHeaderId
         * @returns 
         */
        downloadSampleExcelForDownloadHeader: async function (body) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/excel-translator-headers/${body.excelTranslatorHeaderId}/target:downloadHeader/action:download-sample`, null, {
                    responseType: 'blob',
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        }
    }
}

export {
    excelTranslatorHeaderDataConnect
}