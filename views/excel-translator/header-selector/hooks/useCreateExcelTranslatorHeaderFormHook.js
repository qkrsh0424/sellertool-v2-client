import { useState } from "react";

export default function useCreateExcelTranslatorHeaderFormHook(props) {
    const [createExcelTranslatorHeaderForm, setCreateExcelTranslatorHeaderForm] = useState({
        uploadHeaderTitle: '',
        downloadHeaderTitle: ''
    });

    const onChangeCreateExcelTranslatorHeaderFormValueOfName = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setCreateExcelTranslatorHeaderForm({
            ...createExcelTranslatorHeaderForm,
            [name]: value
        })
    }

    const checkHeaderNameFormatValid = (headerName, errorMessage) => {
        let spaceSearchRegex = /^(\s)|(\s)$/;

        if (headerName.search(spaceSearchRegex) !== -1) {
            throw new Error(errorMessage);
        }

        if (headerName.length < 2 || headerName.length > 50) {
            throw new Error(errorMessage);
        }
    }


    return {
        createExcelTranslatorHeaderForm,
        onChangeCreateExcelTranslatorHeaderFormValueOfName,
        checkHeaderNameFormatValid
    }
}