import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ReturnExchangeValueContext = createContext();
const ReturnExchangeActionsContext = createContext();

export function ReturnExchangeProvider({ children }) {
    const [returnExchanges, setReturnExchanges] = useState(null);
    const [productOptions, setProductOptions] = useState(null);

    const returnExchangesActions = useMemo(
        () => {
            return {
                onSet(value) {
                    setReturnExchanges(value);
                },
                setValue: setReturnExchanges
            }
        },
        []
    );

    const productOptionsActions = useMemo(
        () => {
            return {
                onSet(value) {
                    setProductOptions(value);
                },
                setValue: setProductOptions
            }
        },
        []
    );

    return (
        <>
            <ReturnExchangeActionsContext.Provider value={{ returnExchangesActions: returnExchangesActions, productOptionsActions: productOptionsActions }}>
                <ReturnExchangeValueContext.Provider value={{ returnExchanges: returnExchanges, productOptions: productOptions }}>
                    {children}
                </ReturnExchangeValueContext.Provider>
            </ReturnExchangeActionsContext.Provider>
        </>
    );
}

export function useReturnExchangeValueHook(props) {
    const value = useContext(ReturnExchangeValueContext);

    if (value === undefined) {
        throw new Error('useReturnExchangeValueHook should be used within ReturnExchangeValueContext');
    }

    return {
        returnExchanges: value.returnExchanges,
        productOptions: value.productOptions,
    };
}

export function useReturnExchangeActionsHook(props) {
    const value = useContext(ReturnExchangeActionsContext);

    if (value === undefined) {
        throw new Error('useReturnExchangeActionsHook should be used within ReturnExchangeActionsContext');
    }

    return {
        returnExchangesActions: {
            onSet: value.returnExchangesActions.onSet,
            setValue: value.returnExchangesActions.setValue
        },
        productOptionsActions: {
            onSet: value.productOptionsActions.onSet,
            setValue: value.productOptionsActions.setValue
        }
    };
}