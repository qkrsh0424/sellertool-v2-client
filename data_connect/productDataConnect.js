import { axiosAuthInterceptor } from "./axiosInterceptors"
import qs from 'qs';
import withMainApiCsrfWrapper from "../utils/withMainApiCsrfWrapper";

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress

const productDataConnect = () => {
    return {
        searchPage: async function (params, headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/products/page/related:productCategoryAndProductSubCategory`, {
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
        /**
         * 
         * @param {object} params 
         * @param {string} params.productId
         * @param {object} headers 
         * @param {string} headers.wsId 
         * @returns 
         */
        searchForUpdate: async function (params, headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/products/${params?.productId}`, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body
         * @param {any} body.productFields
         * @param {array} body.productOptions
         * @param {string} body.productSubCategoryId
         * @param {string} body.workspaceId
         * @param {object} headers
         * @param {string} headers.wsId
         * @returns 
         */
        createOne: async function (body, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/products`, body, {
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
         * @param {any} body.productFields
         * @param {array} body.productOptions
         * @param {string} body.productSubCategoryId
         * @param {string} body.workspaceId
         * @param {object} headers
         * @param {string} headers.wsId
         * @returns 
         */
        update: async function (body, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.put(`${API_ADDRESS}/api/v1/products/${body.id}`, body, {
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
         * @param {string} body.productId
         * @param {string} body.workspaceId
         * @param {string} body.stockManagementYn
         * @param {object} headers
         * @param {string} headers.wsId
         */
        changeStockManagement: async function (body, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.patch(`${API_ADDRESS}/api/v1/products/${body.productId}/target:stockManagementYn`, body, {
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
         * @param {string} body.productId
         * @param {object} headers 
         * @param {string} headers.wsId
         * @returns 
         */
        delete: async function (body, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.delete(`${API_ADDRESS}/api/v1/products/${body.productId}`, {
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
    productDataConnect
}