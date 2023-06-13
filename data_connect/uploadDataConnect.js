import axios from "axios";
import withMainApiCsrfWrapper from "../utils/withMainApiCsrfWrapper";
import { axiosAuthInterceptor } from "./axiosInterceptors";

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress;

const uploadDataConnect = () => {
    return {
        uploadImagesToS3: async function (formData) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/upload/s3/images`, formData, {
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        }
    }
}

export {
    uploadDataConnect
}