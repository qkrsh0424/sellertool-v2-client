import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ErpCollectionHeaderValueContext = createContext();
const ErpCollectionHeaderActionsContext = createContext();

export function ErpCollectionHeaderProvider({ children }) {
    const [value, setValue] = useState(null);

    const valueActions = useMemo(
        () => {
            return {
                onSet(value) {
                    setValue(value);
                }
            }
        },
        []
    );

    return (
        <>
            <ErpCollectionHeaderActionsContext.Provider value={{ actions: valueActions, setValue: setValue }}>
                <ErpCollectionHeaderValueContext.Provider value={value}>
                    {children}
                </ErpCollectionHeaderValueContext.Provider>
            </ErpCollectionHeaderActionsContext.Provider>
        </>
    );
}

export function useErpCollectionHeaderValueHook(props) {
    const value = useContext(ErpCollectionHeaderValueContext);

    if (value === undefined) {
        throw new Error('useErpCollectionHeaderValueHook should be used within ErpCollectionHeaderValueContext');
    }

    return value;
}

export function useErpCollectionHeaderActionsHook(props) {
    const value = useContext(ErpCollectionHeaderActionsContext);

    if (value === undefined) {
        throw new Error('useErpCollectionHeaderActionsHook should be used within ErpCollectionHeaderActionsContext');
    }

    return {
        actions: {
            onSet: value.actions.onSet
        },
        setValue: value.setValue

    };
}