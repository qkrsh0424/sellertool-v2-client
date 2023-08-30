import { CustomErrorHandler } from "../../../../data_connect/CustomErrorHandler";
import { MrBaseExchangeRateDataConnect } from "../../../../data_connect/MrBaseExchangeRateDataConnect";
import { MrPurchaseModuleDataConnect } from "../../../../data_connect/MrPurchaseModuleDataConnect";
import { MarginRecordDataConnect } from "../../../../data_connect/marginRecordDataConnect"

const marginRecordDataConnect = MarginRecordDataConnect();
const mrBaseExchangeRateDataConnect = MrBaseExchangeRateDataConnect.baseMarginRecord();
const mrPurchaseModuleDataConnect = MrPurchaseModuleDataConnect.baseMarginRecord();

export function useDataSourceHook(props) {
    /**
     * sort = ['createdAt_asc', 'createdAt_desc', 'name_asc', 'name_desc', 'tag_asc', 'tag_desc']
     * 
     * @param {*} options 
     * @param options.headers [wsId]
     * @param options.params [sort]
     * @param {*} callbackFn 
     */
    const onReqFetchMarginRecordList = async (options = {
        headers: { wsId },
        params: { sort: 'createdAt_asc' },
    }, callbackFn = (results, response) => { }) => {
        const { headers, params } = options;

        await marginRecordDataConnect.searchList({ params, headers })
            .then(res => {
                if (res.status === 200) {
                    callbackFn(res?.data?.data, res);
                }
            })
            .catch(err => {
                CustomErrorHandler.error(err);
            })
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
                CustomErrorHandler.error(err);
            });
    }

    const onReqFetchMrPurchaseModuleList = async (options = { headers, params }, callbackFn = (results, response) => { }) => {
        const { headers, params } = options;

        await mrPurchaseModuleDataConnect.searchList({
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

    const onReqFetchMrPurchaseModuleOne = async (options = { headers, params, pathVariables }, callbackFn = (results, response) => { }) => {
        const { headers, params, pathVariables } = options;

        await mrPurchaseModuleDataConnect.searchOne({
            headers,
            params,
            pathVariables
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

    const onReqCreateMarginRecord = async (options = {
        headers: { wsId },
        body: {},
    }, callbackFn = (results, response) => { }) => {
        const { headers, body } = options;

        await marginRecordDataConnect.createOne({ body, headers })
            .then(res => {
                if (res.status === 200) {
                    callbackFn(res?.data?.data, res);
                }
            })
            .catch(err => {
                CustomErrorHandler.error(err);
            })
    }

    const onReqUpdateMarginRecord = async (options = {
        headers: { wsId },
        body: {},
    }, callbackFn = (results, response) => { }) => {
        const { headers, body } = options;

        await marginRecordDataConnect.updateOneV3({ body, headers })
            .then(res => {
                if (res.status === 200) {
                    callbackFn(res?.data?.data, res);
                }
            })
            .catch(err => {
                CustomErrorHandler.error(err);
            })
    }

    return {
        onReqFetchMarginRecordList,
        onReqFetchMrBaseExchangeRateList,
        onReqFetchMrPurchaseModuleList,
        onReqFetchMrPurchaseModuleOne,
        onReqCreateMarginRecord,
        onReqUpdateMarginRecord,
    }
}