import withStoreRankApiCsrfWrapper from "../utils/withStoreRankApiCsrfWrapper"
import { axiosAuthInterceptor } from "./axiosInterceptors"

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.storeRankApiAddress : process.env.production.storeRankApiAddress

const nRankRecordDetailDataConnect = () => {
    return {
        searchList: async function (headers, params) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/nrank-record-details/nrank-record-info/${params.record_info_id}`, {
                headers,
                withCredentials: true
            })
        },
        createList: async function (headers, body) {
            return await withStoreRankApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/nrank-record-details`, body, {
                    headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_nrank_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        searchListByInfosAndPid: async function (headers, body) {
            return await withStoreRankApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/nrank-record-details/search`, body, {
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
    nRankRecordDetailDataConnect
}