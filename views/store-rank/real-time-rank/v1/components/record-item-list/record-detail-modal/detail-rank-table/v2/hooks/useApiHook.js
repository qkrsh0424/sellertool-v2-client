import { customToast, defaultOptions } from "../../../../../../../../../../components/toast/custom-react-toastify/v1";
import { nRankRecordDetailDataConnect } from "../../../../../../../../../../data_connect/nRankRecordDetailDataConnect";

export function useApiHook() {
    const onReqSearchNRankRecordDetailByFilter = async (
        options = {headers: {}, body: {}},
        callbackFn = {
            success: (results, response) => {},
            fail: () => {}
        }
    ) => {
        await nRankRecordDetailDataConnect().searchListByFilter(options.headers, options.body)
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
                
                callbackFn.fail();
            })
    }

    return {
        onReqSearchNRankRecordDetailByFilter
    }
}