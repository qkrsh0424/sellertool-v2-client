import { customToast, defaultOptions } from "../components/toast/custom-react-toastify/v1";

export const CustomErrorHandler = {
    error: (err) => {
        let res = err.response;
        let errorMessage = 'error';
        console.log(res);

        if (!res) {
            errorMessage = '네트워크 연결이 원활하지 않습니다.';
        } else if (res.status === 500) {
            errorMessage = 'CODE:500, 에러가 발생했습니다.\n페이지를 새로고침 후 이용해 주세요.\n문제가 지속될 시 관리자에 문의해 주세요.';
        } else if (res?.data?.memo) {
            errorMessage = res?.data?.memo;
        } else {
            errorMessage = `Error occured\nstatus:${res?.data?.status}\nerror:${res?.data?.error}\nmessage:${res?.data?.message}`;
        }

        customToast.error(errorMessage, {
            ...defaultOptions,
            toastId: errorMessage
        });
    },
    errorReactQuery: (error, errorOrigin) => {
        let res = error.response;
        let errorMessage = 'error';
        console.log(res);

        if (!res) {
            errorMessage = '네트워크 연결이 원활하지 않습니다.';
        } else if (res.status === 500) {
            errorMessage = 'CODE:500, 에러가 발생했습니다.\n페이지를 새로고침 후 이용해 주세요.\n문제가 지속될 시 관리자에 문의해 주세요.';
        } else if ((!errorOrigin || errorOrigin === 'DEFAULT') && res?.data?.memo) {
            errorMessage = res?.data?.memo;
        } else {
            errorMessage = `Error occured\nstatus:${res?.data?.status}\nerror:${res?.data?.error}\nmessage:${res?.data?.message}`;
        }

        customToast.error(errorMessage, {
            ...defaultOptions,
            toastId: errorMessage
        });
    },
    errorApiServer: (error, errorOrigin) => {
        let res = error.response;
        let errorMessage = 'error';
        console.log(res);

        if (!res) {
            errorMessage = '네트워크 연결이 원활하지 않습니다.';
        } else if (res.status === 500) {
            errorMessage = 'CODE:500, 에러가 발생했습니다.\n페이지를 새로고침 후 이용해 주세요.\n문제가 지속될 시 관리자에 문의해 주세요.';
        } else if ((!errorOrigin || errorOrigin === 'DEFAULT') && res?.data?.message) {
            errorMessage = res?.data?.message;
        } else {
            errorMessage = `Error occured\nstatus:${res?.data?.status}\nerror:${res?.data?.error}\nmessage:${res?.data?.statusText}`;
        }

        customToast.error(errorMessage, {
            ...defaultOptions,
            toastId: errorMessage
        });
    },
}