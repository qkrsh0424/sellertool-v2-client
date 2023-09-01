import { customToast, defaultOptions } from "../../../../../../components/toast/custom-react-toastify/v1";
import { RefSubscriptionPlanDataConnect } from "../../../../../../data_connect/RefSubscriptionPlanDataConnect";

const refSubscriptionPlanDataConnect = RefSubscriptionPlanDataConnect();

export function useDataSourceHook(props) {
    const onReqFetchRefSubscriptionPlanList = async (options = {}, callbackFn = (results, response) => { }) => {
        await refSubscriptionPlanDataConnect.searchList()
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
                } else {
                    errorMessage = res?.data?.memo;
                }

                customToast.error(errorMessage, {
                    ...defaultOptions,
                    toastId: errorMessage
                });
            });
    }

    return {
        onReqFetchRefSubscriptionPlanList
    }
}