import _ from "lodash";
import { useEffect, useState } from "react";
import valueUtils from "../../../../utils/valueUtils";

export default function useModifyViewExcelTranslatorHeaderIdsFormHook({
    excelTranslatorHeaders,
    viewExcelTranslatorHeaderIds
}) {
    const [modifyViewExcelTranslatorHeaderIdsForm, setModifyViewExcelTranslatorHeaderIdsForm] = useState([]);

    useEffect(() => {
        if (!excelTranslatorHeaders || !viewExcelTranslatorHeaderIds) {
            return;
        }

        onInit();
    }, [excelTranslatorHeaders, viewExcelTranslatorHeaderIds])

    const onInit = () => {
        let data = [];

        viewExcelTranslatorHeaderIds?.forEach(r => {
            let id = excelTranslatorHeaders?.filter(r2 => r2.id === r)[0]?.id;
            if (id) {
                data.push(id);
            }
        });

        setModifyViewExcelTranslatorHeaderIdsForm(_.cloneDeep(data));
    }

    const onActionExchangeHeaderId = (id) => {
        if (!id) {
            alert('항목을 먼저 선택해 주세요.');
            return;
        }

        if (modifyViewExcelTranslatorHeaderIdsForm.includes(id)) {

            setModifyViewExcelTranslatorHeaderIdsForm([
                ...modifyViewExcelTranslatorHeaderIdsForm.filter(r => r !== id)
            ])
        } else {
            let data = [...modifyViewExcelTranslatorHeaderIdsForm];
            data.push(id);
            setModifyViewExcelTranslatorHeaderIdsForm(data);
        }
    }

    const onActionMoveDownHeaderId = (id) => {
        if (!id) {
            alert('항목을 먼저 선택해 주세요.');
            return;
        }

        if (!modifyViewExcelTranslatorHeaderIdsForm.includes(id)) {
            return;
        }

        let arrays = [...modifyViewExcelTranslatorHeaderIdsForm];
        let index = arrays.indexOf(id);
        let reordered = valueUtils.reorder(arrays, index, index + 1);

        setModifyViewExcelTranslatorHeaderIdsForm([...reordered]);

    }

    const onActionMoveUpHeaderId = (id) => {
        if (!id) {
            alert('항목을 먼저 선택해 주세요.');
            return;
        }

        if (!modifyViewExcelTranslatorHeaderIdsForm.includes(id)) {
            return;
        }

        let arrays = [...modifyViewExcelTranslatorHeaderIdsForm];
        let index = arrays.indexOf(id);
        let reordered = valueUtils.reorder(arrays, index, index - 1);

        setModifyViewExcelTranslatorHeaderIdsForm([...reordered]);

    }

    return {
        modifyViewExcelTranslatorHeaderIdsForm,
        onActionExchangeHeaderId,
        onActionMoveDownHeaderId,
        onActionMoveUpHeaderId
    }
}