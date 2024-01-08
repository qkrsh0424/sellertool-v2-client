import { axiosAuthInterceptor } from "./axiosInterceptors"
import withMainApiCsrfWrapper from "../utils/withMainApiCsrfWrapper";

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress;

export const ExcelTranslatorDataConnect = {
    baseExcelEditorPage: baseExcelEditorPage
}

function baseExcelEditorPage() {
    const BASE_URL = `${API_ADDRESS}/page-api/excel-editor/v1/excel-translators`;

    return {
        searchList: async function ({ params, headers }) {
            return axiosAuthInterceptor.get(`${BASE_URL}`, {
                params: params,
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        create: async function ({ params, body, headers }) {
            return withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${BASE_URL}`, body, {
                    params: params,
                    headers: headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            );
        },
        uploadSourceExcel: async function ({ params, body, headers }) {
            return withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${BASE_URL}/upload/source-excel`, body, {
                    params: params,
                    headers: headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            );
        },
        uploadSettingExcel: async function ({ params, body, headers }) {
            return withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${BASE_URL}/upload/setting-excel`, body, {
                    params: params,
                    headers: headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            );
        },
        downloadResultExcel: async function ({ params, body, headers }) {
            return withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${BASE_URL}/download/result-excel`, body, {
                    params: params,
                    headers: headers,
                    responseType: 'blob',
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            );
        }
    }
}