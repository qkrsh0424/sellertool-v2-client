import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ErpItemValueContext = createContext();
const ErpItemActionsContext = createContext();

export function ErpItemProvider({ children }) {
    const [content, setContent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [totalSize, setTotalSize] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const contentActions = useMemo(
        () => {
            return {
                onSet(value) {
                    setContent(value);
                }
            }
        },
        []
    );

    const isLoadingActions = useMemo(
        () => {
            return {
                onSet(value) {
                    setIsLoading(value);
                }
            }
        },
        []
    );

    const totalSizeActions = useMemo(
        () => {
            return {
                onSet(value) {
                    setTotalSize(value);
                }
            }
        },
        []
    );

    const totalPagesActions = useMemo(
        () => {
            return {
                onSet(value) {
                    setTotalPages(value);
                }
            }
        },
        []
    );

    return (
        <>
            <ErpItemActionsContext.Provider value={{ content: contentActions, isLoading: isLoadingActions, totalSize: totalSizeActions, totalPages: totalPagesActions, setContent: setContent }}>
                <ErpItemValueContext.Provider value={{ content: content, isLoading: isLoading, totalSize: totalSize, totalPages: totalPages }}>
                    {children}
                </ErpItemValueContext.Provider>
            </ErpItemActionsContext.Provider>
        </>
    );
}

export function useErpItemValueHook(props) {
    const value = useContext(ErpItemValueContext);

    if (value === undefined) {
        throw new Error('useErpItemValueHook should be used within ErpItemValueContext');
    }

    return {
        content: value.content,
        isLoading: value.isLoading,
        totalSize: value.totalSize,
        totalPages: value.totalPages
    };
}

export function useErpItemActionsHook(props) {
    const value = useContext(ErpItemActionsContext);

    if (value === undefined) {
        throw new Error('useErpItemActionsHook should be used within ErpItemActionsContext');
    }

    return {
        content: {
            onSet: value.content.onSet
        },
        isLoading: {
            onSet: value.isLoading.onSet
        },
        totalSize: {
            onSet: value.totalSize.onSet
        },
        totalPages: {
            onSet: value.totalPages.onSet
        },
        setContent: value.setContent
    };
}