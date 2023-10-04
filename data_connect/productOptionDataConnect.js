import { axiosAuthInterceptor } from "./axiosInterceptors";
import qs from 'qs';

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress

export const ProductOptionDataConnect = {
    baseInventoryPage: baseInventoryPage
}

function baseInventoryPage() {
    const BASE_URL = `${API_ADDRESS}/page-api/inventory/v1/product-options`;

    return {
        /**
         * 
         * @param {object} params 
         * @param {number} params.size
         * @param {number} params.page
         * @param {string} params.sort
         * @param {string} params.searchCondition {isRequired:false, 허용 값 : [PRODUCT_CODE, PRODUCT_NAME, PRODUCT_TAG, PRODUCT_OPTION_CODE, PRODUCT_OPTION_NAME, PRODUCT_OPTION_TAG, PRODUCT_OPTION_STATUS, PRODUCT_OPTION_RELEASE_LOCATION, PRODUCT_OPTION_MEMO]}
         * @param {string} params.searchQuery {isRequired:false, 허용 값 : Any String}
         * @param {string} params.stockManagementYn {isRequired:false, 허용 값 : [Y, N]}
         * @param {string} params.productCategoryId {isRequired:false, 허용 값 : Any String}
         * @param {string} params.productSubCategoryId {isRequired:false, 허용 값 : Any String}
         * @param {string} params.packageYn {isRequired:false, 허용 값 : [Y, N]}
         * @param {object} headers 
         * @param {string} headers.wsId
         * @returns 
         */
        searchPage: async function (params, headers) {
            return await axiosAuthInterceptor.get(`${BASE_URL}/page/related:ProductCategoryAndProductSubCategoryAndProduct`, {
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
         * @param {number} params.size
         * @param {number} params.page
         * @param {string} params.sort
         * @param {string} params.searchCondition {isRequired:false, 허용 값 : [PRODUCT_CODE, PRODUCT_NAME, PRODUCT_TAG, PRODUCT_OPTION_CODE, PRODUCT_OPTION_NAME, PRODUCT_OPTION_TAG, PRODUCT_OPTION_STATUS, PRODUCT_OPTION_RELEASE_LOCATION, PRODUCT_OPTION_MEMO]}
         * @param {string} params.searchQuery {isRequired:false, 허용 값 : Any String}
         * @param {string} params.stockManagementYn {isRequired:false, 허용 값 : [Y, N]}
         * @param {string} params.productCategoryId {isRequired:false, 허용 값 : Any String}
         * @param {string} params.productSubCategoryId {isRequired:false, 허용 값 : Any String}
         * @param {string} params.packageYn {isRequired:false, 허용 값 : [Y, N]}
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
                xsrfHeaderName: 'X-XSRF-TOKEN',
                paramsSerializer: params => {
                    return qs.stringify(params, { arrayFormat: 'brackets' })
                }
            })
        },
        /**
         * 
         * @param {object} params
         * @param {string} params.searchCondition {isRequired:false, 허용 값 : [PRODUCT_CODE, PRODUCT_NAME, PRODUCT_TAG, PRODUCT_OPTION_CODE, PRODUCT_OPTION_NAME, PRODUCT_OPTION_TAG, PRODUCT_OPTION_STATUS, PRODUCT_OPTION_RELEASE_LOCATION, PRODUCT_OPTION_MEMO]}
         * @param {string} params.searchQuery {isRequired:false, 허용 값 : Any String}
         * @param {string} params.stockManagementYn {isRequired:false, 허용 값 : [Y, N]}
         * @param {string} params.productCategoryId {isRequired:false, 허용 값 : Any String}
         * @param {string} params.productSubCategoryId {isRequired:false, 허용 값 : Any String}
         * @param {string} params.packageYn {isRequired:false, 허용 값 : [Y, N]}
         * @param {object} headers 
         * @param {string} headers.wsId
         * @returns 
         */
        count: async function (params, headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/product-options/count`, {
                params: params,
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN',
            })
        },
        /**
         * 
         * @param {object} params 
         * @param {string} params.packageYn
         * @param {string} params.productCategoryId
         * @param {string} params.productSubCategoryId
         * @param {string} params.productId
         * @param {string} params.stockManagementYn
         * @param {string} params.searchCondition
         * @param {string} params.searchQuery
         * @param {string} params.sort
         * @param {number} params.page
         * @param {number} params.size
         * @param {object} headers 
         * @param {string} headers.wsId
         * @returns 
         */
        searchPagePositionInventory: async function (params, headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/product-options/page/related:ProductCategoryAndProductSubCategoryAndProduct`, {
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
         * @param {string} params.packageYn
         * @param {string} params.productCategoryId
         * @param {string} params.productSubCategoryId
         * @param {string} params.productId
         * @param {string} params.stockManagementYn
         * @param {string[]} params.searchCondition
         * @param {string} params.searchQuery
         * @param {string} params.sort
         * @param {number} params.page
         * @param {number} params.size
         * @param {object} headers 
         * @param {string} headers.wsId
         * @returns 
         */
        searchPositionTotalSize: async function (params, headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/product-options/count`, {
                params: params,
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN',
                paramsSerializer: params => {
                    return qs.stringify(params, { arrayFormat: 'brackets' })
                }
            })
        }
    }
}

export {
    productOptionDataConnect
}