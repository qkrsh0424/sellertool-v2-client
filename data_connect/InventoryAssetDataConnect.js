import { axiosAuthInterceptor } from "./axiosInterceptors"
import withMainApiCsrfWrapper from "../utils/withMainApiCsrfWrapper";

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress;

export const InventoryAssetDataConnect = {
    baseInventoryPage: baseInventoryPage
}

function baseInventoryPage() {
    const BASE_URL = `${API_ADDRESS}/page-api/inventory/v1/inventory-assets`;

    return {
        /**
         * @param {object} headers 
         * @param {string} headers.wsId
         * @returns 
         */
        searchPage: async function ({ params, headers }) {
            return axiosAuthInterceptor.get(`${BASE_URL}/page`, {
                params: params,
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
    }
}