import { customToast, defaultOptions } from "../components/toast/custom-react-toastify/v1";

export default function defaultErrorHandler(err) {
    let res = err.response;
    let memo = res?.data?.memo;

    if (!res) {
        memo = '네트워크 연결이 원활하지 않습니다.';
        customToast.error(memo, {
            ...defaultOptions,
            toastId: memo
        });
        return;
    }

    if (res.status === 500) {
        memo = 'undefined error.';
        customToast.error(memo, {
            ...defaultOptions,
            toastId: memo
        });
        return;
    }

    customToast.error(memo, {
        ...defaultOptions,
        toastId: memo
    });
}