let IS_CSRF_REFRESHING = false;
let CALLBACK_SUBSCRIBERS = [];

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
        await csrfDataConnect().getApiCsrf();
        onRefreshedTokens();
        IS_CSRF_REFRESHING = false;
    }

    return retryOriginReq;
}