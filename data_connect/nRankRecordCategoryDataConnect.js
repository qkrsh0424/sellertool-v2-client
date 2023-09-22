import withStoreRankApiCsrfWrapper from "../utils/withStoreRankApiCsrfWrapper"
import { axiosAuthInterceptor } from "./axiosInterceptors"

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.storeRankApiAddress : process.env.production.storeRankApiAddress

const nRankRecordCategoryDataConnect = () => {
    return {
        searchList: async function (headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/nrank-record-categories`, {
                headers,
                withCredentials: true
            })
        },
        createOne: async function (headers, body) {
            return await withStoreRankApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/nrank-record-categories`, body, {
                    headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_nrank_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        updateOne: async function (headers, body) {
            return await withStoreRankApiCsrfWrapper(
                () => axiosAuthInterceptor.put(`${API_ADDRESS}/api/v1/nrank-record-categories/${body.id}`, body, {
                    headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_nrank_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        deleteOne: async function (headers, params) {
            return await withStoreRankApiCsrfWrapper(
                () => axiosAuthInterceptor.delete(`${API_ADDRESS}/api/v1/nrank-record-categories/${params.id}`, {
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
    nRankRecordCategoryDataConnect
}