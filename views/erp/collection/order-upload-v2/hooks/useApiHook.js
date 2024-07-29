import { CustomErrorHandler } from "../../../../../data_connect/CustomErrorHandler";
import { ExcelTranslatorDataConnect } from "../../../../../data_connect/ExcelTranslatorDataConnect";
import { apiServerTemporaryErpItem } from "../../../../../data_connect/api_server/apiServerTemporaryErpItem";
import { workspaceApiDataConnect } from "../../../../../data_connect/workspaceApiDataConnect";

const excelTranslatorDataConnect = ExcelTranslatorDataConnect.baseErpcPage();

export function useApiHook(props) {
    const reqFetchExcelTranslatorList = async ({ params, headers }, callbackFn = (results, response) => { }) => {
        return await excelTranslatorDataConnect.searchList({ params, headers })
            .then(res => {
                if (res?.status === 200) {
                    callbackFn(res?.data?.data, res);
                    return {
                        results: res?.data?.data,
                        response: res
                    }
                }
            })
            .catch(err => {
                CustomErrorHandler.error(err);
                return {
                    results: null,
                    response: res
                }
            })
    }

    const reqFetchWorkspaceApi = async ({ params, headers }) => {
        return await workspaceApiDataConnect().searchDetailForAny({ params, headers })
            .then(res => {
                if (res?.status === 200) {
                    return {
                        content: res?.data?.data,
                        res: res
                    }
                }
            })
            .catch(err => {
                CustomErrorHandler.error(err);
                return {
                    content: null,
                    res: err.response
                }
            })
    }

    const reqFetchTemporaryErpItemList = async ({ params, headers }) => {
        return await apiServerTemporaryErpItem().searchList({ headers })
            .then(res => {
                if (res?.status === 200) {
                    return {
                        res: res,
                        content: res.data?.content
                    }
                }
            })
            .catch(err => {
                return {
                    content: null,
                    res: err.response
                }
            })
    }

    const reqDeleteTemporaryErpItemList = async ({ params, headers }) => {
        return await apiServerTemporaryErpItem().deleteList({ headers })
            .then(res => {
                if (res?.status === 200) {
                    return {
                        res: res,
                        content: res.data?.content
                    }
                }
            })
            .catch(err => {
                return {
                    content: null,
                    res: err.response
                }
            })
    }

    return {
        reqFetchExcelTranslatorList: reqFetchExcelTranslatorList,
        reqFetchWorkspaceApi: reqFetchWorkspaceApi,
        reqFetchTemporaryErpItemList: reqFetchTemporaryErpItemList,
        reqDeleteTemporaryErpItemList: reqDeleteTemporaryErpItemList
    }
}