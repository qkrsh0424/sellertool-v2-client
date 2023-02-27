import axios from "axios"
import { axiosAuthInterceptor } from "./axiosInterceptors"
import { csrfDataConnect } from "./csrfDataConnect"
import qs from 'qs';

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress
const SCP_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.scpApiAddress : process.env.production.scpApiAddress

const inventoryReleaseDataConnect = () => {
    return {
        createAll: async function (body) {
            return await axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/inventory-releases/all`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body 
         * @param {string} body.id
         * @param {string} body.memo
         * @param {string} body.workspaceId
         */
        changeMemo: async function (body) {
            return await axiosAuthInterceptor.patch(`${API_ADDRESS}/api/v1/inventory-releases/target:memo`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    inventoryReleaseDataConnect
}