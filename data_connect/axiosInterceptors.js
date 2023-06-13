import axios from "axios";
import { eventUtils } from "../utils/eventUtils";

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
            console.log('토큰 재발급 시작', error.response);
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

                console.log('csrf 토큰 응답받음');
                await eventUtils.delay(500).then(() => { isAuthTokenRefreshing = false; });
                console.log('csrf 토큰 응답받고 다음작업 준비중.');
            }

            if (isCsrfRefreshing && !isAuthTokenRefreshing) {
                isAuthTokenRefreshing = true;
                await axios.post(`${AUTH_API_ADDRESS}/auth/v1/users/reissue/access-token`, {}, {
                    withCredentials: true,
                    xsrfCookieName: 'x_auth_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
                    .catch(() => {
                        isCsrfRefreshing = false;
                        isAuthTokenRefreshing = true;
                        refreshSubscribers = [];
                        // 기존 에러 내보내기
                        return Promise.reject(error);
                    });
                console.log('기존 요청들 실행전')
                await eventUtils.delay(500)
                    .then(() => {
                        onTokenRefreshed();
                        isCsrfRefreshing = false;
                        isAuthTokenRefreshing = true;
                        console.log('기존 요청들 실행후')
                    })
            }
            // setTimeout(async () => {
            //     console.log('CSRF 쿠키 등록완료', `isCsrfRefreshing ${isCsrfRefreshing}`, `isAuthTokenRefreshing ${isAuthTokenRefreshing}`)
            //     console.log('before reissue token');
            //     isAuthTokenRefreshing = false;
            //     if (isCsrfRefreshing && !isAuthTokenRefreshing) {
            //         isAuthTokenRefreshing = true;
            //         await axios.post(`${AUTH_API_ADDRESS}/auth/v1/users/reissue/access-token`, {}, {
            //             withCredentials: true,
            //             xsrfCookieName: 'x_auth_csrf_token',
            //             xsrfHeaderName: 'X-XSRF-TOKEN'
            //         })
            //             .catch(() => {
            //                 isCsrfRefreshing = false;
            //                 isAuthTokenRefreshing = true;
            //                 refreshSubscribers = [];
            //                 // 기존 에러 내보내기
            //                 return Promise.reject(error);
            //             })
            //             .finally(() => {
            //                 console.log('기존 요청들 실행전')
            //                 setTimeout(() => {
            //                     onTokenRefreshed();
            //                     console.log('기존 요청들 실행후')
            //                 }, 1000);
            //             })
            //         console.log('끛ㅌ')
            //     }
            //     isCsrfRefreshing = false;
            // }, 2000);



            return retryOriginalRequest;
        }
        return Promise.reject(error);
    }
)
export { axiosAuthInterceptor };