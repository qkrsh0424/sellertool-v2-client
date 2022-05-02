import axios from "axios";

const AUTH_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.authApiAddress : process.env.production.authApiAddress

const userInfoAuthDataConnect = () => {
    return {
        getPhoneAuthNumber: async function(phoneNumber){
            return await axios.get(`${AUTH_API_ADDRESS}/auth/v1/user-info-auth/phone`, {
                params: {
                    phoneNumber
                },
                withCredentials: true
            })
        },
        verifyPhoneAuthNumber: async function(phoneNumber, phoneAuthNumber){
            return await axios.get(`${AUTH_API_ADDRESS}/auth/v1/user-info-auth/phone/verify`, {
                params: {
                    phoneNumber,
                    phoneAuthNumber
                },
                withCredentials: true
            })
        },
        getEmailAuthNumber: async function(email){
            return await axios.get(`${AUTH_API_ADDRESS}/auth/v1/user-info-auth/email`, {
                params: {
                    email
                },
                withCredentials: true
            })
        },
        verifyEmailAuthNumber: async function(email, emailAuthNumber){
            return await axios.get(`${AUTH_API_ADDRESS}/auth/v1/user-info-auth/email/verify`, {
                params: {
                    email,
                    emailAuthNumber
                },
                withCredentials: true
            })
        }
    }
}

export {
    userInfoAuthDataConnect
}