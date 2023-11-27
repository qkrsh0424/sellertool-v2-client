import { axiosAuthInterceptor } from "./axiosInterceptors"
import withMainApiCsrfWrapper from "../utils/withMainApiCsrfWrapper";

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress;

export const InventoryReleaseDataConnect = {
    baseInventoryPage: baseInventoryPage
}

function baseInventoryPage() {
    const BASE_URL = `${API_ADDRESS}/page-api/inventory/v1/inventory-releases`;

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
                () => axiosAuthInterceptor.post(`${BASE_URL}/all`, body, {
                    headers: headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        inventoryReleaseBulkCreateExcelUpload: async function (formData, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${BASE_URL}/bulkCreateExcelUpload/register-stocks`, formData, {
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
                () => axiosAuthInterceptor.patch(`${BASE_URL}/target:memo`, body, {
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
                () => axiosAuthInterceptor.delete(`${BASE_URL}/${body.id}`, {
                    headers: headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        }
    }
}