import { customToast, defaultOptions } from "../../../../../../../../components/toast/custom-react-toastify/v1";
import { nRankRecordDetailDataConnect } from "../../../../../../../../data_connect/nRankRecordDetailDataConnect";

export function useApiHook() {
    const onReqCreateNRankRecordDetail = async (
        options = {params: {}, body: {}, headers: {}},
        callbackFn = {
            success: (results, response) => {},
            finally: () => {}
        }
    ) => {
        await nRankRecordDetailDataConnect().createList(options?.body, options?.headers)
            .then(res => {
                if(res.status === 200) {
                    callbackFn.success(res?.data?.data, res);
                }
            })
            .catch(err => {
                const res = err.response;
                customToast.error(res?.data?.memo, {
                    ...defaultOptions,
                    toastId: res?.data?.memo
                });
            }).finally(() => {
                callbackFn.finally()
            })
    }

    const onReqSearchNRankRecordDetail = async (
        options = {params: {}, headers: {}},
        callbackFn = {
            success: (results, response) => {},
        }
    ) => {
        await nRankRecordDetailDataConnect().searchList(options?.params, options?.headers)
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
        onReqCreateNRankRecordDetail,
        onReqSearchNRankRecordDetail
    }
}