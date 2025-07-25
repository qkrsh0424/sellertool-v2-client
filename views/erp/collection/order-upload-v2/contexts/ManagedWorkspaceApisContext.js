import { createContext, useContext, useMemo, useState } from "react";

const ManagedWorkspaceApisValueContext = createContext();
const ManagedWorkspaceApisActionsContext = createContext();

export function ManagedWorkspaceApisContextProvider({ children }) {
    const [managedWorkspaceApis, setManagedWorkspaceApis] = useState(null);

    const managedWorkspaceApisActions = useMemo(
        () => {
            return {
                onSet(newValues) {
                    setManagedWorkspaceApis(newValues);
                },
                setValue: setManagedWorkspaceApis
            }
        },
        []
    )

    return (
        <>
            <ManagedWorkspaceApisActionsContext.Provider value={{ managedWorkspaceApis: managedWorkspaceApisActions }}>
                <ManagedWorkspaceApisValueContext.Provider value={{ managedWorkspaceApis }}>
                    {children}
                </ManagedWorkspaceApisValueContext.Provider>
            </ManagedWorkspaceApisActionsContext.Provider>
        </>
    );
}

export function useManagedWorkspaceApisValueContextHook(props) {
    const value = useContext(ManagedWorkspaceApisValueContext);

    if (value === undefined) {
        throw new Error('useManagedWorkspaceApisValueContextHook should be used within ManagedWorkspaceApisValueContext');
    }

    return {
        managedWorkspaceApis: value.managedWorkspaceApis,
    };
}

export function useManagedWorkspaceApisActionsContextHook(props) {
    const value = useContext(ManagedWorkspaceApisActionsContext);

    if (value === undefined) {
        throw new Error('useManagedWorkspaceApisActionsContextHook should be used within ManagedWorkspaceApisActionsContext');
    }

    return {
        managedWorkspaceApis: {
            onSet: value.managedWorkspaceApis.onSet,
            setValue: value.managedWorkspaceApis.setValue
        },
    };
}