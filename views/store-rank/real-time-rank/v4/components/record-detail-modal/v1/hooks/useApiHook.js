import { customToast, defaultOptions } from "../../../../../../../../components/toast/custom-react-toastify/v1";
import { nRankRecordDetailDataConnect } from "../../../../../../../../data_connect/nRankRecordDetailDataConnect";
import { nRankRecordDataConnect } from "../../../../../../../../data_connect/nRankRecordDataConnect";

export function useApiHook() {
    const onReqCreateNRankRecordDetail = async (
        options = {params: {}, body: {}, headers: {}},
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

    const onReqSearchNRankRecordDetail = async (
        options = {params: {}, headers: {}},
        callbackFn = {
            success: (results, response) => {},
        }
    ) => {
        await nRankRecordDetailDataConnect().searchList(options.params, options.headers)
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
        options = {params: {}, headers: {}},
        callbackFn = {
            success: (results, response) => {},
        }
    ) => {
        await nRankRecordDataConnect().changeStatusToPending(options.params, options.headers)
            .then(res => {
                if (res.status === 200) {
                    callbackFn.success();
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
        onReqChangeNRankRecordStatusToPending,
        onReqChangeNRankRecordStatusToFail,
        onReqCreateNRankRecordDetail,
        onReqSearchNRankRecordDetail
    }
}