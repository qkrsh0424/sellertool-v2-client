import withMainApiCsrfWrapper from "../utils/withMainApiCsrfWrapper"
import { axiosAuthInterceptor } from "./axiosInterceptors"

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress

const productOptionPackageDataConnect = () => {
    return {
        /**
         * 
         * @param {string} productOptionId 
         * @param {object} headers 
         * @param {string} headers.wsId
         * @returns 
         */
        searchList: async function (productOptionId, headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/product-option-packages/product-options/${productOptionId}`, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body 
         * @param {string[]} body.productOptionIds
         * @param {object} headers 
         * @param {string} headers.wsId
         * @returns 
         */
        searchProductInfoListByProductOptionIds: async function (body, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/product-option-packages/search/product-infos`, body, {
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
         * @param {string} body.productOptionId
         * @param {object[]} body.productOptionPackages [...moreItems]
         * @param {object} headers 
         * @param {string}headers.wsId
         * @returns 
         */
        updateAll: async function (body, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.put(`${API_ADDRESS}/api/v1/product-option-packages/all`, body, {
                    headers: headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
    }
}

export {
    productOptionPackageDataConnect
}