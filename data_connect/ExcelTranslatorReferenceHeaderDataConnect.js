import { axiosAuthInterceptor } from "./axiosInterceptors"
import withMainApiCsrfWrapper from "../utils/withMainApiCsrfWrapper";

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress;

export const ExcelTranslatorReferenceHeaderDataConnect = {
    baseExcelEditorPage: baseExcelEditorPage
}

function baseExcelEditorPage() {
    const BASE_URL = `${API_ADDRESS}/page-api/excel-editor/v1/excel-translator-reference-headers`;

    return {
        /**
         * @param {object} headers 
         * @param {string} headers.wsId
         * @returns 
         */
        searchList: async function ({ params, headers }) {
            return axiosAuthInterceptor.get(`${BASE_URL}`, {
                params: params,
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
    }
}