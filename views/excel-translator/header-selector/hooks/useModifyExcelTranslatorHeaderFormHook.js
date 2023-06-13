import _ from "lodash";
import { useEffect } from "react";
import { useState } from "react";

export default function useModifyExcelTranslatorHeaderFormHook({
    excelTranslatorHeader
}) {
    const [modifyExcelTranslatorHeaderForm, setModifyExcelTranslatorHeaderForm] = useState({
        uploadHeaderTitle: '',
        downloadHeaderTitle: ''
    });

    useEffect(() => {
        if (!excelTranslatorHeader) {
            return;
        }

        setModifyExcelTranslatorHeaderForm(_.cloneDeep({
            id: excelTranslatorHeader.id,
            uploadHeaderTitle: excelTranslatorHeader.uploadHeaderTitle,
            downloadHeaderTitle: excelTranslatorHeader.downloadHeaderTitle
        }))
    }, [excelTranslatorHeader]);

    const onChangeModifyExcelTranslatorHeaderFormValueOfName = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setModifyExcelTranslatorHeaderForm({
            ...modifyExcelTranslatorHeaderForm,
            [name]: value
        })
    }

    const checkHeaderNameFormatValid = (headerName, errorMessage) => {
        let spaceSearchRegex = /^(\s)|(\s)$/;

        if (headerName.search(spaceSearchRegex) !== -1) {
            throw new Error(errorMessage);
        }

        if (headerName.length < 2 || headerName.length > 15) {
            throw new Error(errorMessage);
        }
    }

    return {
        modifyExcelTranslatorHeaderForm,
        onChangeModifyExcelTranslatorHeaderFormValueOfName,
        checkHeaderNameFormatValid
    }
}