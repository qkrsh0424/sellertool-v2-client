import { createContext, useContext, useEffect, useMemo, useState } from "react";

const SelectedErpItemListValueContext = createContext();
const SelectedErpItemListActionsContext = createContext();

export function SelectedErpItemListProvider({ children }) {
    const [value, setValue] = useState([]);

    const actions = useMemo(
        () => {
            return {
                onSet(value) {
                    setValue(value)
                }
            }
        },
        []
    )
    return (
        <>
            <SelectedErpItemListActionsContext.Provider value={actions}>
                <SelectedErpItemListValueContext.Provider value={value}>
                    {children}
                </SelectedErpItemListValueContext.Provider>
            </SelectedErpItemListActionsContext.Provider>
        </>
    );
}

export function useSelectedErpItemListValueHook(props) {
    const value = useContext(SelectedErpItemListValueContext);

    if (value === undefined) {
        throw new Error('useSelectedErpItemListValueHook should be used within SelectedErpItemListValueContext');
    }

    return value;
}

export function useSelectedErpItemListActionsHook(props) {
    const value = useContext(SelectedErpItemListActionsContext);

    if (value === undefined) {
        throw new Error('useSelectedErpItemListActionsHook should be used within SelectedErpItemListActionsContext');
    }

    return {
        onSet: value.onSet,
        onSelect: value.onSelect,
        onSelectErpItemList: value.onSelectErpItemList,
        onClear: value.onClear,
    };
}