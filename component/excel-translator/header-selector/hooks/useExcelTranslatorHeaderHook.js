import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useExcelTranslatorHeaderHook({
    excelTranslatorHeaders
}) {
    const router = useRouter();
    const [excelTranslatorHeader, setExcelTranslatorHeader] = useState(null);

    useEffect(() => {
        if (!excelTranslatorHeaders || !router?.query?.excelTranslatorHeaderId) {
            onClearExcelTranslatorHeader();
            return;
        }

        onInitExcelTranslatorHeader();
    }, [excelTranslatorHeaders, router?.query?.excelTranslatorHeaderId]);

    const onClearExcelTranslatorHeader = () => {
        setExcelTranslatorHeader(null);
    }

    const onInitExcelTranslatorHeader = () => {
        let excelTranslatorHeaderId = router?.query?.excelTranslatorHeaderId;

        let data = excelTranslatorHeaders?.find(r => r.id === excelTranslatorHeaderId);

        if (data) {
            setExcelTranslatorHeader(_.cloneDeep(data));
        }
    }

    return {
        excelTranslatorHeader
    }
}