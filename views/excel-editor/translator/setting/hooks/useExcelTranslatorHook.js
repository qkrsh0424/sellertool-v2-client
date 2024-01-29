import { useState } from "react";

export function useExcelTranslatorHook(props) {
    const [excelTranslatorList, setExcelTranslatorList] = useState(null);
    const [selectedExcelTranslator, setSelectedExcelTranslator] = useState(null);

    const onSetExcelTranslatorList = (values) => {
        setExcelTranslatorList(values);
    }

    const onSetSelectedExcelTranslator = (value) => {
        setSelectedExcelTranslator(value)
    }

    return {
        excelTranslatorList,
        selectedExcelTranslator,
        onSetExcelTranslatorList,
        onSetSelectedExcelTranslator
    }
}