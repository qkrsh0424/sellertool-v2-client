import { CustomErrorHandler } from "../../../../../data_connect/CustomErrorHandler";
import { ExcelTranslatorDataConnect } from "../../../../../data_connect/ExcelTranslatorDataConnect";

const excelTranslatorDataConnect = ExcelTranslatorDataConnect.baseErpcPage();

export function useApiHook(props) {
    const reqFetchExcelTranslatorList = ({ params, headers }, callbackFn = (results, response) => { }) => {
        return excelTranslatorDataConnect.searchList({ params, headers })
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

    return {
        reqFetchExcelTranslatorList: reqFetchExcelTranslatorList
    }
}