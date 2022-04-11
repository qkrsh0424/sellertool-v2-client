import axios from "axios";
import { hasCsrfToken } from "../utils/cookieCheckUtils";

const AUTH_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.authApiAddress : process.env.production.authApiAddress

const axiosAuthInterceptor = axios.create();

let isCsrfRefreshing = false;
let isAuthTokenRefreshing = true;
let refreshSubscribers = [];

const onTokenRefreshed = () => {
    refreshSubscribers.map((callback) => callback());
    refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
    refreshSubscribers.push(callback);
};

axiosAuthInterceptor.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        let originalReq = error.config;

        const retryOriginalRequest = new Promise((resolve) => {
            addRefreshSubscriber(() => {
                resolve(axios(originalReq));
            });
        });

        if (error.response.status === 401) {
            // 액세스 토큰 리프레시를 위한 csrf 발급
            if (!isCsrfRefreshing) {
                isCsrfRefreshing = true;
                await axios.get(`${AUTH_API_ADDRESS}/auth/v1/csrf`, {
                    withCredentials: true
                })
                    .catch((err) => {
                        isCsrfRefreshing = false;
                        isAuthTokenRefreshing = true;
                        refreshSubscribers = [];
                        return Promise.reject(err);
                    })
                isCsrfRefreshing = false;
                isAuthTokenRefreshing = false;
            }

            if (!isAuthTokenRefreshing) {
                isAuthTokenRefreshing = true;
                await axios.post(`${AUTH_API_ADDRESS}/auth/v1/refresh`, {}, {
                    withCredentials: true,
                    xsrfCookieName: 'auth_csrf',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
                    .catch(err => {
                        isCsrfRefreshing = false;
                        isAuthTokenRefreshing = true;
                        refreshSubscribers = [];
                        // 기존 에러 내보내기
                        return Promise.reject(error);
                    })
                    .finally(() => {
                        onTokenRefreshed();
                    })
            }

            return retryOriginalRequest;

            // 액세스 토큰 재발급, 성공적으로 발급되면 다시한번 원래 요청을 보내고, 에러가 난다면 기존의 에러를 반환 한다.
            // return await axios.post(`${AUTH_API_ADDRESS}/auth/v1/refresh`, {}, {
            //     withCredentials: true,
            //     xsrfCookieName: 'auth_csrf',
            //     xsrfHeaderName: 'X-XSRF-TOKEN'
            // })
            //     .then(async res => {
            //         if (res.status === 200 && res.data.message === 'success') {
            //             // 기존 요청 재요청
            //             error.config.__isRetryRequest = true;
            //             return await axios(originalReq);
            //         }
            //     })
            //     .catch(err => {
            //         console.log(err.response)
            //         // 기존 에러 내보내기
            //         return Promise.reject(error);
            //     })


        }
        return Promise.reject(error);
    }
)
export { axiosAuthInterceptor };