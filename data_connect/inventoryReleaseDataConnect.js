import { axiosAuthInterceptor } from "./axiosInterceptors"
import withMainApiCsrfWrapper from "../utils/withMainApiCsrfWrapper";

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress;

const inventoryReleaseDataConnect = () => {
    return {
        /**
         * 
         * @param {object} body 
         * @param {object[]} body.inventoryReleases [...moreItems]
         * @param {object} headers 
         * @param {string} headers.wsId
         * @returns 
         */
        createAll: async function (body, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/inventory-releases/all`, body, {
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
                () => axiosAuthInterceptor.patch(`${API_ADDRESS}/api/v1/inventory-releases/target:memo`, body, {
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
                () => axiosAuthInterceptor.delete(`${API_ADDRESS}/api/v1/inventory-releases/${body.id}`, {
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
    inventoryReleaseDataConnect
}