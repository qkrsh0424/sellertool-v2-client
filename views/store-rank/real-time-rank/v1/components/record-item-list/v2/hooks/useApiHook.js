import { customToast, defaultOptions } from "../../../../../../../../components/toast/custom-react-toastify/v1";
import { nRankRecordDataConnect } from "../../../../../../../../data_connect/nRankRecordDataConnect";

export function useApiHook() {
    const onReqChangeNRankRecordCategory = async (
        options = {headers: {}, params: {}, body: {}},
        callbackFn = {
            success: (results, response) => {}
        }
    ) => {
        await nRankRecordDataConnect().changeCategory(options.headers, options.params, options.body)
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
        onReqChangeNRankRecordCategory
    }
}