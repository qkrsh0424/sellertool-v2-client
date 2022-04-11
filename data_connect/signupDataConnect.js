import axios from "axios"

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress
const SCP_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.scpApiAddress : process.env.production.scpApiAddress
const AUTH_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.authApiAddress : process.env.production.authApiAddress

const signupDataConnect = () => {
    return {
        signup: async function(params){
            return await axios.post(`${AUTH_API_ADDRESS}/auth/v1/signup`,params,{
                xsrfCookieName: 'auth_csrf',
                xsrfHeaderName:'X-XSRF-TOKEN',
                withCredentials:true
            })
        }
    }
}

export {
    signupDataConnect
}