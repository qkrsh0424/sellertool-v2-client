import axios from "axios";

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress

const erpOrderItemSocket = () => {
    return {
        createList: async function (workspaceId, body) {
            return await axios.post(`${API_ADDRESS}/ws/v1/erp-order-items/batch`, body, {
                params: {
                    workspaceId: workspaceId
                },
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        updateOne: async function (body) {
            return await axios.put(`${API_ADDRESS}/ws/v1/erp-order-items`, body, {
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        changeOptionCodeForListInBatch: async function (body) {
            return await axios.patch(`${API_ADDRESS}/ws/v1/erp-order-items/batch/option-code/all`, body, {
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        changeReleaseOptionCodeForListInBatch: async function (body) {
            return await axios.patch(`${API_ADDRESS}/ws/v1/erp-order-items/batch/release-option-code`, body, {
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        changeSalesYnForListInSales: async function (body) {
            return await axios.patch(`${API_ADDRESS}/ws/v1/erp-order-items/batch/sales-yn`, body, {
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        changeReleaseYnForList: async function (body) {
            return await axios.patch(`${API_ADDRESS}/ws/v1/erp-order-items/batch/release-yn`, body, {
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        changeWaybillForList: async function (formData) {
            return await axios.patch(`${API_ADDRESS}/ws/v1/erp-order-items/batch/waybill`, formData, {
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        deleteList: async function (params) {
            return await axios.post(`${API_ADDRESS}/ws/v1/erp-order-items/batch-delete`, params, {
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        actionReflectStock: async function (body) {
            return await axios.patch(`${API_ADDRESS}/ws/v1/erp-order-items/batch/stock/action-reflect`, body, {
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        actionCancelStock: async function (body) {
            return await axios.patch(`${API_ADDRESS}/ws/v1/erp-order-items/batch/stock/action-cancel`, body, {
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    erpOrderItemSocket
}