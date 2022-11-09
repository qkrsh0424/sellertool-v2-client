import axios from "axios";

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress

const erpSalesHeaderSocket = () => {
    return {
        createOne: async function (params) {
            return await axios.post(`${API_ADDRESS}/ws/v1/erp-sales-headers`, params, {
                withCredentials: true
            })
        },
        updateOne: async function (params) {
            return await axios.put(`${API_ADDRESS}/ws/v1/erp-sales-headers`, params, {
                withCredentials: true
            })
        }
    }
}

export {
    erpSalesHeaderSocket
}