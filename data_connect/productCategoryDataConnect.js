import withMainApiCsrfWrapper from "../utils/withMainApiCsrfWrapper"
import { axiosAuthInterceptor } from "./axiosInterceptors"
import { csrfDataConnect } from "./csrfDataConnect"

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress

export const ProductCategoryDataConnect = {
    baseInventoryPage: baseInventoryPage
}

function baseInventoryPage() {
    const BASE_URL = `${API_ADDRESS}/page-api/inventory/v1/product-categories`;

    return {
        /**
         * 
         * @param {object} headers 
         * @param {string} headers.wsId
         * @returns 
         */
        searchList: async function (headers) {
            return await axiosAuthInterceptor.get(`${BASE_URL}`, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
    }
}

// UPDATED wsId -> headers
const productCategoryDataConnect = () => {
    return {
        /**
         * 
         * @param {object} headers 
         * @param {string} headers.wsId
         * @returns 
         */
        searchList: async function (headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/product-categories`, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body
         * @param {string} body.workspaceId,
         * @param {string} body.name
         * @returns 
         */
        create: async function (body) {
            let headers = {
                wsId: body.workspaceId
            }
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/product-categories`, body, {
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
         * @param {string} body.workspaceId
         * @param {string} body.productCategoryId
         * @param {string} body.name
         * @returns 
         */
        changeName: async function (body) {
            let headers = {
                wsId: body.workspaceId
            }
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.patch(`${API_ADDRESS}/api/v1/product-categories/${body.productCategoryId}/target:name`, body, {
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
         * @param {string} body.workspaceId
         * @param {string} productCategoryId
         */
        delete: async function (body) {
            let headers = {
                wsId: body.workspaceId
            }
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.delete(`${API_ADDRESS}/api/v1/product-categories/${body.productCategoryId}`, {
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
    productCategoryDataConnect
}