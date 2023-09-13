import { customToast, defaultOptions } from "../../../../../../../../../components/toast/custom-react-toastify/v1";
import { nRankRecordCategoryDataConnect } from "../../../../../../../../../data_connect/nRankRecordCategoryDataConnect"

export function useApiHook() {
    const onReqCreateNRankRecordCategory = async (
        options = {headers: {}, params: {}, body: {}},
        callbackFn = {
            success: (results, response) => {}
        }
    ) => {
        await nRankRecordCategoryDataConnect().createOne(options.headers, options.body)
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
                })
            })
    }

    const onReqSearchNRankRecordCategory = async (
        options = {headers: {}},
        callbackFn = {
            success: (results, response) => {}
        }
    ) => {
        await nRankRecordCategoryDataConnect().searchList(options.headers)
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
                })
            })
    }

    const onReqUpdateNRankRecordCategory = async (
        options = {headers: {}, body: {}},
        callbackFn = {
            success: (results, response) => {}
        }
    ) => {
        await nRankRecordCategoryDataConnect().updateOne(options.headers, options.body)
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
                })
            })
    }

    const onReqDeleteNRankRecordCategory = async (
        options = {headers: {}, params: {}},
        callbackFn = {
            success: (results, response) => {}
        }
    ) => {
        await nRankRecordCategoryDataConnect().deleteOne(options.headers, options.params)
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
                })
            })
    }

    return {
        onReqCreateNRankRecordCategory,
        onReqSearchNRankRecordCategory,
        onReqUpdateNRankRecordCategory,
        onReqDeleteNRankRecordCategory
    }
}