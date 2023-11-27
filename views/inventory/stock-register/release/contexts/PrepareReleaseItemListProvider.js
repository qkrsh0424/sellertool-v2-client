import { createContext, useContext, useMemo, useState } from "react";

const PrepareReleaseItemListValueContext = createContext();
const PrepareReleaseItemListActionsContext = createContext();

export function PrepareReleaseItemListProvider({ children }) {
    const [prepareReleaseItemListState, setPrepareReleaseItemListState] = useState([]);

    const actions = useMemo(
        () => {
            return {
                onSet(value) {
                    setPrepareReleaseItemListState(value);
                }
            }
        },
        []
    )
    return (
        <>
            <PrepareReleaseItemListActionsContext.Provider value={actions}>
                <PrepareReleaseItemListValueContext.Provider value={prepareReleaseItemListState}>
                    {children}
                </PrepareReleaseItemListValueContext.Provider>
            </PrepareReleaseItemListActionsContext.Provider>
        </>
    );
}

export function usePrepareReleaseItemListValueHook(props) {
    const value = useContext(PrepareReleaseItemListValueContext);

    if (value === undefined) {
        throw new Error('usePrepareReleaseItemListValueHook should be used within PrepareReleaseItemListValueContext');
    }

    return value;
}

export function usePrepareReleaseItemListActionsHook(props) {
    const value = useContext(PrepareReleaseItemListActionsContext);

    if (value === undefined) {
        throw new Error('usePrepareReleaseItemListActionsHook should be used within PrepareReleaseItemListActionsContext');
    }

    return value;
}