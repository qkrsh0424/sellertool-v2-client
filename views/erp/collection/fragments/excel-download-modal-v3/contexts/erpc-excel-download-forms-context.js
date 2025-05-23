import { createContext, useContext, useMemo, useState } from "react";

const ErpcExcelDownloadFormsValueContext = createContext();
const ErpcExcelDownloadFormsActionsContext = createContext();

export function ErpcExcelDownloadFormsContextProvider({ children }) {
    const [erpcExcelDownloadForms, setErpcExcelDownloadForms] = useState(null);

    const erpcExcelDownloadFormsActions = useMemo(
        () => {
            return {
                setValue: setErpcExcelDownloadForms,
                onSet: (array) => {
                    setErpcExcelDownloadForms(array);
                }
            }
        },
        []
    )

    return (
        <>
            <ErpcExcelDownloadFormsActionsContext.Provider value={{ erpcExcelDownloadFormsActions }}>
                <ErpcExcelDownloadFormsValueContext.Provider value={{ erpcExcelDownloadForms }}>
                    {children}
                </ErpcExcelDownloadFormsValueContext.Provider>
            </ErpcExcelDownloadFormsActionsContext.Provider >
        </>
    );
}

export function useErpcExcelDownloadFormsValueContextHook(props) {
    const value = useContext(ErpcExcelDownloadFormsValueContext);

    if (value === undefined) {
        throw new Error('useErpcExcelDownloadFormsValueContextHook should be used within ErpcExcelDownloadFormsContextProvider');
    }

    return {
        erpcExcelDownloadForms: value.erpcExcelDownloadForms
    };
}

export function useErpcExcelDownloadFormsActionsContextHook(props) {
    const value = useContext(ErpcExcelDownloadFormsActionsContext);

    if (value === undefined) {
        throw new Error('useErpcExcelDownloadFormsActionsContextHook should be used within ErpcExcelDownloadFormsContextProvider');
    }

    return {
        erpcExcelDownloadForms: {
            setValue: value.erpcExcelDownloadFormsActions.setValue,
            onSet: value.erpcExcelDownloadFormsActions.onSet
        }
    };
}