import { axiosAuthInterceptor } from "./axiosInterceptors";
import qs from 'qs';

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress

const productOptionDataConnect = () => {
    return {
        /**
         * 
         * @param {string} id productOptionId
         * @param {object} headers 
         * @param {string} headers.wsId
         * @returns 
         */
        searchById: async function (id, headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/product-options/${id}`, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
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
        searchListByProductId: async function (params, headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/product-options/products/${params?.productId}`, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} params 
         * @param {string} params.searchType
         * @param {boolean} params.mergeSearchConditionFlag
         * @param {string} params.searchQuery
         * @param {string} params.sort
         * @param {number} params.page
         * @param {number} params.size
         * @param {object} headers 
         * @param {string} headers.wsId
         * @returns 
         */
        searchPage: async function (params, headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/product-options/page/related:ProductCategoryAndProductSubCategoryAndProduct`, {
                params: params,
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} params 
         * @param {string} params.searchType
         * @param {boolean} params.mergeSearchConditionFlag
         * @param {string} params.productCategoryId
         * @param {string} params.productSubCategoryId
         * @param {string[]} params.searchCondition
         * @param {string} params.searchQuery
         * @param {string} params.sort
         * @param {number} params.page
         * @param {number} params.size
         * @param {object} headers 
         * @param {string} headers.wsId
         * @returns 
         */
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