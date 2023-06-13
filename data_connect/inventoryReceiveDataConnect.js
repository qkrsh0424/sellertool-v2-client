import { axiosAuthInterceptor } from "./axiosInterceptors";
import withMainApiCsrfWrapper from "../utils/withMainApiCsrfWrapper";

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress;

const inventoryReceiveDataConnect = () => {
    return {
        /**
         * 
         * @param {object} body 
         * @param {object[]} body.inventoryReceives [...moreItems]
         * @param {object} headers 
         * @param {string} headers.wsId
         * @returns 
         */
        createAll: async function (body, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/inventory-receives/all`, body, {
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
         * @param {string} body.id
         * @param {string} body.memo
         * @param {object} headers
         * @param {string} headers.wsId
         */
        changeMemo: async function (body, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.patch(`${API_ADDRESS}/api/v1/inventory-receives/target:memo`, body, {
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
         * @param {string} body.id
         * @param {object} headers
         * @param {string} headers.wsId
         * @returns 
         */
        delete: async function (body, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.delete(`${API_ADDRESS}/api/v1/inventory-receives/${body.id}`, {
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
    inventoryReceiveDataConnect
}