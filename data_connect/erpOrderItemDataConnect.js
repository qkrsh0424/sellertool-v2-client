import axios from "axios";

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress

const erpOrderItemDataConnect = () => {
    return {
        uploadExcelFile: async function (formData) {
            await csrfDataConnect().getApiCsrf();
            return await axios.post(`${API_ADDRESS}/api/v1/erp-order-items/excel/upload`, formData, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        searchList: async function (params) {
            return await axios.get(`${API_ADDRESS}/api/v1/erp-order-items/search`, {
                params: params,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        refreshList: async function (params) {
            await csrfDataConnect().getApiCsrf();
            return await axios.post(`${API_ADDRESS}/api/v1/erp-order-items/action-refresh`, params, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        searchReleaseList: async function (params) {
            return await axios.get(`${API_ADDRESS}/api/v1/erp-order-items/search/release`, {
                params: params,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        createList: async function (params) {
            await csrfDataConnect().getApiCsrf();
            return await axios.post(`${API_ADDRESS}/api/v1/erp-order-items/batch`, params, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        updateOne: async function (body) {
            await csrfDataConnect().getApiCsrf();
            return await axios.put(`${API_ADDRESS}/api/v1/erp-order-items`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        changeSalesYnForListInSales: async function (body) {
            await csrfDataConnect().getApiCsrf();
            return await axios.patch(`${API_ADDRESS}/api/v1/erp-order-items/batch/sales-yn`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        changeReleaseYnForList: async function (body) {
            await csrfDataConnect().getApiCsrf();
            return await axios.patch(`${API_ADDRESS}/api/v1/erp-order-items/batch/release-yn`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        changeOptionCodeForListInBatch: async function (body) {
            await csrfDataConnect().getApiCsrf();
            return await axios.patch(`${API_ADDRESS}/api/v1/erp-order-items/batch/option-code/all`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        changeReleaseOptionCodeForListInBatch: async function (body) {
            await csrfDataConnect().getApiCsrf();
            return await axios.patch(`${API_ADDRESS}/api/v1/erp-order-items/batch/release-option-code`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        deleteList: async function (params) {
            await csrfDataConnect().getApiCsrf();
            return await axios.post(`${API_ADDRESS}/api/v1/erp-order-items/batch-delete`, params, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        fetchFirstMerge: async function (firstMergeHeaderId, body) {
            await csrfDataConnect().getApiCsrf();
            return await axios.post(`${API_ADDRESS}/api/v1/erp-order-items/erp-first-merge-headers/${firstMergeHeaderId}/action-merge`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        fetchSecondMerge: async function (secondMergeHeaderId, body) {
            await csrfDataConnect().getApiCsrf();
            return await axios.post(`${API_ADDRESS}/api/v1/erp-order-items/erp-second-merge-headers/${secondMergeHeaderId}/action-merge`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        changeWaybillForList: async function (formData) {
            await csrfDataConnect().getApiCsrf();
            return await axios.patch(`${API_ADDRESS}/api/v1/erp-order-items/batch/waybill`, formData, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    erpOrderItemDataConnect
}