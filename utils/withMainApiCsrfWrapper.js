import { csrfDataConnect } from "../data_connect/csrfDataConnect";
import { getCookieExpiration, isValidCookieDuration } from "./cookieCheckUtils";

let IS_CSRF_REFRESHING = false;
let CALLBACK_SUBSCRIBERS = [];
const API_CSRF_EXPIRED_AT = 'api_csrf_expired_at';

const onRefreshedTokens = () => {
    CALLBACK_SUBSCRIBERS.map((callback) => callback());
    CALLBACK_SUBSCRIBERS = [];
};

const addCallbackSubscriber = (callback) => {
    CALLBACK_SUBSCRIBERS.push(callback);
};

export default async function withMainApiCsrfWrapper(callback) {
    const retryOriginReq = new Promise((resolve) => {
        addCallbackSubscriber(() => {
            resolve(callback());
        });
    });

    if (!IS_CSRF_REFRESHING) {
        IS_CSRF_REFRESHING = true;
        if (!isValidCookieDuration(getCookieExpiration(API_CSRF_EXPIRED_AT))) {
            await csrfDataConnect().getApiCsrf();
        }
        onRefreshedTokens();
        IS_CSRF_REFRESHING = false;
    }

    return retryOriginReq;
}