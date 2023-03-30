import { axiosAuthInterceptor } from "./axiosInterceptors"
import { csrfDataConnect } from "./csrfDataConnect"

const AUTH_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.authApiAddress : process.env.production.authApiAddress;

const workspaceMemberDataConnect = () => {
    return {
        searchMe: async function (headers) {
            return await axiosAuthInterceptor.get(`${AUTH_API_ADDRESS}/auth/v1/workspace-members/me`, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {*} param0 
         * @param {String} param0.workspaceId
         */
        searchListByWorkspaceId: async function (headers) {
            return await axiosAuthInterceptor.get(`${AUTH_API_ADDRESS}/auth/v1/workspace-members`, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
        * 워크스페이스 멤버의 권한 템플릿을 업데이트 한다.
        * @param {object} body
        * @param {string} body.workspaceMemberId
        * @param {string} body.workspaceAuthTemplateId
        * @param {object} headers
        * @param {string} headers.wsId
        * 
        */
        changeWorkspaceAuthTemplate: async function (body, headers) {
            await csrfDataConnect().getAuthCsrf();
            return await axiosAuthInterceptor.patch(`${AUTH_API_ADDRESS}/auth/v1/workspace-members/target:workspaceAuthTemplate`, body, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * @param {object} body
         * @param {string} body.workspaceMemberId
         * @param {string} body.profileImageUri
         * @param {object} headers
         * @param {string} headers.wsId
         */
        changeProfileImageUri: async function (body, headers) {
            await csrfDataConnect().getAuthCsrf();
            return await axiosAuthInterceptor.patch(`${AUTH_API_ADDRESS}/auth/v1/workspace-members/target:profileImageUri`, body, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * @param {object} body
         * @param {string} body.workspaceMemberId
         * @param {string} body.nickname
         * @param {object} headers
         * @param {string} headers.wsId
         */
        changeNickname: async function (body, headers) {
            await csrfDataConnect().getAuthCsrf();
            return await axiosAuthInterceptor.patch(`${AUTH_API_ADDRESS}/auth/v1/workspace-members/target:nickname`, body, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * @param {object} body
         * @param {string} body.workspaceMemberId
         * @param {string} body.phoneNumber
         * @param {object} headers
         * @param {string} headers.wsId
         */
        changePhoneNumber: async function (body, headers) {
            await csrfDataConnect().getAuthCsrf();
            return await axiosAuthInterceptor.patch(`${AUTH_API_ADDRESS}/auth/v1/workspace-members/target:phoneNumber`, body, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * @param {object} body
         * @param {string} body.workspaceMemberId
         * @param {string} body.email
         * @param {object} headers
         * @param {string} headers.wsId
         */
        changeEmail: async function (body, headers) {
            await csrfDataConnect().getAuthCsrf();
            return await axiosAuthInterceptor.patch(`${AUTH_API_ADDRESS}/auth/v1/workspace-members/target:email`, body, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body
         * @param {string} body.workspaceMemberId
         * @param {object} headers
         * @param {string} headers.wsId
         */
        deleteOne: async function (body, headers) {
            await csrfDataConnect().getAuthCsrf();
            return await axiosAuthInterceptor.delete(`${AUTH_API_ADDRESS}/auth/v1/workspace-members/${body.workspaceMemberId}`, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * 
         * @param {object} body
         * @param {string} body.workspaceMemberId
         */
        leaveWorkspace: async function (body) {
            await csrfDataConnect().getAuthCsrf();
            return await axiosAuthInterceptor.post(`${AUTH_API_ADDRESS}/auth/v1/workspace-members/leave`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    workspaceMemberDataConnect
}