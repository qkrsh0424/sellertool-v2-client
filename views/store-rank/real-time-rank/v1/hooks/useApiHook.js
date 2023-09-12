import { customToast, defaultOptions } from "../../../../../components/toast/custom-react-toastify/v1";
import { nRankRecordDataConnect } from "../../../../../data_connect/nRankRecordDataConnect";

export function useApiHook() {
    const onReqSearchSubscriptionPlanSearchInfo = async (
        options = {headers: {}},
        callbackFn = {
            success: (results, response) => {}
        }
    ) => {
        await nRankRecordDataConnect().searchWorkspaceUsageInfo(options?.headers)
            .then(res => {
                callbackFn.success(res?.data?.data, res);
            })
            .catch(err => {
                const res = err.response;
                customToast.error(res?.data?.memo, {
                    ...defaultOptions,
                    toastId: res?.data?.memo
                })
            })
    }

    const onReqCreateSearchInput = async (
        options = {headers: {}, body: {}},
        callbackFn = {
            success: (results, response) => {},
        }
    ) => {
        await nRankRecordDataConnect().createOne(options?.headers, options?.body)
            .then(res => {
                if(res.status === 200) {
                    let memo = '정상적으로 추가되었습니다.'
                    customToast.success(memo, {
                        ...defaultOptions,
                        toastId: memo
                    })
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

    const onReqDeleteNRankRecord = async (
        options = {headers: {}, params: {}},
        callbackFn = {
            success: (results, response) => {},
        }
    ) => {
        await nRankRecordDataConnect().deleteOne(options?.headers, options?.params)
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

    const onReqSearchNRankRecordList = async (
        options = {headers: {}},
        callbackFn = {
            success: (results, response) => {},
        }
    ) => {
        await nRankRecordDataConnect().searchRecordList(options?.headers)
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

    const onReqChangeNRankRecordListStatusToFail = async (
        options = {headers: {}, body: {}},
        callbackFn = {
            success: (results, response) => {},
        }
    ) => {
        await nRankRecordDataConnect().changeListStatusToFail(options.headers, options.body)
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

    return {
        onReqSearchSubscriptionPlanSearchInfo,
        onReqCreateSearchInput,
        onReqDeleteNRankRecord,
        onReqSearchNRankRecordList,
        onReqChangeNRankRecordListStatusToFail
    }
}