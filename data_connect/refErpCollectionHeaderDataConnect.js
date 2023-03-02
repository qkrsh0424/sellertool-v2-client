import axios from "axios"

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress

const refErpCollectionHeaderDataConnect = () => {
    return {
        searchList: async function () {
            return await axios.get(`${API_ADDRESS}/api/v1/ref-erp-collection-headers`, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    refErpCollectionHeaderDataConnect
}