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
     * @param headers [wsId]
     * @param params [sort, searchQuery]
     * @param {*} callbackFn 
     */
    const onReqFetchMarginRecordList = async ({
        headers = { wsId: null },
        params = { sort: 'createdAt_asc', searchQuery: null }
    }, callbackFn = (results, response) => { }
    ) => {
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

    const onReqFetchMrBaseExchangeRateList = async ({ headers = { wsId: null }, params = {} }, callbackFn = (results, response) => { }) => {


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

    const onReqFetchMrPurchaseModuleList = async ({ headers = { wsId: null }, params = {} }, callbackFn = (results, response) => { }) => {


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

    const onReqFetchMrPurchaseModuleOne = async ({ headers = { wsId: null }, params = {}, pathVariables = {} }, callbackFn = (results, response) => { }) => {


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

    const onReqCreateMarginRecord = async ({
        headers = { wsId: null },
        body = {},
    }, callbackFn = (results, response) => { }) => {


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

    const onReqUpdateMarginRecord = async ({
        headers = { wsId: null },
        body = {},
    }, callbackFn = (results, response) => { }) => {


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

    const onReqDeleteMarginRecord = async ({
        headers = { wsId: null },
        body = {},
    }, callbackFn = (results, response) => { }) => {


        await marginRecordDataConnect.deleteOne({ body, headers })
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
        onReqDeleteMarginRecord,
    }
}