import { axiosAuthInterceptor } from "./axiosInterceptors"
import withMainApiCsrfWrapper from "../utils/withMainApiCsrfWrapper";

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.storeRankApiAddress : process.env.production.storeRankApiAddress

const nRankRecordDataConnect = () => {
    return {
        createOne: async function (body, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/nrank-records`, body, {
                    headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        searchRecordList: async function (headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/nrank-records`, {
                    headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        searchOne: async function (params, headers) {
            // return await withMainApiCsrfWrapper(
            //     () => axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/nrank-records/${params.id}`, {
            //         headers,
            //         withCredentials: true,
            //         xsrfCookieName: 'x_api_csrf_token',
            //         xsrfHeaderName: 'X-XSRF-TOKEN'
            //     })
            // )
        },
        searchListByIds: async function (body, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/nrank-records/search`, body, {
                    headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        deleteOne: async function (params, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.delete(`${API_ADDRESS}/api/v1/nrank-records/${params.id}`, {
                    headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        changeStatusToPending: async function (params, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.patch(`${API_ADDRESS}/api/v1/nrank-records/${params.id}/target:status/action:pending`, {},  {
                    headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        changeStatusToFail: async function (params, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.patch(`${API_ADDRESS}/api/v1/nrank-records/${params.id}/target:status/action:fail`, {},  {
                    headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        }
    }
}

export {
    nRankRecordDataConnect
}