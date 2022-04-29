import axios from "axios"
import { axiosAuthInterceptor } from "./axiosInterceptors"

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress
const SCP_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.scpApiAddress : process.env.production.scpApiAddress
const AUTH_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.authApiAddress : process.env.production.authApiAddress

const csrfDataConnect = () => {
    return {
        getAuthCsrf: async function(){
            return await axios.get(`${AUTH_API_ADDRESS}/auth/v1/csrf`,{
                withCredentials: true
            })
            .catch(err=>{
                if(!err.response){
                    alert('네트워크 연결이 원활하지 않습니다.');
                }
            })
        },
        getApiCsrf: async function(){
            return await axios.get(`${API_ADDRESS}/api/v1/csrf`,{
                withCredentials: true
            })
            .catch(err=>{
                if(!err.response){
                    alert('네트워크 연결이 원활하지 않습니다.');
                }
            })
        },
        postCsrf: async function(){
            return await axiosAuthInterceptor.post(`${AUTH_API_ADDRESS}/auth/v1/csrf`,{},{
                xsrfCookieName:'csrf_token',
                xsrfHeaderName:'X-XSRF-TOKEN',
                withCredentials: true
            });
        }
    }
}

export {
    csrfDataConnect
}