import axios from "axios";

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress

const erpDownloadExcelHeaderDataConnect = () => {
    return {
        searchList: async function () {
            return await axios.get(`${API_ADDRESS}/api/v1/erp-download-excel-headers`, {
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        createOne: async function (body) {
            return await axios.post(`${API_ADDRESS}/api/v1/erp-download-excel-headers`, body, {
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        deleteOne: async function (id) {
            return await axios.delete(`${API_ADDRESS}/api/v1/erp-download-excel-headers/${id}`, {
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        updateOne: async function (body) {
            return await axios.put(`${API_ADDRESS}/api/v1/erp-download-excel-headers`, body, {
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        actionDownloadForDownloadOrderItems: async function (id, downloadOrderItemsBody) {
            return await axios.post(`${API_ADDRESS}/api/v1/erp-download-excel-headers/${id}/download-order-items/action-download`, downloadOrderItemsBody, {
                responseType: 'blob',
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        actionDownloadForUploadExcelSampleForm: async function () {
            return await axios.post(`${API_ADDRESS}/api/v1/erp-download-excel-headers/upload-excel-sample/action-download`, {}, {
                responseType: 'blob',
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        actionDownloadForWaybillExcelSample: async function () {
            return await axios.post(`${API_ADDRESS}/api/v1/erp-download-excel-headers/waybill-excel-sample/action-download`, {}, {
                responseType: 'blob',
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    erpDownloadExcelHeaderDataConnect
}