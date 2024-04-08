import { createContext, useContext, useMemo, useState } from "react";

const ViewOptionsValueContext = createContext();
const ViewOptionsActionsContext = createContext();

/**
 * viewState = {
 *  stockOptionType: ['ALL', 'EXIST', 'NOT_EXIST'],
 *  receiverOptionType: ['ALL', 'SINGLE', 'MULTI']
 * }
 */
export function ViewOptionsProvider({ children }) {
    const [valueState, setValueState] = useState({
        stockOptionType: 'ALL',
        receiverOptionType: 'ALL'
    });

    const actions = useMemo(
        () => {
            return {
                onSet(value) {
                    setValueState(value);
                }
            }
        },
        []
    )
    return (
        <>
            <ViewOptionsActionsContext.Provider value={actions}>
                <ViewOptionsValueContext.Provider value={valueState}>
                    {children}
                </ViewOptionsValueContext.Provider>
            </ViewOptionsActionsContext.Provider>
        </>
    );
}

export function useViewOptionsValueHook(props) {
    const value = useContext(ViewOptionsValueContext);

    if (value === undefined) {
        throw new Error('useViewOptionsValueHook should be used within ViewOptionsValueContext');
    }

    return value;
}

export function useViewOptionsActionsHook(props) {
    const value = useContext(ViewOptionsActionsContext);

    if (value === undefined) {
        throw new Error('useViewOptionsActionsHook should be used within ViewOptionsActionsContext');
    }

    return {
        onSet: value.onSet
    };
}