import { customToast, defaultOptions } from "../../../../../../../../../components/toast/custom-react-toastify/v1";
import { nRankRecordDetailDataConnect } from "../../../../../../../../../data_connect/nRankRecordDetailDataConnect";
import { nRankRecordDataConnect } from "../../../../../../../../../data_connect/nRankRecordDataConnect";
import { nRankRecordInfoDataConnect } from "../../../../../../../../../data_connect/nRankRecordInfoDataConnect";

export function useApiHook() {
    const onReqCreateNRankRecordDetails = async (
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

    const onReqSearchNRankRecordDetails = async (
        options = {headers: {}, params: {}},
        callbackFn = {
            success: (results, response) => {},
        }
    ) => {
        await nRankRecordDetailDataConnect().searchListByInfoId(options.headers, options.params)
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

    const onReqSearchNRankRecordInfos = async (
        options = {headers: {}, params: {}},
        callbackFn = {
            success: (results, response) => {},
        }
    ) => {
        // await nRankRecordInfoDataConnect().searchListByRecordId(options.headers, options.params)
        //     .then(res => {
        //         if (res.status === 200) {
        //             callbackFn.success(res?.data?.data);
        //         }
        //     })
        //     .catch(err => {
        //         const res = err.response;
        //         customToast.error(res?.data?.memo, {
        //             ...defaultOptions,
        //             toastId: res?.data?.memo
        //         })
        //     })
    }

    return {
        onReqChangeNRankRecordStatusToPending,
        onReqCreateNRankRecordDetails,
        onReqSearchNRankRecordDetails,
        onReqSearchNRankRecordInfos
    }
}