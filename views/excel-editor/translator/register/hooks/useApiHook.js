import { ExcelTranslatorReferenceHeaderDataConnect } from "../../../../../data_connect/ExcelTranslatorReferenceHeaderDataConnect";
import { customToast, defaultOptions } from "../../../../../components/toast/custom-react-toastify/v1";

const excelTranslatorReferenceHeaderDataConnect = ExcelTranslatorReferenceHeaderDataConnect.baseExcelEditorPage();

export function useApiHook(props) {
    const reqFetchExcelTranslatorReferenceHeaderList = async ({ params = {}, headers = {} }, callbackFn = (results, response) => { }) => {
        await excelTranslatorReferenceHeaderDataConnect.searchList({ params, headers })
            .then(res => {
                callbackFn(res?.data?.data, res);
            })
            .catch(err => {
                const res = err.response;
                console.log(res);
                customToast.error(res?.data?.memo, {
                    ...defaultOptions,
                    toastId: res?.data?.memo
                });
            })
    }

    return {
        reqFetchExcelTranslatorReferenceHeaderList
    }
}