import axios from "axios"
import { axiosAuthInterceptor } from "./axiosInterceptors"
import { csrfDataConnect } from "./csrfDataConnect"
import qs from 'qs';

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress
const SCP_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.scpApiAddress : process.env.production.scpApiAddress

const inventoryDataConnect = () => {
    return {
        searchList: async function (body) {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/inventory/search/stocks`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        searchInventoryStockRegisterStatuses: async function (params) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/inventory/search/stockRegisterStatus`, {
                params: params,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        searchRegisteredStocks: async function (body) {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/inventory/search/registeredStocks`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    inventoryDataConnect
}