import { ExcelTranslatorCdnConnect } from "../../../../../data_connect/cdn/json/excel-editor/ExcelTranslatorCdnConnect";

const excelTranslatorCdnConnect = ExcelTranslatorCdnConnect();

export function useCdnHook(props) {
    const getExcelTranslatorSampleListJson = async () => {
        return await excelTranslatorCdnConnect.getExcelTranslatorSampleListJson();
    }

    const getExcelTranslatorReferenceHeaderBucketListJson = async () => {
        return await excelTranslatorCdnConnect.getExcelTranslatorReferenceHeaderBucketListJson();
    }

    return {
        getExcelTranslatorSampleListJson,
        getExcelTranslatorReferenceHeaderBucketListJson
    }
}