import { customToast, defaultOptions } from "../../../../../../../../../components/toast/custom-react-toastify/v1";
import { nRankRecordDetailDataConnect } from "../../../../../../../../../data_connect/nRankRecordDetailDataConnect";
import { nRankRecordDataConnect } from "../../../../../../../../../data_connect/nRankRecordDataConnect";
import { nRankRecordInfoDataConnect } from "../../../../../../../../../data_connect/nRankRecordInfoDataConnect";

export function useApiHook() {

    const onReqSearchNRankRecordInfos = async (
        options = {headers: {}, params: {}},
        callbackFn = {
            success: (results, response) => {},
        }
    ) => {
        await nRankRecordInfoDataConnect().searchLimitListByRecordId(options.headers, options.params)
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

    const onReqSearchNRankRecordDetailsByInfo = async (
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

    const onReqSearchNRankRecordDetailsByInfos = async (
        options = {headers: {}, body: {}},
        callbackFn = {
            success: (results, response) => {},
        }
    ) => {
        await nRankRecordDetailDataConnect().searchListByInfoIds(options.headers, options.body)
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

    const onReqChangeNRankRecordStatusToPendingAndCreateNRankRecordInfo = async (
        options = {headers: {}, body: {}},
        callbackFn = {
            success: (results, response) => {},
        }
    ) => {
        await nRankRecordDataConnect().changeStatusToPendingAndCreateRecordInfo(options.headers, options.body)
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

    return {
        onReqChangeNRankRecordStatusToPendingAndCreateNRankRecordInfo,
        onReqCreateNRankRecordDetails,
        onReqSearchNRankRecordDetailsByInfo,
        onReqSearchNRankRecordDetailsByInfos,
        onReqSearchNRankRecordInfos
    }
}