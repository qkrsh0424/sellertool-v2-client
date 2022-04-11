import axios from "axios"
import { axiosAuthInterceptor } from "./axiosInterceptors"
import { csrfDataConnect } from "./csrfDataConnect"

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress
const SCP_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.scpApiAddress : process.env.production.scpApiAddress

const marginRecordDataConnect = () => {
    return {
        createMarginRecord: async function (params) {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/margin-record/create`, params, {
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        updateMarginRecord: async function (params) {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.put(`${API_ADDRESS}/api/v1/margin-record/update`, params, {
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        deleteMarginRecord: async function (params) {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/margin-record/delete`, params, {
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        searchMarginRecord: async function (params) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/margin-record/one`, {
                params: params,
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        searchMarginRecordViewer: async function (params) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/margin-record/viewer/one`, {
                params: params,
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        searchMarginRecordList: async function (params) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/margin-record/list`, {
                params: params,
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    marginRecordDataConnect
}