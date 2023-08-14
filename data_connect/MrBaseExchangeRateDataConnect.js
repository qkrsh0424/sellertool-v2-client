import axios from "axios";
import withMainApiCsrfWrapper from "../utils/withMainApiCsrfWrapper";
import { axiosAuthInterceptor } from "./axiosInterceptors";


const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress;


export const MrBaseExchangeRateDataConnect = {
    baseMarginRecord: baseMarginRecord
}

/**
 * 마진 레코드 기반
 */
function baseMarginRecord() {
    const BASE_URL = `${API_ADDRESS}/api/v1/margin-records/mr-base-exchange-rates`;

    return {
        /**
         * 
         * @param {object} options 
         * @returns 
         */
        searchList: async function (options = { headers, params }) {
            const { headers, params } = options;

            return await axiosAuthInterceptor.get(`${BASE_URL}`, {
                params: params,
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            });
        },
    }
}