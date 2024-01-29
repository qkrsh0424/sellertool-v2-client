import { ExcelTranslatorDataConnect } from "../../../../../data_connect/ExcelTranslatorDataConnect"
import { CustomErrorHandler } from "../../../../../data_connect/CustomErrorHandler";
import { CustomDateUtils } from "../../../../../utils/CustomDateUtils";

const excelTranslatorDataConnect = ExcelTranslatorDataConnect.baseExcelEditorPage();
const customDateUtils = CustomDateUtils();

export function useApiHook(props) {

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

    const reqUploadSourceExcel = async ({ params, body, headers }, callbackFn = (results, response) => { }) => {
        await excelTranslatorDataConnect.uploadSourceExcel({ params, body, headers })
            .then(res => {
                if (res?.status === 200) {
                    callbackFn(res?.data?.data, res);
                }
            })
            .catch(err => {
                CustomErrorHandler.error(err);
            })
    }

    const reqDownloadResultExcel = async ({ params, body, headers }, callbackFn = (results, response) => { }) => {
        await excelTranslatorDataConnect.downloadResultExcel({ params, body, headers })
            .then(res => {
                if (res.status === 200) {
                    const blob = new Blob([res.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                    const link = document.createElement('a');
                    const blobUrl = URL.createObjectURL(blob);
                    let date = customDateUtils.dateToYYYYMMDDhhmmssFile(new Date());
                    link.href = blobUrl;
                    link.download = `${date}_${body?.excelTranslatorName}.xlsx`;
                    link.click();
                    URL.revokeObjectURL(blobUrl);

                    callbackFn("success");
                }
            })
            .catch(err => {
                CustomErrorHandler.error(err);
            })
    }

    return {
        reqFetchExcelTranslatorList,
        reqUploadSourceExcel,
        reqDownloadResultExcel
    }
}