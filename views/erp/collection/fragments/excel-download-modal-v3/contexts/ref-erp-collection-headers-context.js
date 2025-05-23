import { createContext, useContext, useMemo, useState } from "react";

const RefErpCollectionHeadersValueContext = createContext();
const RefErpCollectionHeadersActionsContext = createContext();

export function RefErpCollectionHeadersContextProvider({ children }) {
    const [refErpCollectionHeaders, setRefErpCollectionHeaders] = useState(null);

    const refErpCollectionHeadersActions = useMemo(
        () => {
            return {
                setValue: setRefErpCollectionHeaders,
                onSet: (array) => {
                    setRefErpCollectionHeaders(array);
                }
            }
        },
        []
    )

    return (
        <>
            <RefErpCollectionHeadersActionsContext.Provider value={{ refErpCollectionHeadersActions }}>
                <RefErpCollectionHeadersValueContext.Provider value={{ refErpCollectionHeaders }}>
                    {children}
                </RefErpCollectionHeadersValueContext.Provider>
            </RefErpCollectionHeadersActionsContext.Provider >
        </>
    );
}

export function useRefErpCollectionHeadersValueContextHook(props) {
    const value = useContext(RefErpCollectionHeadersValueContext);

    if (value === undefined) {
        throw new Error('useRefErpCollectionHeadersValueContextHook should be used within RefErpCollectionHeadersContextProvider');
    }

    return {
        refErpCollectionHeaders: value.refErpCollectionHeaders
    };
}

export function useRefErpCollectionHeadersActionsContextHook(props) {
    const value = useContext(RefErpCollectionHeadersActionsContext);

    if (value === undefined) {
        throw new Error('useRefErpCollectionHeadersActionsContextHook should be used within RefErpCollectionHeadersContextProvider');
    }

    return {
        refErpCollectionHeaders: {
            setValue: value.refErpCollectionHeadersActions.setValue,
            onSet: value.refErpCollectionHeadersActions.onSet
        }
    };
}