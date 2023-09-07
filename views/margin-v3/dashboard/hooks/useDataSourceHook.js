import { CustomErrorHandler } from "../../../../data_connect/CustomErrorHandler";
import { MrBaseExchangeRateDataConnect } from "../../../../data_connect/MrBaseExchangeRateDataConnect";

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
                CustomErrorHandler.error(err);
            });
    }

    return {
        onReqFetchMrBaseExchangeRateList
    }
}