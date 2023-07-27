import { customToast, defaultOptions } from "../../../../../components/toast/custom-react-toastify/v1";
import { PaymentDataConnect } from "../../../../../data_connect/PaymentDataConnect";
import { RefSubscriptionPlanDataConnect } from "../../../../../data_connect/RefSubscriptionPlanDataConnect";
import { workspaceDataConnect } from "../../../../../data_connect/workspaceDataConnect";

const refSubscriptionPlanDataConnect = RefSubscriptionPlanDataConnect();
const paymentDataConnect = PaymentDataConnect();

export function useDataSourceHook(props) {

    const onReqFetchWorkspace = async (options = { params: {} }, callbackFn = (results, response) => { }) => {

        await workspaceDataConnect().getWorkspace(options?.params?.workspaceId)
            .then(res => {
                if (res.status === 200) {
                    callbackFn(res?.data?.data, res);
                }
            })
            .catch(err => {
                console.log(err, err.response);
                return;
            })
    }

    const onReqFetchRefSubscriptionPlan = async (options = {}, callbackFn = (results, response) => { }) => {

        await refSubscriptionPlanDataConnect.searchOne(options?.params)
            .then(res => {
                if (res?.status === 200) {
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
            });
    }

    const onReqPreparePayments = async (options = { body }, callbackFn = (results, response) => { }) => {
        await paymentDataConnect.preparePayments(options?.body)
            .then(res => {
                if (res?.status === 200) {
                    callbackFn(res?.data?.data, res);
                }
            })
            .catch(err => {
                let res = err.response;
                let errorMessage = 'error';

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
            });
    }

    return {
        onReqFetchWorkspace,
        onReqFetchRefSubscriptionPlan,
        onReqPreparePayments
    }
}