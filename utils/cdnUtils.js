const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress
const SCP_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.scpApiAddress : process.env.production.scpApiAddress
const AUTH_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.authApiAddress : process.env.production.authApiAddress

const cdnUtils = {
    getAPI: () => {
        return API_ADDRESS;
    },
    getSCP_API: () => {
        return SCP_API_ADDRESS;
    },
    getAUTH_API: () => {
        return AUTH_API_ADDRESS;
    }
}

export default cdnUtils