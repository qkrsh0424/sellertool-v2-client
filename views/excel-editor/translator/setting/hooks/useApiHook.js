import { ExcelTranslatorReferenceHeaderDataConnect } from "../../../../../data_connect/ExcelTranslatorReferenceHeaderDataConnect";
import { customToast, defaultOptions } from "../../../../../components/toast/custom-react-toastify/v1";
import { ExcelTranslatorDataConnect } from "../../../../../data_connect/ExcelTranslatorDataConnect";
import { CustomErrorHandler } from "../../../../../data_connect/CustomErrorHandler";

const excelTranslatorDataConnect = ExcelTranslatorDataConnect.baseExcelEditorPage();
const excelTranslatorReferenceHeaderDataConnect = ExcelTranslatorReferenceHeaderDataConnect.baseExcelEditorPage();

export function useApiHook(props) {
    /**
     * 
     * @param {*} param0
     * @param {*} callbackFn 
     * 
     * param0.headers is required
     * @example
     * reqFetchExcelTranslatorList({headers:{wsId:wsId}}, (results, response) => {...})
     */
    const reqFetchExcelTranslatorList = async ({ params, headers }, callbackFn = (results, response) => { }) => {
        await excelTranslatorDataConnect.searchList({ params, headers })
            .then(res => {
                if (res?.status === 200) {
                    callbackFn(res?.data?.data, res);
                }
            })
            .catch(err => {
                CustomErrorHandler.error(err);
            })
    }

    const reqCreateExcelTranslator = async ({ params = {}, body = {}, headers = {} }, callbackFn = (results, response) => { }) => {
        await excelTranslatorDataConnect.create({ params, body, headers })
            .then(res => {
                if (res?.status === 200) {
                    callbackFn(res?.data?.data, res);
                }
            })
            .catch(err => {
                CustomErrorHandler.error(err);
            })
    }

    const reqFetchExcelTranslatorReferenceHeaderList = async ({ params = {}, headers = {} }, callbackFn = (results, response) => { }) => {
        await excelTranslatorReferenceHeaderDataConnect.searchList({ params, headers })
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
            })
    }

    const reqUploadSettingExcel = async ({ params, body, headers }, callbackFn = (results, response) => { }) => {
        await excelTranslatorDataConnect.uploadSettingExcel({ params, body, headers })
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
            })
    }

    const reqUpdateExcelTranslator = async ({ params, body, headers }, callbackFn = (results, response) => { }) => {
        await excelTranslatorDataConnect.update({ params, body, headers })
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
            })
    }

    const reqDeleteExcelTranslator = async ({ params, body, headers }, callbackFn = (results, response) => { }) => {
        await excelTranslatorDataConnect.delete({ params, body, headers })
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
            })
    }

    return {
        reqFetchExcelTranslatorList,
        reqCreateExcelTranslator,
        reqFetchExcelTranslatorReferenceHeaderList,
        reqUploadSettingExcel,
        reqUpdateExcelTranslator,
        reqDeleteExcelTranslator
    }
}