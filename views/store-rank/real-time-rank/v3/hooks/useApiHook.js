import { customToast, defaultOptions } from "../../../../../components/toast/custom-react-toastify/v1";
import { nRankRecordDataConnect } from "../../../../../data_connect/nRankRecordDataConnect";

export function useApiHook() {
    const onReqCreateSearchInfo = async (
        options = {body: {}, params: {}, headers: {}},
        callbackFn = {
            successCallback: (results, response) => { },
            failCallback: () => {}
        }
    ) => {
        await nRankRecordDataConnect().createOne(options?.body, options?.headers)
            .then(res => {
                if(res.status === 200) {
                    let memo = '정상적으로 추가되었습니다.'
                    customToast.success(memo, {
                        ...defaultOptions,
                        toastId: memo
                    })
                    callbackFn.successCallback(res?.data?.data, res);
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
        onReqCreateSearchInfo
    }
}