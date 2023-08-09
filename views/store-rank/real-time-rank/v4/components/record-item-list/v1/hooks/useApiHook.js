import { nRankRecordDataConnect } from "../../../../../../../../data_connect/nRankRecordDataConnect";
import { nRankRecordDetailDataConnect } from "../../../../../../../../data_connect/nRankRecordDetailDataConnect";

export function useApiHook() {
    const onReqCreateNRankRecordDetail = async (
        options = {body: {}, headers: {}},
        callbackFn = {
            fail: () => {}
        }
    ) => {
        await nRankRecordDetailDataConnect().createList(options.body, options.headers)
            .catch(err => {
                const res = err.response;
                customToast.error(res?.data?.memo, {
                    ...defaultOptions,
                    toastId: res?.data?.memo
                });
                callbackFn.fail();
            })
    }

    const onReqChangeNRankRecordStatusToFail = async (
        options = {params: {}, headers: {}},
    ) => {
        await nRankRecordDataConnect().changeStatusToFail(options.params, options.headers)
            .catch(err => {
                const res = err.response;
                customToast.error(res?.data?.memo, {
                    ...defaultOptions,
                    toastId: res?.data?.memo
                })
            })
    }

    return {
        onReqCreateNRankRecordDetail,
        onReqChangeNRankRecordStatusToFail
    }
}