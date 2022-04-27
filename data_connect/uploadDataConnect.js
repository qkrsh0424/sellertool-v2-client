import axios from "axios";
import { axiosAuthInterceptor } from "./axiosInterceptors";

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress;

const uploadDataConnect = () => {
    return {
        uploadImages: async function (files) {
            return await axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/upload/s3/images`, files, {
                withCredentials: true,
                xsrfCookieName: 'api_csrf',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    uploadDataConnect
}