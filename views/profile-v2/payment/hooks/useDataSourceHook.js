import { customToast, defaultOptions } from "../../../../components/toast/custom-react-toastify/v1";
import { PaymentDataConnect } from "../../../../data_connect/PaymentDataConnect";
import { workspaceDataConnect } from "../../../../data_connect/workspaceDataConnect";

const paymentDataConnect = PaymentDataConnect();

export function useDataSourceHook(props) {

    const onReqFetchPaymentList = async (options, callbackFn = (results, response) => { }) => {
        await paymentDataConnect.searchPaidPaymentList()
            .then(res => {
                if (res.status === 200) {
                    callbackFn(res?.data?.data, res);
                }
            })
            .catch(err => {
                let res = err.response;
                let errorMessage = 'error';
                console.log(res);

                if (!res) {
                    errorMessage = '네트워크 연결이 원활하지 않습니다.';
                } else if (res.status === 500) {
                    errorMessage = 'undefined error. 관리자에 문의해 주세요.';
                    return;
                } else if (res?.data?.error) {
                    errorMessage = '잘못된 요청값 입니다.';
                } else {
                    errorMessage = res?.data?.memo;
                }

                customToast.error(errorMessage, {
                    ...defaultOptions,
                    toastId: errorMessage
                });
                return;
            })
            ;
    }

    const onReqFetchWorkspaces = async (options, callbackFn = (results, response) => { }) => {
        await workspaceDataConnect().getWorkspaces()
            .then(res => {
                if (res.status === 200) {
                    callbackFn(res?.data?.data, res);
                }
            })
            .catch(err => {
                let res = err.response;
                let errorMessage = 'error';
                console.log(res);

                if (!res) {
                    errorMessage = '네트워크 연결이 원활하지 않습니다.';
                } else if (res.status === 500) {
                    errorMessage = 'undefined error. 관리자에 문의해 주세요.';
                    return;
                } else if (res?.data?.error) {
                    errorMessage = '잘못된 요청값 입니다.';
                } else {
                    errorMessage = res?.data?.memo;
                }

                customToast.error(errorMessage, {
                    ...defaultOptions,
                    toastId: errorMessage
                });
                return;
            })
    }

    return {
        onReqFetchPaymentList,
        onReqFetchWorkspaces
    }
}