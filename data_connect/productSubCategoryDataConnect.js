import axios from "axios"
import { axiosAuthInterceptor } from "./axiosInterceptors"
import { csrfDataConnect } from "./csrfDataConnect"

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress

const productSubCategoryDataConnect = () => {
    return {
        /**
         * 
         * @param {object} params 
         * @param {string} params.productCategoryId
         * @param {object} headers
         * @param {string} headers.wsId
         * @returns 
         */
        searchList: async function (params, headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/product-sub-categories/product-categories/${params.productCategoryId}`, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body 
         * @param {string} body.productCategoryId,
         * @param {string} body.name
         * @returns 
         */
        create: async function (body) {
            return await axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/product-sub-categories/product-categories/${body.productCategoryId}`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body 
         * @param {string} body.productSubCategoryId
         * @param {string} body.name
         * @returns 
         */
        changeName: async function (body) {
            return await axiosAuthInterceptor.patch(`${API_ADDRESS}/api/v1/product-sub-categories/${body.productSubCategoryId}/target:name`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body 
         * @param {string} productSubCategoryId
         */
        delete: async function (body) {
            return await axiosAuthInterceptor.delete(`${API_ADDRESS}/api/v1/product-sub-categories/${body.productSubCategoryId}`, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    productSubCategoryDataConnect
}