import { customToast, defaultOptions } from "../../../../../../../../components/toast/custom-react-toastify/v1";
import { nRankRecordDetailDataConnect } from "../../../../../../../../data_connect/nRankRecordDetailDataConnect";
import { nRankRecordDataConnect } from "../../../../../../../../data_connect/nRankRecordDataConnect";

export function useApiHook() {
    const onReqCreateNRankRecordDetail = async (
        options = {headers: {}, params: {}, body: {}}
    ) => {
        await nRankRecordDetailDataConnect().createList(options.headers, options.body)
            .catch(err => {
                const res = err.response;
                customToast.error(res?.data?.memo, {
                    ...defaultOptions,
                    toastId: res?.data?.memo
                });
            })
    }

    const onReqSearchNRankRecordDetail = async (
        options = {headers: {}, params: {}},
        callbackFn = {
            success: (results, response) => {},
        }
    ) => {
        await nRankRecordDetailDataConnect().searchList(options.headers, options.params)
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

    const onReqChangeNRankRecordStatusToPending = async (
        options = {headers: {}, params: {}, body: {}},
        callbackFn = {
            success: (results, response) => {},
        }
    ) => {
        await nRankRecordDataConnect().changeStatusToPending(options.headers, options.params, options.body)
            .then(res => {
                if (res.status === 200) {
                    callbackFn.success(res?.data?.data);
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
        onReqChangeNRankRecordStatusToPending,
        onReqCreateNRankRecordDetail,
        onReqSearchNRankRecordDetail
    }
}