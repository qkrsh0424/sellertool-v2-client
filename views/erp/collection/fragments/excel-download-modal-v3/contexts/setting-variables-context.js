import { createContext, useContext, useMemo, useState } from "react";

const SettingVariablesValueContext = createContext();
const SettingVariablesActionsContext = createContext();

export function SettingVariablesContextProvider({ children }) {
    const [settingVariables, setSettingVariables] = useState({
        isCombineDeliveryFlag: true,
        isDividePackageFlag: false,
        selectedErpcDownloadForm: null
    });

    const settingVariablesActions = useMemo(
        () => {
            return {
                setValue: setSettingVariables,
                onSet: (array) => {
                    setSettingVariables(array);
                }
            }
        },
        []
    )

    return (
        <>
            <SettingVariablesActionsContext.Provider value={{ settingVariablesActions }}>
                <SettingVariablesValueContext.Provider value={{ settingVariables }}>
                    {children}
                </SettingVariablesValueContext.Provider>
            </SettingVariablesActionsContext.Provider >
        </>
    );
}

export function useSettingVariablesValueContextHook(props) {
    const value = useContext(SettingVariablesValueContext);

    if (value === undefined) {
        throw new Error('useSettingVariablesValueContextHook should be used within SettingVariablesContextProvider');
    }

    return {
        settingVariables: {
            isCombineDeliveryFlag: value.settingVariables.isCombineDeliveryFlag,
            isDividePackageFlag: value.settingVariables.isDividePackageFlag,
            selectedErpcDownloadForm: value.settingVariables.selectedErpcDownloadForm,
        }
    };
}

export function useSettingVariablesActionsContextHook(props) {
    const value = useContext(SettingVariablesActionsContext);

    if (value === undefined) {
        throw new Error('useSettingVariablesActionsContextHook should be used within SettingVariablesContextProvider');
    }

    return {
        settingVariables: {
            setValue: value.settingVariablesActions.setValue,
            onSet: value.settingVariablesActions.onSet
        }
    };
}