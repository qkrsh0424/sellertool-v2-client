import axios from "axios"
import withMainApiCsrfWrapper from "../utils/withMainApiCsrfWrapper"
import { axiosAuthInterceptor } from "./axiosInterceptors"
import { csrfDataConnect } from "./csrfDataConnect"

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress

const productOptionPackageDataConnect = () => {
    return {
        searchList: async function (productOptionId, headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/product-option-packages/product-options/${productOptionId}`, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        searchProductInfoListByProductOptionIds: async function (body) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/product-option-packages/search/product-infos`, body, {
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        updateAll: async function (body) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.put(`${API_ADDRESS}/api/v1/product-option-packages/all`, body, {
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
    }
}

export {
    productOptionPackageDataConnect
}