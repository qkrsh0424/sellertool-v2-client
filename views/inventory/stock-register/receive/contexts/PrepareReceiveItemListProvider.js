import { createContext, useContext, useMemo, useState } from "react";

const PrepareReceiveItemListValueContext = createContext();
const PrepareReceiveItemListActionsContext = createContext();

export function PrepareReceiveItemListProvider({ children }) {
    const [prepareReceiveItemListState, setPrepareReceiveItemListState] = useState([]);

    const actions = useMemo(
        () => {
            return {
                onSet(value) {
                    setPrepareReceiveItemListState(value);
                }
            }
        },
        []
    )
    return (
        <>
            <PrepareReceiveItemListActionsContext.Provider value={actions}>
                <PrepareReceiveItemListValueContext.Provider value={prepareReceiveItemListState}>
                    {children}
                </PrepareReceiveItemListValueContext.Provider>
            </PrepareReceiveItemListActionsContext.Provider>
        </>
    );
}

export function usePrepareReceiveItemListValueHook(props) {
    const value = useContext(PrepareReceiveItemListValueContext);

    if (value === undefined) {
        throw new Error('usePrepareReceiveItemListValueHook should be used within PrepareReceiveItemListValueContext');
    }

    return value;
}

export function usePrepareReceiveItemListActionsHook(props) {
    const value = useContext(PrepareReceiveItemListActionsContext);

    if (value === undefined) {
        throw new Error('usePrepareReceiveItemListActionsHook should be used within PrepareReceiveItemListActionsContext');
    }

    return value;
}