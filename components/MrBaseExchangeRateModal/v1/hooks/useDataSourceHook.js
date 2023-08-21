import { MrPurchaseModuleDataConnect } from "../../../../data_connect/MrPurchaseModuleDataConnect";
import { MrBaseExchangeRateDataConnect } from "../../../../data_connect/MrBaseExchangeRateDataConnect";
import { customToast, defaultOptions } from "../../../toast/custom-react-toastify/v1";

const mrBaseExchangeRateDataConnect = MrBaseExchangeRateDataConnect.baseMarginRecord();

export function useDataSourceHook(props) {
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

    const onReqCreateMrBaseExchangeRate = async (options = { headers, params, body }, callbackFn = (results, response) => { }) => {
        const { headers, body } = options;

        await mrBaseExchangeRateDataConnect.createOne({
            headers,
            body
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
    return {
        onReqFetchMrBaseExchangeRateList,
        onReqCreateMrBaseExchangeRate
    }
}