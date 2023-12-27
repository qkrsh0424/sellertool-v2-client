import { useState } from "react";

export function useExcelTranslatorHook(props) {
    const [excelTranslatorList, setExcelTranslatorList] = useState(null);
    const [selectedExcelTranslator, setSelectedExcelTranslator] = useState(null);
    const [uploadHeaderList, setUploadHeaderList] = useState(null);
    const [uploadRowDataList, setUploadRowDataList] = useState(null);
    const [downloadHeaderList, setDownloadHeaderList] = useState(null);
    const [downloadRowDataList, setDownloadRowDataList] = useState(null);

    const onSetExcelTranslatorList = (valueList) => {
        setExcelTranslatorList(valueList);
    }

    const onSetSelectedExcelTranslator = (value) => {
        setSelectedExcelTranslator(value);
        onSetUploadHeaderList(null);
        onSetUploadRowDataList(null);
        onSetDownloadHeaderList(null);
        onSetDownloadRowDataList(null);
    }

    const onSetUploadHeaderList = (valueList) => {
        setUploadHeaderList(valueList);
    }

    const onSetUploadRowDataList = (valueList) => {
        setUploadRowDataList(valueList);
    }

    const onSetDownloadHeaderList = (valueList) => {
        setDownloadHeaderList(valueList);
    }

    const onSetDownloadRowDataList = (valueList) => {
        setDownloadRowDataList(valueList);
    }

    return {
        excelTranslatorList,
        selectedExcelTranslator,
        uploadHeaderList,
        uploadRowDataList,
        downloadHeaderList,
        downloadRowDataList,
        onSetExcelTranslatorList,
        onSetSelectedExcelTranslator,
        onSetUploadHeaderList,
        onSetUploadRowDataList,
        onSetDownloadHeaderList,
        onSetDownloadRowDataList,
    }
}