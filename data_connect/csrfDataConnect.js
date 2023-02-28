import axios from "axios"

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress;
const AUTH_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.authApiAddress : process.env.production.authApiAddress;

const API_CSRF_EXPIRED_AT = 'api_csrf_expired_at';
let isPendingApiCsrf = false;

const csrfDataConnect = () => {
    return {
        getAuthCsrf: async function () {
            return await axios.get(`${AUTH_API_ADDRESS}/auth/v1/csrf`, {
                withCredentials: true
            })
                .catch(err => {
                    if (!err.response) {
                        alert('네트워크 연결이 원활하지 않습니다.');
                    }
                })
        },
        getApiCsrf: async function () {
            if (!isPendingApiCsrf) {
                isPendingApiCsrf = true;

                if (isCookieDurationValid(checkCookieExpiration(API_CSRF_EXPIRED_AT))) {
                    isPendingApiCsrf = false;
                    return;
                }

                await axios.get(`${API_ADDRESS}/api/v1/csrf`, {
                    withCredentials: true
                })
                    .catch(err => {
                        if (!err.response) {
                            alert('네트워크 연결이 원활하지 않습니다.');
                        }
                    });
                isPendingApiCsrf = false;
            }
            return null;
        }
    }
}

function checkCookieExpiration(cookieName) {
    const cookieValue = `; ${document.cookie}`;
    const parts = cookieValue.split(`; ${cookieName}=`);
    let expiration = null;

    if (parts.length === 2) {
        const cookieContent = parts.pop().split(';').shift();
        const decodedCookieContent = decodeURIComponent(cookieContent);
        expiration = new Date(decodedCookieContent);
    }

    return isNaN(Date.parse(expiration)) ? null : expiration;
}

function isCookieDurationValid(idate) {
    let expiration = new Date(idate);
    return expiration !== null && new Date() < expiration;
}
export {
    csrfDataConnect
}