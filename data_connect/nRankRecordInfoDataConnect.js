import { axiosAuthInterceptor } from "./axiosInterceptors"

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.storeRankApiAddress : process.env.production.storeRankApiAddress

const nRankRecordInfoDataConnect = () => {
    return {
        searchList: async function (headers, params) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/nrank-record-infos/nrank-record/${params.record_id}`, {
                headers,
                withCredentials: true
            })
        },
    }
}

export {
    nRankRecordInfoDataConnect
}