import _ from "lodash";
import { useEffect, useState } from "react";
import { useLocalStorageHook } from "../../../../hooks/local_storage/useLocalStorageHook";

export default function useViewExcelTranslatorHeaderIdsHook() {
    const [viewExcelTranslatorHeaderIds, setViewExcelTranslatorHeaderIds] = useLocalStorageHook('view-excel-translator-header-ids-v1', []);

    const onSetViewExcelTranslatorHeaderIds = ({
        body,
        successCallback
    }) => {
        setViewExcelTranslatorHeaderIds(body);
        successCallback();
    }

    return {
        viewExcelTranslatorHeaderIds,
        onSetViewExcelTranslatorHeaderIds
    }
}