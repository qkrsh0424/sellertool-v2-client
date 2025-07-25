import { customToast } from "../components/toast/custom-react-toastify/v1"
import { axiosAuthInterceptor } from "./axiosInterceptors"
import { csrfDataConnect } from "./csrfDataConnect"

const AUTH_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.authApiAddress : process.env.production.authApiAddress

export const managedWorkspaceApiDataConnect = () => {
    return {
        searchList: async function ({ headers }) {
            return await axiosAuthInterceptor.get(`${AUTH_API_ADDRESS}/auth/v1/managed-workspace-apis`, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            }).then(res => {
                if (res.status === 200) {
                    return {
                        res: res,
                        content: res.data?.data
                    }
                }
            }).catch(err => {
                if (!err) {
                    customToast.error('서버와의 연결이 원할하지 않습니다.');
                    return;
                }

                let res = err.response;

                customToast.error(res?.data?.memo);
            })
        },
        createOne: async function ({ body, headers }) {
            await csrfDataConnect().getAuthCsrf();
            return await axiosAuthInterceptor.post(`${AUTH_API_ADDRESS}/auth/v1/managed-workspace-apis/add-one`, body, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            }).then(res => {
                if (res.status === 200) {
                    return {
                        res: res,
                        content: res.data?.data
                    }
                }
            }).catch(err => {
                if (!err) {
                    customToast.error('서버와의 연결이 원할하지 않습니다.');
                    return;
                }

                let res = err.response;

                customToast.error(res?.data?.memo);
            })
        },
        updateOne: async function ({ body, headers }) {
            await csrfDataConnect().getAuthCsrf();
            return await axiosAuthInterceptor.put(`${AUTH_API_ADDRESS}/auth/v1/managed-workspace-apis/update-one`, body, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            }).then(res => {
                if (res.status === 200) {
                    return {
                        res: res,
                        content: res.data?.data
                    }
                }
            }).catch(err => {
                if (!err) {
                    customToast.error('서버와의 연결이 원할하지 않습니다.');
                    return;
                }

                let res = err.response;

                customToast.error(res?.data?.memo);
            })
        },
        deleteOne: async function ({ body, headers }) {
            await csrfDataConnect().getAuthCsrf();
            return await axiosAuthInterceptor.delete(`${AUTH_API_ADDRESS}/auth/v1/managed-workspace-apis/${body?.uuid}`, {
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_auth_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            }).then(res => {
                if (res.status === 200) {
                    return {
                        res: res,
                        content: res.data?.data
                    }
                }
            }).catch(err => {
                if (!err) {
                    customToast.error('서버와의 연결이 원할하지 않습니다.');
                    return;
                }

                let res = err.response;

                customToast.error(res?.data?.memo);
            })
        },
    }
}