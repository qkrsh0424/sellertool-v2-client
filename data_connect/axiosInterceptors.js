import axios from "axios";

const AUTH_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.authApiAddress : process.env.production.authApiAddress

const axiosAuthInterceptor = axios.create({
    timeout: 30000
});

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
                await axios.post(`${AUTH_API_ADDRESS}/auth/v1/users/reissue/access-token`, {}, {
                    withCredentials: true,
                    xsrfCookieName: 'x_auth_csrf_token',
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
        }
        return Promise.reject(error);
    }
)
export { axiosAuthInterceptor };