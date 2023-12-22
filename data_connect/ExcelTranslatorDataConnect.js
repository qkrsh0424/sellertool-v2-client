import { axiosAuthInterceptor } from "./axiosInterceptors"
import withMainApiCsrfWrapper from "../utils/withMainApiCsrfWrapper";

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress;

export const ExcelTranslatorDataConnect = {
    baseExcelEditorPage: baseExcelEditorPage
}

function baseExcelEditorPage() {
    const BASE_URL = `${API_ADDRESS}/page-api/excel-editor/v1/excel-translators`;

    return {
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
    }
}