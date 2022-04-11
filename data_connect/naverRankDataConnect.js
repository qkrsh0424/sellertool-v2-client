import axios from "axios"

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress
const SCP_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.scpApiAddress : process.env.production.scpApiAddress

const naverRankDataConnect = () => {
    return {
        getHello: async function () {
            return await axios.get(`${SCP_API_ADDRESS}/scp/v1/hello`, {
                params:{
                    hello:'hello',
                    world:'world'
                },
                withCredentials: true
            })
        },
        getNaverRank: async function (params) {
            return await axios.get(`${SCP_API_ADDRESS}/scp/v1/n-rank`, {
                params:{
                    keyword: params?.keyword,
                    mallName: params?.mallName
                },
                withCredentials: true
            })
        }
    }
}

export {
    naverRankDataConnect
}