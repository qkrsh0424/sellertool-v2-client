import axios from "axios";

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress

const erpOrderHeaderDataConnect = () => {
    return {
        /**
         * 
         * @param {object} params 
         * @param {string} params.workspaceId
         * @returns 
         */
        searchOne: async function (params) {
            return await axios.get(`${API_ADDRESS}/api/v1/erp-order-headers`, {
                params: params,
                withCredentials: true
            })
        },
        createOne: async function (params) {
            await csrfDataConnect().getApiCsrf();
            return await axios.post(`${API_ADDRESS}/api/v1/erp-order-headers`, params, {
                withCredentials: true
            })
        },
        createOneSocket: async function (params) {
            await csrfDataConnect().getApiCsrf();
            return await axios.post(`${API_ADDRESS}/ws/v1/erp-order-headers`, params, {
                withCredentials: true
            })
        },
        updateOne: async function (params) {
            await csrfDataConnect().getApiCsrf();
            return await axios.put(`${API_ADDRESS}/api/v1/erp-order-headers`, params, {
                withCredentials: true
            })
        },
        updateOneSocket: async function (params) {
            await csrfDataConnect().getApiCsrf();
            return await axios.put(`${API_ADDRESS}/ws/v1/erp-order-headers`, params, {
                withCredentials: true
            })
        }
    }
}

export {
    erpOrderHeaderDataConnect
}