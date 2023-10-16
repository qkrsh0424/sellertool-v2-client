import { customToast, defaultOptions } from "../../../../../../../../../../components/toast/custom-react-toastify/v1";
import { nRankRecordDetailDataConnect } from "../../../../../../../../../../data_connect/nRankRecordDetailDataConnect";

export function useApiHook() {
    const onReqSearchNRankRecordDetailByInfosAndPid = async (
        options = {headers: {}, body: {}},
        callbackFn = {
            success: (results, response) => {},
        }
    ) => {
        await nRankRecordDetailDataConnect().searchListByInfosAndPid(options.headers, options.body)
            .then(res => {
                if (res.status === 200) {
                    callbackFn.success(res?.data?.data, res);
                }
            })
            .catch(err => {
                const res = err.response;
                customToast.error(res?.data?.memo, {
                    ...defaultOptions,
                    toastId: res?.data?.memo
                })
            })
    }

    return {
        onReqSearchNRankRecordDetailByInfosAndPid
    }
}