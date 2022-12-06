import axios from "axios";
import { axiosAuthInterceptor } from "./axiosInterceptors";
import { csrfDataConnect } from "./csrfDataConnect";
import qs from 'qs';

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress

const productOptionDataConnect = () => {
    return {
        searchById: async function (id, headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/product-options/${id}`, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        searchList: async function (params, headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/product-options`, {
                params: params,
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        searchPage: async function (params, headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/product-options/page/related:ProductCategoryAndProductSubCategoryAndProduct`, {
                params: params,
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        searchPagePositionInventory: async function (params, headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/product-options/page/position:inventory`, {
                params: params,
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN',
                paramsSerializer: params => {
                    return qs.stringify(params, { arrayFormat: 'brackets' })
                }
            })
        },
    }
}

export {
    productOptionDataConnect
}