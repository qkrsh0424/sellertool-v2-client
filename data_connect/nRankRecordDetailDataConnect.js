import { axiosAuthInterceptor } from "./axiosInterceptors"
import withMainApiCsrfWrapper from "../utils/withMainApiCsrfWrapper";

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.storeRankApiAddress : process.env.production.storeRankApiAddress

const nRankRecordDetailDataConnect = () => {
    return {
        searchList: async function (params, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/nrank-record-details/nrank-records/${params.record_id}`, {
                    headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        createList: async function (body, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/nrank-record-details/${body.record_id}`, {
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
    nRankRecordDetailDataConnect
}