import axios from "axios"

const AUTH_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.authApiAddress : process.env.production.authApiAddress

const refWorkspaceAuthItemDataConnect = () => {
    return {
        searchList: async function () {
            return await axios.get(`${AUTH_API_ADDRESS}/auth/v1/ref-workspace-auth-items`, {
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    refWorkspaceAuthItemDataConnect
}