import { createContext, useContext, useMemo, useState } from "react";

const ExcelTranslatorReferenceHeaderListValueContext = createContext();
const ExcelTranslatorReferenceHeaderListActionsContext = createContext();

export function ExcelTranslatorReferenceHeaderListProvider({ children }) {
    const [excelTranslatorReferenceHeaderList, setExcelTranslatorReferenceHeaderList] = useState(null);

    const actions = useMemo(
        () => {
            return {
                onSet(value) {
                    setExcelTranslatorReferenceHeaderList(value);
                }
            }
        },
        []
    )
    return (
        <>
            <ExcelTranslatorReferenceHeaderListActionsContext.Provider value={actions}>
                <ExcelTranslatorReferenceHeaderListValueContext.Provider value={excelTranslatorReferenceHeaderList}>
                    {children}
                </ExcelTranslatorReferenceHeaderListValueContext.Provider>
            </ExcelTranslatorReferenceHeaderListActionsContext.Provider>
        </>
    );
}

export function useExcelTranslatorReferenceHeaderListValueHook(props) {
    const value = useContext(ExcelTranslatorReferenceHeaderListValueContext);

    if (value === undefined) {
        throw new Error('useExcelTranslatorReferenceHeaderListValueHook should be used within ExcelTranslatorReferenceHeaderListValueContext');
    }

    return value;
}

export function useExcelTranslatorReferenceHeaderListActionsHook(props) {
    const value = useContext(ExcelTranslatorReferenceHeaderListActionsContext);

    if (value === undefined) {
        throw new Error('useExcelTranslatorReferenceHeaderListActionsHook should be used within ExcelTranslatorReferenceHeaderListActionsContext');
    }

    return value;
}