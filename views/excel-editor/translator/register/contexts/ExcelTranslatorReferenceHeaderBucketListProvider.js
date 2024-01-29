import { createContext, useContext, useMemo, useState } from "react";

const ExcelTranslatorReferenceHeaderBucketListValueContext = createContext();
const ExcelTranslatorReferenceHeaderBucketListActionsContext = createContext();

export function ExcelTranslatorReferenceHeaderBucketListProvider({ children }) {
    const [excelTranslatorReferenceHeaderBucketList, setExcelTranslatorReferenceHeaderBucketList] = useState(null);

    const actions = useMemo(
        () => {
            return {
                onSet(value) {
                    setExcelTranslatorReferenceHeaderBucketList(value);
                }
            }
        },
        []
    )
    return (
        <>
            <ExcelTranslatorReferenceHeaderBucketListActionsContext.Provider value={actions}>
                <ExcelTranslatorReferenceHeaderBucketListValueContext.Provider value={excelTranslatorReferenceHeaderBucketList}>
                    {children}
                </ExcelTranslatorReferenceHeaderBucketListValueContext.Provider>
            </ExcelTranslatorReferenceHeaderBucketListActionsContext.Provider>
        </>
    );
}

export function useExcelTranslatorReferenceHeaderBucketListValueHook(props) {
    const value = useContext(ExcelTranslatorReferenceHeaderBucketListValueContext);

    if (value === undefined) {
        throw new Error('useExcelTranslatorReferenceHeaderBucketListValueHook should be used within ExcelTranslatorReferenceHeaderBucketListValueContext');
    }

    return value;
}

export function useExcelTranslatorReferenceHeaderBucketListActionsHook(props) {
    const value = useContext(ExcelTranslatorReferenceHeaderBucketListActionsContext);

    if (value === undefined) {
        throw new Error('useExcelTranslatorReferenceHeaderBucketListActionsHook should be used within ExcelTranslatorReferenceHeaderBucketListActionsContext');
    }

    return value;
}