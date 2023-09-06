import axios from "axios"

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress;
const AUTH_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.authApiAddress : process.env.production.authApiAddress;
const STORE_RANK_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.storeRankApiAddress : process.env.production.storeRankApiAddress

const csrfDataConnect = () => {
    return {
        getAuthCsrf: async function () {
            return await axios.get(`${AUTH_API_ADDRESS}/auth/v1/csrf`, {
                withCredentials: true
            })
                .catch(err => {
                    if (!err.response) {
                        alert('네트워크 연결이 원활하지 않습니다.');
                    }
                })
        },
        getApiCsrf: async function () {
            return await axios.get(`${API_ADDRESS}/api/v1/csrf`, {
                withCredentials: true
            })
                .catch(err => {
                    if (!err.response) {
                        alert('네트워크 연결이 원활하지 않습니다.');
                    }
                })
        },
        getStoreRankCsrf: async function () {
            return await axios.get(`${STORE_RANK_API_ADDRESS}/api/v1/csrf`, {
                withCredentials: true
            })
                .catch(err => {
                    if (!err.response) {
                        alert('네트워크 연결이 원활하지 않습니다.');
                    }
                })
        }
    }
}

export {
    csrfDataConnect
}