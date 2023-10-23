import withStoreRankApiCsrfWrapper from "../utils/withStoreRankApiCsrfWrapper"
import { axiosAuthInterceptor } from "./axiosInterceptors"

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.storeRankApiAddress : process.env.production.storeRankApiAddress

const nRankRecordDataConnect = () => {
    return {
        createOne: async function (headers, body) {
            return await withStoreRankApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/nrank-records`, body, {
                    headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_nrank_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        searchSlice: async function (headers, params) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/nrank-records/slice`, {
                headers,
                params,
                withCredentials: true
            })
        },
        searchCountOfSlice: async function (headers, params) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/nrank-records/count`, {
                headers,
                params,
                withCredentials: true
            })
        },
        deleteOne: async function (headers, params) {
            return await withStoreRankApiCsrfWrapper(
                () => axiosAuthInterceptor.delete(`${API_ADDRESS}/api/v1/nrank-records/${params.id}`, {
                    headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_nrank_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        // deprecated..
        // changeStatusToPending: async function (headers, params, body) {
        //     return await withStoreRankApiCsrfWrapper(
        //         () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/nrank-records/${params.id}/target:status/action:pending`, body,  {
        //             headers,
        //             withCredentials: true,
        //             xsrfCookieName: 'x_nrank_api_csrf_token',
        //             xsrfHeaderName: 'X-XSRF-TOKEN'
        //         })
        //     )
        // },
        changeStatusToPendingAndCreateRecordInfo: async function (headers, params, body) {
            return await withStoreRankApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/nrank-records/${params.id}/target:status/action:pending`, body,  {
                    headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_nrank_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        changeListStatusToFail: async function (headers, body) {
            return await withStoreRankApiCsrfWrapper(
                () => axiosAuthInterceptor.patch(`${API_ADDRESS}/api/v1/nrank-records/target:status/action:fail`, body,  {
                    headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_nrank_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        searchWorkspaceUsageInfo: async function (headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/nrank-records/workspace-usage-info`, {
                headers,
                withCredentials: true
            })
        },
        changeCategory: async function (headers, params, body) {
            return await withStoreRankApiCsrfWrapper(
                () => axiosAuthInterceptor.patch(`${API_ADDRESS}/api/v1/nrank-records/${params.id}/target:category`, body,  {
                    headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_nrank_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        }
    }
}

export {
    nRankRecordDataConnect
}