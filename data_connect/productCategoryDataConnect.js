import { axiosAuthInterceptor } from "./axiosInterceptors"
import { csrfDataConnect } from "./csrfDataConnect"

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress

const productCategoryDataConnect = () => {
    return {
        /**
         * 
         * @param {object} params 
         * @param {string} workspaceId
         * @returns 
         */
        searchList: async function (params) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/product-categories/workspaces/${params.workspaceId}`, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body 
         * @param {string} workspaceId,
         * @param {string} name
         * @returns 
         */
        create: async function (body) {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/product-categories/workspaces/${body.workspaceId}`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body 
         * @param {string} body.productCategoryId
         * @param {string} body.name
         * @returns 
         */
        changeName: async function (body) {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.patch(`${API_ADDRESS}/api/v1/product-categories/${body.productCategoryId}/target:name`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body 
         * @param {string} productCategoryId
         */
        delete: async function (body) {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.delete(`${API_ADDRESS}/api/v1/product-categories/${body.productCategoryId}`, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    productCategoryDataConnect
}