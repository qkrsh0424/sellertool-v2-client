import _ from "lodash";
import { useSellertoolDatas } from "../../../hooks/sellertool-datas";

export default function useViewExcelTranslatorHeaderIdsHook() {
    const sellertoolDatas = useSellertoolDatas();
    const onSetViewExcelTranslatorHeaderIds = ({
        body,
        successCallback
    }) => {
        sellertoolDatas._onSetExcelTranslatorHeaderIds(body);
        successCallback();
    }

    return {
        viewExcelTranslatorHeaderIds: sellertoolDatas?.excelTranslatorHeaderIds,
        onSetViewExcelTranslatorHeaderIds
    }
}