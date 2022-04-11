import axios from "axios"
import { axiosAuthInterceptor } from "./axiosInterceptors"

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress
const SCP_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.scpApiAddress : process.env.production.scpApiAddress

const workspaceDataConnect = () => {
    return {
        getWorkspace: async function(params){
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/workspace`,{
                params:params,
                withCredentials:true,
                xsrfCookieName: 'auth_csrf',
                xsrfHeaderName:'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    workspaceDataConnect
}