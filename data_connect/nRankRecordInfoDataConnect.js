import { axiosAuthInterceptor } from "./axiosInterceptors"

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.storeRankApiAddress : process.env.production.storeRankApiAddress

const nRankRecordInfoDataConnect = () => {
    return {
        // rank detail search modal에서 사용하는 search limit info list api
        searchLimitListByRecordId: async function (headers, params) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/nrank-record-infos/for:nrankSearchModal/nrank-record/${params.record_id}`, {
                headers,
                withCredentials: true
            })
        },
    }
}

export {
    nRankRecordInfoDataConnect
}