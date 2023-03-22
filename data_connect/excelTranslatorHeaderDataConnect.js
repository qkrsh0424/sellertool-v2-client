import withMainApiCsrfWrapper from "../utils/withMainApiCsrfWrapper"
import { axiosAuthInterceptor } from "./axiosInterceptors"

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress;

const excelTranslatorHeaderDataConnect = () => {
    return {
        /**
         * 
         * @param {object} headers 
         * @param {string} headers.wsId
         */
        searchList: async function (headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/excel-translator-headers`, {
                headers: headers,
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
         * @param {object} headers
         * @param {string} headers.wsId
         * @returns 
         */
        createOne: async function (body, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/excel-translator-headers`, body, {
                    headers: headers,
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
         * @param {object} headers
         * @param {string} headers.wsId
         */
        changeTitle: async function (body, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.patch(`${API_ADDRESS}/api/v1/excel-translator-headers/${body.id}/target:title`, body, {
                    headers: headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        /**
         * @param {object} body
         * @param {string} body.id
         * @param {object} body.uploadHeaderDetail
         * @param {object} headers
         * @param {string} headers.wsId
         */
        changeUploadHeaderDetail: async function (body, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.patch(`${API_ADDRESS}/api/v1/excel-translator-headers/${body.id}/target:uploadHeaderDetail`, body, {
                    headers: headers,
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
         * @param {object} headers
         * @param {string} headers.wsId
         */
        changeDownloadHeaderDetail: async function (body, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.patch(`${API_ADDRESS}/api/v1/excel-translator-headers/${body.id}/target:downloadHeaderDetail`, body, {
                    headers: headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        /**
         * @param {object} body
         * @param {string} body.id excelTranslatorHeaderId
         * @param {object} headers
         * @param {string} headers.wsId
         */
        delete: async function (body, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.delete(`${API_ADDRESS}/api/v1/excel-translator-headers/${body.id}`, {
                    headers: headers,
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
         * @param {object} headers
         * @param {string} headers.wsId
         * @returns 
         */
        uploadData: async function (excelTranslatorHeaderId, formData, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/excel-translator-headers/${excelTranslatorHeaderId}/action:upload-data`, formData, {
                    headers: headers,
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
         * @param {object} headers
         * @param {string} headers.wsId
         * @returns 
         */
        downloadData: async function (excelTranslatorHeaderId, body, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/excel-translator-headers/${excelTranslatorHeaderId}/action:download-data`, body, {
                    headers: headers,
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
         * @param {object} headers
         * @param {string} headers.wsId
         * @returns 
         */
        downloadSampleExcelForUploadHeader: async function (body, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/excel-translator-headers/${body.excelTranslatorHeaderId}/target:uploadHeader/action:download-sample`, null, {
                    headers:headers,
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
         * @param {object} headers
         * @param {string} headers.wsId
         * @returns 
         */
        downloadSampleExcelForDownloadHeader: async function (body, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/excel-translator-headers/${body.excelTranslatorHeaderId}/target:downloadHeader/action:download-sample`, null, {
                    headers:headers,
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