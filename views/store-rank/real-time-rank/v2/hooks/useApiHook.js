import { customToast, defaultOptions } from "../../../../../components/toast/custom-react-toastify/v1";
import { nRankRecordDataConnect } from "../../../../../data_connect/nRankRecordDataConnect";

export function useApiHook() {
    const onReqCreateSearchInput = async (
        options = {body: {}, headers: {}},
        callbackFn = {
            success: (results, response) => {},
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
        options = {params: {}, headers: {}},
        callbackFn = {
            success: (results, response) => {},
        }
    ) => {
        await nRankRecordDataConnect().deleteOne(options?.params, options?.headers)
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

    // const onReqSearchNRankRecordByIds = async (
    //     options = {body: {}, headers: {}},
    //     callbackFn = {
    //         success: (results, response) => {},
    //     }
    // ) => {
    //     await nRankRecordDataConnect().searchListByIds(options.body, options.headers)
    //         .then(res => {
    //             if (res.status === 200) {
    //                 callbackFn.success(res?.data?.data, res);
    //             }
    //         })
    //         .catch(err => {
    //             const res = err.response;
    //             customToast.error(res?.data?.memo, {
    //                 ...defaultOptions,
    //                 toastId: res?.data?.memo
    //             })
    //         })
    // }

    return {
        onReqCreateSearchInput,
        onReqDeleteNRankRecord,
        onReqSearchNRankRecordList
        // onReqSearchNRankRecordByIds
    }
}