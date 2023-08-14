import { MrPurchaseModuleDataConnect } from "../../../../data_connect/MrPurchaseModuleDataConnect";
import { MrBaseExchangeRateDataConnect } from "../../../../data_connect/MrBaseExchangeRateDataConnect";
import { EventUtils } from "../../../../utils/EventUtils";
import { customToast, defaultOptions } from "../../../toast/custom-react-toastify/v1";

const MODULE_LIST = [
    {
        cid: null,
        id: 1,
        name: 'abcd'
    },
    {
        cid: null,
        id: 2,
        name: 'bcde'
    },
]

const mrPurchaseModuleDataConnect = MrPurchaseModuleDataConnect.baseMarginRecord();
const mrBaseExchangeRateDataConnect = MrBaseExchangeRateDataConnect.baseMarginRecord();

export function useDataSourceHook(props) {

    const onReqFetchMrPurchaseModuleList = async (options = { headers, params }, callbackFn = (results, response) => { }) => {
        await mrPurchaseModuleDataConnect.searchList({
            headers: options?.headers,
            params: options?.params
        })
            .then(res => {
                if (res?.status === 200) {
                    callbackFn(res?.data?.data, res);
                }
            })
            .catch(err => {
                const res = err.response;
                console.log(res);
                customToast.error(res?.data?.memo, {
                    ...defaultOptions,
                    toastId: res?.data?.memo
                });
            });
    }

    const onReqFetchMrBaseExchangeRateList = async (options = { headers, params }, callbackFn = (results, response) => { }) => {
        const { headers, params } = options;

        await mrBaseExchangeRateDataConnect.searchList({
            headers,
            params
        })
            .then(res => {
                if (res?.status === 200) {
                    callbackFn(res?.data?.data, res);
                }
            })
            .catch(err => {
                const res = err.response;
                console.log(res);
                customToast.error(res?.data?.memo, {
                    ...defaultOptions,
                    toastId: res?.data?.memo
                });
            });
    }

    const onReqCreateMrPurchaseModule = async (options = { headers, body }, callbackFn = (results, respones) => { }) => {
        await mrPurchaseModuleDataConnect.createOne({
            headers: options?.headers,
            body: options?.body
        })
            .then(res => {
                if (res?.status === 200) {
                    callbackFn(res?.data?.data, res);
                }
            })
            .catch(err => {
                const res = err.response;
                console.log(res);
                customToast.error(res?.data?.memo, {
                    ...defaultOptions,
                    toastId: res?.data?.memo
                });
            });

    }

    const onReqChangeMrPurchaseModuleName = async (options = { headers, body }, callbackFn = (results, response) => { }) => {
        await mrPurchaseModuleDataConnect.changeName({
            headers: options?.headers,
            body: options?.body
        })
            .then(res => {
                if (res?.status === 200) {
                    callbackFn(res?.data?.data, res);
                }
            })
            .catch(err => {
                const res = err.response;
                console.log(res);
                customToast.error(res?.data?.memo, {
                    ...defaultOptions,
                    toastId: res?.data?.memo
                });
            });
    }

    const onReqDeleteMrPurchaseModuleOne = async (options = { headers, body }, callbackFn = (results, response) => { }) => {
        const { headers, body } = options;

        await mrPurchaseModuleDataConnect.deleteOne({ headers, body })
            .then(res => {
                if (res?.status === 200) {
                    callbackFn(res?.data?.data, res);
                }
            })
            .catch(err => {
                const res = err.response;
                console.log(res);
                customToast.error(res?.data?.memo, {
                    ...defaultOptions,
                    toastId: res?.data?.memo
                });
            });
    }

    return {
        onReqFetchMrPurchaseModuleList,
        onReqFetchMrBaseExchangeRateList,
        onReqCreateMrPurchaseModule,
        onReqChangeMrPurchaseModuleName,
        onReqDeleteMrPurchaseModuleOne
    }
}