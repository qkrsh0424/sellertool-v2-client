import withMainApiCsrfWrapper from "../utils/withMainApiCsrfWrapper"
import { axiosAuthInterceptor } from "./axiosInterceptors"

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress

export const ProductSubCategoryDataConnect = {
    baseInventoryPage: baseInventoryPage
}

function baseInventoryPage() {
    const BASE_URL = `${API_ADDRESS}/page-api/inventory/v1/product-sub-categories`;

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
            return await axiosAuthInterceptor.get(`${BASE_URL}/product-categories/${params.productCategoryId}`, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
    }
}


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
         * @param {object} headers
         * @param {string} headers.wsId
         * @returns 
         */
        create: async function (body, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/product-sub-categories/product-categories/${body.productCategoryId}`, body, {
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
         * @param {string} body.productSubCategoryId
         * @param {string} body.name
         * @param {object} headers
         * @param {string} headers.wsId
         * @returns 
         */
        changeName: async function (body, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.patch(`${API_ADDRESS}/api/v1/product-sub-categories/${body.productSubCategoryId}/target:name`, body, {
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
         * @param {string} body.productSubCategoryId
         * @param {object} headers
         * @param {string} headers.wsId
         */
        delete: async function (body, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.delete(`${API_ADDRESS}/api/v1/product-sub-categories/${body.productSubCategoryId}`, {
                    headers: headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        }
    }
}

export {
    productSubCategoryDataConnect
}